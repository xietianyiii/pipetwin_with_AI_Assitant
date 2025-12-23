// 创建缓存对象来存储已创建的淹没组件
const inundationCache = {
  material: null as any,
  algorithm: null as any,
  lastConfigUrl: "" // 👉 记录上次加载的配置地址
};

/**
 * 创建并运行淹没（SHP）算法
 * 自动检测配置文件是否变化，若变化则重新创建算法
 * @param App - WDP 实例
 * @param configPath - 淹没配置文件 JSON 地址（支持 HTTP、本地或相对路径）
 */
export async function createAndRunInundation(App: any, configPath: string): Promise<void> {
  if (!App) {
    console.warn("⚠️ App 实例无效，无法创建 inundation");
    return;
  }

  try {
    console.log("🔥 开始创建 inundation...");

    // 🔍 1️⃣ 检测配置文件是否变化
    if (inundationCache.lastConfigUrl && inundationCache.lastConfigUrl !== configPath) {
      console.log("🔁 检测到新的配置文件地址，自动清空缓存并重新创建算法");
      await deleteInundationAlgorithm(false); // 调用删除逻辑（不强制）
      inundationCache.material = null;
      inundationCache.algorithm = null;
    }
    inundationCache.lastConfigUrl = configPath;

    // 2️⃣ 使用缓存或创建水体材质
    let materialObj;
    if (inundationCache.material) {
      console.log("🧱 使用缓存的水体材质:", inundationCache.material.eid);
      materialObj = inundationCache.material;
    } else {
      const materialRes = await App.WIM.Flood.CreateMaterial({
        mId: "FloodMaterial1",
        customId: "",
        waterMatIndex: 1,
        matBlur: 0.004,
        GlobalWaveRotate: 180,
        WaveIntensity: 1,
        FoamMaskIntensity: 1
      });

      if (!materialRes.success) throw new Error("❌ 创建材质失败");
      materialObj = materialRes.result.object;
      inundationCache.material = materialObj;
      console.log("🧱 淹没材质创建成功:", materialObj.eid);
    }

    // 3️⃣ 加载 JSON 配置
    console.log("📄 正在加载淹没配置:", configPath);
    const response = await fetch(configPath);
    if (!response.ok) throw new Error(`❌ 无法加载配置文件: ${response.statusText}`);
    const InundationConfig = await response.json();
    if (!InundationConfig) throw new Error("❌ 配置文件内容为空");

    // 4️⃣ 使用缓存或创建淹没算法
    let inundationAlgo;
    if (inundationCache.algorithm) {
      console.log("🧩 使用缓存的淹没算法:", inundationCache.algorithm.eid);
      inundationAlgo = inundationCache.algorithm;
    } else {
      const algorithmRes = await App.WIM.Flood.CreateAlgorithm(InundationConfig);
      if (!algorithmRes.success) throw new Error("❌ 创建淹没算法失败");
      inundationAlgo = algorithmRes.result.object;
      inundationCache.algorithm = inundationAlgo;
      console.log("🧩 淹没算法创建成功:", inundationAlgo.eid);
    }

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    await sleep(5000);

    // 5️⃣ 运行淹没算法
    const runRes = await inundationAlgo.RunAlgorithm({
      offset: [0, 0, 0],
      scale: [1, 1],
      rotation: 0,
      materialEId: materialObj.eid,
      colorPointEId: "",
      index: 1,
      minIndex: 0,
      maxIndex: 0,
      speed: 2,
      status: true,
      reset: false
    });

    if (!runRes.success) throw new Error("❌ 淹没算法运行失败");
    console.log("✅ 淹没算法运行成功:", runRes);

  } catch (error) {
    console.error("🚨 createAndRunInundation 执行出错:", error);
  }
}

/**
 * 删除淹没算法
 * @param force 是否强制删除
 */
