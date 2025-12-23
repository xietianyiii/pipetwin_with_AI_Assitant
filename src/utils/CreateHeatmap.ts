// 创建缓存对象来存储已创建的热力映射组件
const heatmapCache = {
  colorCard: null as any,
  material: null as any,
  algorithm: null as any,
  lastConfigUrl: ""  // 👉 记录上一次使用的配置文件路径
};

/**
 * 创建并运行热力映射（SHP）算法
 * 包含四个步骤：
 * 1️⃣ 创建色卡
 * 2️⃣ 创建热力材质
 * 3️⃣ 创建热力映射算法
 * 4️⃣ 运行算法
 * @param App - WDP 实例
 * @param configPath - 配置文件地址（JSON）
 */
export async function createAndRunHeatmap(App: any, configPath: string): Promise<void> {
  if (!App) {
    console.warn("⚠️ App 实例无效，无法创建热力映射");
    return;
  }

  try {
    console.log("🔥 开始创建热力映射...");

    // 0️⃣ 检查配置地址是否变化
    if (heatmapCache.lastConfigUrl && heatmapCache.lastConfigUrl !== configPath) {
      console.log("🔁 检测到新的配置文件地址，清除缓存并重新创建算法");
      await deleteHeatmapAlgorithm(false);
      heatmapCache.colorCard = null;
      heatmapCache.material = null;
      heatmapCache.algorithm = null;
    }
    heatmapCache.lastConfigUrl = configPath;

    // 1️⃣ 检查缓存或创建色卡
    let colorCard;
    if (heatmapCache.colorCard) {
      console.log("🎨 使用缓存的色卡:", heatmapCache.colorCard.eid);
      colorCard = heatmapCache.colorCard;
    } else {
      const colorCardRes = await App.WIM.CustomColorCard.CreateCard({
        name: "ColorCard1",
        customId: "",
        color: [
          [30, 123, 255],
          [240, 26, 27],
        ],
        anchor: [
          { name: "test1", position: 0.167, weight: 1, color: [51,25,255] },
          { name: "test2", position: 0.33, weight: 1, color: [80,255,122] },
          { name: "test3", position: 0.5, weight: 1, color: [45,255,9] },
          { name: "test4", position: 0.67, weight: 1, color: [158,20,255] },
          { name: "test5", position: 0.83, weight: 1, color: [255,0,218] },
        ],
      });

      if (!colorCardRes.success) throw new Error("❌ 创建色卡失败");
      colorCard = colorCardRes.result.object;
      heatmapCache.colorCard = colorCard;
      console.log("🎨 色卡创建成功:", colorCard.eid);
    }

    // 2️⃣ 检查缓存或创建热力材质
    let materialObj;
    if (heatmapCache.material) {
      console.log("🧱 使用缓存的热力材质:", heatmapCache.material.eid);
      materialObj = heatmapCache.material;
    } else {
      const materialRes = await App.WIM.Flood.CreateMaterial({
        mId: "HeatmapMaterial1",
        customId: "",
        matBlur: 0.004,
        dataMax: 10,
        dataMin: 0.1,
        opacity: 0.8,
        heatMapMatIndex: 2,
      });

      if (!materialRes.success) throw new Error("❌ 创建材质失败");
      materialObj = materialRes.result.object;
      heatmapCache.material = materialObj;
      console.log("🧱 热力材质创建成功:", materialObj.eid);
    }

    // 3️⃣ 加载配置 JSON（根据 configPath 动态加载）
    console.log("📄 正在加载热力配置:", configPath);
    const response = await fetch(configPath);
    if (!response.ok) throw new Error(`❌ 无法加载配置文件: ${response.statusText}`);
    const heatmapConfig = await response.json();
    if (!heatmapConfig) throw new Error("❌ 配置文件内容为空");

    // 4️⃣ 检查缓存或创建热力映射算法
    let heatmapAlgo;
    if (heatmapCache.algorithm) {
      console.log("🧩 使用缓存的热力算法:", heatmapCache.algorithm.eid);
      heatmapAlgo = heatmapCache.algorithm;
    } else {
      const algorithmRes = await App.WIM.Flood.CreateAlgorithm(heatmapConfig);

      if (!algorithmRes.success) throw new Error("❌ 创建热力映射算法失败");
      heatmapAlgo = algorithmRes.result.object;
      heatmapCache.algorithm = heatmapAlgo;
      console.log("🧩 热力算法创建成功:", heatmapAlgo.eid);
    }

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    await sleep(5000);

    // 5️⃣ 运行热力映射算法
    const runRes = await heatmapAlgo.RunAlgorithm({
      offset: [0, 0, 0],
      scale: [1, 1],
      rotation: 0,
      materialEId: materialObj.eid,
      colorPointEId: colorCard.eid,
      index: 1,
      minIndex: 0,
      maxIndex: 0,
      speed: 2,
      status: true,
      reset: false,
    });

    if (!runRes.success) throw new Error("❌ 热力算法运行失败");
    console.log("✅ 热力映射运行成功:", runRes);

  } catch (error) {
    console.error("🚨 createAndRunHeatmap 执行出错:", error);
  }
}

