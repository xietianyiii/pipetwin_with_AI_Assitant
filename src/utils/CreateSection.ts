/**
 * 启动地形剖切分析（DigTerrainAnalysis）
 *
 * 用于在三维场景中创建地形剖切体，以展示地形深度或土层结构。
 *
 * 功能说明：
 * 1️⃣ 自动检测是否已有剖切体，若存在则先删除；
 * 2️⃣ 支持设置剖切深度与多边形坐标；
 * 3️⃣ 自动调用 Customize API；
 * 4️⃣ 输出详细日志。
 *
 * @param App - WdpApi 实例对象
 * @param depth - 剖切深度（单位：米）
 * @param coordinates - 剖切范围坐标点数组，例如 [[lon, lat, 0], ...]
 * @returns Promise<any> - 返回剖切创建结果
 */
export async function startDigTerrainAnalysis(
  App: any,
  depth: number,
  coordinates: [number, number, number][]
): Promise<any> {
  if (!App?.Customize?.RunCustomizeApi) {
    console.error("❌ App 实例无效，请确保 WdpApi 初始化完成且包含 Customize 模块");
    return null;
  }

  if (!Array.isArray(coordinates) || coordinates.length < 3) {
    console.error("⚠️ 坐标点至少需要三个以形成剖切区域");
    return null;
  }

  try {
    console.log("🪓 [剖切] 检查是否存在已有剖切分析...");

    // 1️⃣ 先尝试删除现有剖切体（若不存在则不会报错）
    const deleteJson = {
      apiClassName: "DigTerrainAnalysisAPI",
      apiFuncName: "DeleteDigTerrainAnalysisEntity",
      args: {},
    };
    const deleteRes = await App.Customize.RunCustomizeApi(deleteJson);
    if (deleteRes?.success) {
      console.log("🧹 已清理旧的剖切分析实体");
    }

    // 2️⃣ 创建新的剖切分析体
    console.log("🪓 开始创建新的地形剖切分析...");

    const createJson = {
      apiClassName: "DigTerrainAnalysisAPI",
      apiFuncName: "CreateDigTerrainAnalysisEntity",
      args: {
        guid: crypto.randomUUID?.() || `${Date.now()}`, // 唯一ID
        eid: null,
        depth,
        coordinates,
      },
    };

    const res = await App.Customize.RunCustomizeApi(createJson);

    if (res?.success) {
      console.log("✅ 地形剖切创建成功:", res);
    } else {
      console.warn("⚠️ 地形剖切创建失败:", res);
    }

    return res;
  } catch (error) {
    console.error("🚨 startDigTerrainAnalysis 执行出错:", error);
    return null;
  }
}

/**
 * 关闭地形剖切分析
 *
 * 调用 Customize API 的 DeleteDigTerrainAnalysisEntity 接口，
 * 用于删除当前存在的剖切分析实体，恢复场景完整显示。
 *
 * @param App - WdpApi 实例对象
 * @returns Promise<any> - 返回删除结果
 */
export async function endDigTerrainAnalysis(App: any): Promise<any> {
  if (!App?.Customize?.RunCustomizeApi) {
    console.error("❌ App 实例无效，请确保 WdpApi 初始化完成且包含 Customize 模块");
    return null;
  }

  try {
    console.log("🧹 正在关闭地形剖切分析...");

    const jsondata = {
      apiClassName: "DigTerrainAnalysisAPI",
      apiFuncName: "DeleteDigTerrainAnalysisEntity",
      args: {},
    };

    const res = await App.Customize.RunCustomizeApi(jsondata);

    if (res?.success) {
      console.log("✅ 地形剖切分析已关闭:", res);
    } else {
      console.warn("⚠️ 地形剖切关闭失败:", res);
    }

    return res;
  } catch (error) {
    console.error("🚨 endDigTerrainAnalysis 执行出错:", error);
    return null;
  }
}
