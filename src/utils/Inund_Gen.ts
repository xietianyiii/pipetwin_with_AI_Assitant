import floodConfig from '@/configs/Inud_Gen.json';
const typedFloodConfig = floodConfig as FloodConfig;

// 定义洪水配置文件的类型
interface FloodFileConfig {
  tifURL: string;
  shpURL: string;
  shxURL: string;
  prjURL: string;
  dbfURL: string;
  override: boolean;
}

interface FloodConfig {
  algorithmType: string;
  customId: string;
  customData: string;
  file: FloodFileConfig;
  data: Array<{
    gridIdArray: number[];
    valueArray: number[];
  }>;
}

export interface WaterMaterialOptions {
  mId?: string;
  customId?: string;
  waterMatIndex?: number;
  matBlur?: number;
  GlobalWaveRotate?: number;
  WaveIntensity?: number;
  FoamMaskIntensity?: number;
}

export interface FloodAlgorithmOptions {
  algorithmType?: string;
  customId?: string;
  customData?: string;
  file?: {
    tifURL?: string;
    shpURL?: string;
    shxURL?: string;
    prjURL?: string;
    dbfURL?: string;
    override?: boolean;
  };
  data?: Array<{
    valueArray: number[];
    gridIdArray: number[];
  }>;
}

export interface RunAlgorithmOptions {
  offset?: number[];
  scale?: number[];
  rotation?: number;
  materialEId?: string;
  colorPointEId?: string;
  index?: number;
  minIndex?: number;
  maxIndex?: number;
  speed?: number;
  status?: boolean;
  reset?: boolean;
}

export interface InundationResult {
  success: boolean;
  waterMaterial?: any;
  floodAlgorithm?: any;
  runResult?: any;
  error?: string;
}

interface FloodResponse<T = any> {
  success: boolean;
  result?: { object?: T };
  message?: string;
}

type CacheKey = "waterMaterial" | "floodShp";

/**
 * 🌊 水体生成与洪水算法封装类
 */
export class InundationGenerator {
  private App: any;
  private cache = new Map<CacheKey, any>();
  private debug: boolean;

  constructor(App: any, debug = true) {
    this.App = App;
    this.debug = debug;
  }

  /** ✅ SDK 模块存在性检测 */
  private ensureFloodModule(): void {
    console.log("🔍 检查 Flood 模块加载状态...");
    console.log("App 对象:", this.App);
    console.log("WIM 对象:", this.App?.WIM);
    console.log("Flood 对象:", this.App?.WIM?.Flood);

    if (!this.App) {
      throw new Error("App 实例未初始化");
    }

    if (!this.App.WIM) {
      throw new Error("WIM 模块未加载，请确保 SDK 已正确初始化");
    }

    if (!this.App.WIM.Flood) {
      throw new Error("Flood 模块未加载，请确保 WIM.Flood 已初始化");
    }

    console.log("✅ Flood 模块已正确加载");
  }

  /** ✅ 合并默认与自定义配置 */
  private mergeOptions<T>(defaults: T, options?: Partial<T>): T {
    return { ...defaults, ...(options || {}) };
  }

  /** ✅ 通用错误包装与日志控制 */
  private async execute<T>(
    label: string,
    func: () => Promise<T>
  ): Promise<T> {
    try {
      const result = await func();
      this.debug && console.log(`✅ ${label} 执行成功`, result);
      return result;
    } catch (err: any) {
      console.error(`❌ ${label} 执行失败:`, err.message || err);
      throw err;
    }
  }

  // --------------------------------------------------------------------
  //  1️⃣ 创建水体材质
  // --------------------------------------------------------------------
  async createWaterMaterial(options?: WaterMaterialOptions): Promise<any> {
    this.ensureFloodModule();
    console.log("🌊 正在创建水体材质...");

    const config = this.mergeOptions<WaterMaterialOptions>(
      {
        mId: "defaultMat",
        waterMatIndex: 1,
        matBlur: 0.004,
        GlobalWaveRotate: 180,
        WaveIntensity: 1,
        FoamMaskIntensity: 1,
      },
      options
    );

    const res = await this.execute<FloodResponse>(
      "创建水体材质",
      () => this.App.WIM.Flood.CreateMaterial(config)
    );

    if (res.success && res.result?.object) {
      const material = res.result.object;
      this.cache.set("waterMaterial", material);
      return material;
    }
    throw new Error("水体材质创建失败");
  }