export async function deleteHeatmapAlgorithm(force: boolean = true): Promise<void> {
  try {
    if (!heatmapCache.algorithm) {
      console.warn("⚠️ 没有可删除的热力映射算法，请先创建！");
      return;
    }

    console.log("🧨 正在删除热力映射算法...");
    const res = await heatmapCache.algorithm.DeleteAlgorithm({ force });
    console.log("✅ 删除结果:", res);

    heatmapCache.algorithm = null;
    // heatmapCache.material = null;
    // heatmapCache.colorCard = null;

    console.log("🧹 缓存已清除");
  } catch (error) {
    console.error("🚨 删除热力映射算法出错:", error);
  }
}

/**
 * 开启热力点击事件（SetAlgorithmInteract）
 *
 * @param App - WDP 实例对象
 * @param enable - 是否开启点击回调（true 开启 / false 关闭）
 * @param returnHistory - 是否返回点击历史记录（true 返回 / false 不返回）
 * @returns Promise<any>
 */
export async function enableHeatmapInteract(
  App: any,
  enable: boolean = true,
  returnHistory: boolean = false
): Promise<any> {
  if (!App?.Customize?.RunCustomizeApi) {
    console.error("❌ App 实例无效，缺少 Customize.RunCustomizeApi");
    return null;
  }

  try {
    console.log(`🔔 热力点击事件：${enable ? "开启" : "关闭"}...`);

    const jsondata = {
      apiClassName: "FloodAPI",
      apiFuncName: "SetAlgorithmInteract",
      args: {
        eid: heatmapCache.algorithm.eid,
        bClick: enable,
        bReturnHistory: returnHistory,
      },
    };

    const res = await App.Customize.RunCustomizeApi(jsondata);

    if (res.success) {
      console.log("✅ 热力点击事件设置成功:", res);
    } else {
      console.warn("⚠️ 热力点击事件设置失败:", res);
    }

    return res;
  } catch (error) {
    console.error("🚨 enableHeatmapInteract 执行出错:", error);
    return null;
  }
}

/**
 * 注册热力点击回调
 *
 * @param App - WDP 实例对象
 * @param onClick - 回调函数，返回热力点击结果
 */
export async function registerHeatmapClickCallback(
  App: any,
  onClick: (res: any) => void
): Promise<void> {
  if (!App?.Renderer?.RegisterSceneEvent) {
    console.error("❌ App 实例无效，请检查 Renderer.RegisterSceneEvent");
    return;
  }

  try {
    console.log("🎧 注册热力点击事件回调...");

    await App.Renderer.RegisterSceneEvent([
      {
        name: "WimFloodClickReturnValueEvent",
        func: async (res: any) => {
          console.log("🌊 收到热力点击返回值:", res);
          if (onClick) onClick(res);
        },
      },
    ]);

    console.log("✅ 热力点击事件回调注册成功");
  } catch (error) {
    console.error("🚨 registerHeatmapClickCallback 执行出错:", error);
  }
}

/**
 * 从热力点击事件中提取gridid，热力值value,以及历史热力值history
 *
 * @param eventResult - WimFloodClickReturnValueEvent 回调中的 res
 * @returns { gridID: number, value: number, history: number[] } | null
 */
export function extractHeatmapClickInfo(eventResult: any): { gridID: number, value: number, history: number[] } | null {
  if (!eventResult || !eventResult.result) {
    console.warn("⚠️ 点击事件格式异常，无法解析热力信息:", eventResult);  
    return null;
  }

  const gridID = eventResult.result.GridID;
  const value = eventResult.result.Value;
  const history = eventResult.result.HistoryValue;

  if (!gridID || !value || !history) {
    console.warn("⚠️ 缺少 gridID, value 或 history, 返回信息不完整:", eventResult.result);
    return null;
  }

  console.log(`🌊 点击提取成功 -> GridID: ${ gridID }, 当前热力值: ${ value }, 历史记录(${ history.length }条)`);

    return { gridID, value, history };
}


/**
 * 清除热力映射缓存
 */
export function clearHeatmapCache(): void {
  heatmapCache.colorCard = null;
  heatmapCache.material = null;
  heatmapCache.algorithm = null;
  heatmapCache.lastConfigUrl = "";
  console.log("🧹 热力映射缓存已清除");
}