export async function deleteInundationAlgorithm(force: boolean = true): Promise<void> {
  try {
    if (!inundationCache.algorithm) {
      console.warn("⚠️ 没有可删除的淹没算法，请先创建！");
      return;
    }

    console.log("🧨 正在删除淹没算法...");
    const res = await inundationCache.algorithm.DeleteAlgorithm({ force });
    console.log("✅ 删除结果:", res);

    // // 删除后清除缓存
    inundationCache.algorithm = null;
    // inundationCache.material = null;
    console.log("🧹 缓存已清除");
  } catch (error) {
    console.error("🚨 删除淹没算法出错:", error);
  }
}

/**
 * 开启淹没点击事件（SetAlgorithmInteract）
 *
 * @param App - WDP 实例对象
 * @param enable - 是否开启点击回调（true 开启 / false 关闭）
 * @param returnHistory - 是否返回点击历史记录（true 返回 / false 不返回）
 * @returns Promise<any>
 */
export async function enableInundationInteract(
  App: any,
  enable: boolean = true,
  returnHistory: boolean = false
): Promise<any> {
  if (!App?.Customize?.RunCustomizeApi) {
    console.error("❌ App 实例无效，缺少 Customize.RunCustomizeApi");
    return null;
  }

  try {
    console.log(`🔔 淹没点击事件：${enable ? "开启" : "关闭"}...`);

    const jsondata = {
      apiClassName: "FloodAPI",
      apiFuncName: "SetAlgorithmInteract",
      args: {
        eid: inundationCache.algorithm.eid,
        bClick: enable,
        bReturnHistory: returnHistory,
      },
    };

    const res = await App.Customize.RunCustomizeApi(jsondata);

    if (res.success) {
      console.log("✅ 淹没点击事件设置成功:", res);
    } else {
      console.warn("⚠️ 淹没点击事件设置失败:", res);
    }

    return res;
  } catch (error) {
    console.error("🚨 enableInundationInteract 执行出错:", error);
    return null;
  }
}

/**
 * 注册淹没点击回调
 *
 * @param App - WDP 实例对象
 * @param onClick - 回调函数，返回淹没点击结果
 */
export async function registerFloodClickCallback(
  App: any,
  onClick: (res: any) => void
): Promise<void> {
  if (!App?.Renderer?.RegisterSceneEvent) {
    console.error("❌ App 实例无效，请检查 Renderer.RegisterSceneEvent");
    return;
  }

  try {
    console.log("🎧 注册淹没点击事件回调...");

    await App.Renderer.RegisterSceneEvent([
      {
        name: "WimFloodClickReturnValueEvent",
        func: async (res: any) => {
          console.log("🌊 收到淹没点击返回值:", res);
          if (onClick) onClick(res);
        },
      },
    ]);

    console.log("✅ 淹没点击事件回调注册成功");
  } catch (error) {
    console.error("🚨 registerFloodClickCallback 执行出错:", error);
  }
}

/**
 * 从淹没点击事件中提取gridid，淹没水深value,以及历史淹没水深history
 *
 * @param eventResult - WimFloodClickReturnValueEvent 回调中的 res
 * @returns { gridID: number, value: number, history: number[] } | null
 */
export function extractFloodClickInfo(eventResult: any): { gridID: number, value: number, history: number[] } | null {
  if (!eventResult || !eventResult.result) {
    console.warn("⚠️ 点击事件格式异常，无法解析淹没信息:", eventResult);
    return null;
  }

  const gridID = eventResult.result.GridID;
  const value = eventResult.result.Value;
  const history = eventResult.result.HistoryValue;

  if (!gridID || !value || !history) {
    console.warn("⚠️ 缺少 gridID, value 或 history, 返回信息不完整:", eventResult.result);
    return null;
  }

  console.log(`🌊 点击提取成功 -> GridID: ${ gridID }, 当前水深: ${ value }, 历史记录(${ history.length }条)`);

    return { gridID, value, history };
}


/**
 * 清除淹没缓存（不调用引擎）
 */
export function clearInundationCache(): void {
  inundationCache.material = null;
  inundationCache.algorithm = null;
  inundationCache.lastConfigUrl = "";
  console.log("🧹 淹没缓存已清除");
}