  // --------------------------------------------------------------------
  //  2️⃣ 创建洪水算法
  // --------------------------------------------------------------------
  async createFloodAlgorithm(options?: FloodAlgorithmOptions): Promise<any> {
    this.ensureFloodModule();
    console.log("🔄 正在创建洪水算法...");

    const config = this.mergeOptions<FloodAlgorithmOptions>(
      {
        algorithmType: typedFloodConfig.algorithmType,
        customId: typedFloodConfig.customId,
        customData: typedFloodConfig.customData,
        file: typedFloodConfig.file,
        data: typedFloodConfig.data,
      },
      options
    );

    const res = await this.execute<FloodResponse>(
      "创建洪水算法",
      () => this.App.WIM.Flood.CreateAlgorithm(config)
    );

    if (res.success && res.result?.object) {
      const floodAlgorithm  = res.result.object;
      this.cache.set("floodShp", floodAlgorithm );
      console.log("✅ 洪水算法创建成功", floodAlgorithm );
      return floodAlgorithm ;
    }
    throw new Error(res.message || "洪水算法创建失败");
  }

  // --------------------------------------------------------------------
  //  3️⃣ 运行洪水算法
  // --------------------------------------------------------------------
  async runFloodAlgorithm(options?: RunAlgorithmOptions): Promise<any> {
    const flood = this.cache.get("floodShp");
    const material = this.cache.get("waterMaterial");

    if (!flood || !material) {
      throw new Error("请先创建洪水算法与水体材质");
    }

    console.log("▶️ 正在运行洪水算法...");
    const config = this.mergeOptions<RunAlgorithmOptions>(
      {
        offset: [0, 0, 0],
        scale: [1, 1],
        rotation: 0,
        materialEId: material.eid,
        colorPointEId: "",
        index: 1,
        minIndex: 0, // 默认填0即可
        maxIndex: 0, // 默认填0即可
        speed: 2,
        status: true,
        reset: false,
      },
      options
    );

    return await this.execute("运行洪水算法", () =>
      flood.RunAlgorithm(config)
    );
  }

  // --------------------------------------------------------------------
  //  4️⃣ 一键生成完整水体
  // --------------------------------------------------------------------
  async generateInundation(
    waterMaterialOptions?: WaterMaterialOptions,
    floodAlgorithmOptions?: FloodAlgorithmOptions,
    runAlgorithmOptions?: RunAlgorithmOptions
  ): Promise<InundationResult> {
    try {
      console.log("🌊 开始生成洪水模拟流程...");
      
      // 检查缓存中是否已有水体材质和洪水算法
      let waterMaterial = this.cache.get("waterMaterial");
      let floodAlgorithm = this.cache.get("floodShp");

      // 如果没有水体材质，则创建
      if (!waterMaterial) {
        waterMaterial = await this.createWaterMaterial(waterMaterialOptions);
      } else {
        console.log("✅ 使用缓存中的水体材质");
      }

      // 如果没有洪水算法，则创建
      if (!floodAlgorithm) {
        floodAlgorithm = await this.createFloodAlgorithm(floodAlgorithmOptions);
      } else {
        console.log("✅ 使用缓存中的洪水算法");
      }

      const runResult = await this.runFloodAlgorithm(runAlgorithmOptions);

      console.log("✅ 洪水模拟生成完成");
      return { success: true, waterMaterial, floodAlgorithm, runResult };
    } catch (err: any) {
      console.error("❌ 洪水模拟生成失败:", err.message || String(err));
      return { success: false, error: err.message || String(err) };
    }
  }

  // --------------------------------------------------------------------
  //  🔧 缓存操作与销毁
  // --------------------------------------------------------------------
  getCache(key: CacheKey) {
    return this.cache.get(key);
  }

  clearCache(key?: CacheKey): void {
    if (key) this.cache.delete(key);
    else this.cache.clear();
  }

  /** ✅ 释放算法与材质资源 */
  async destroy(): Promise<void> {
    this.debug && console.log("🧹 清理水体与算法资源...");
    const flood = this.cache.get("floodShp");
    const material = this.cache.get("waterMaterial");

    if (flood?.Destroy) await flood.Destroy();
    if (material?.Destroy) await material.Destroy();

    this.clearCache();
  }
}

export default InundationGenerator;
