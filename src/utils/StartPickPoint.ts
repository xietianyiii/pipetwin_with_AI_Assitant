/**
 * startPickPoint.ts
 * 三维场景取点工具模块
 *
 * 包含：
 *  - 启动取点
 *  - 结束取点
 *  - 获取取点结果
 */

//////////////////////////////
// 🧩 启动取点
//////////////////////////////

/**
 * 启动三维场景取点功能
 *
 * 用于在三维场景中交互式拾取坐标点，常用于标注、绘制区域或交互分析。
 *
 * @param App - WDP 实例对象
 * @param showCoordInfo - 是否显示坐标信息（true 显示 / false 隐藏）
 * @param showMarker - 是否显示取点标记（true 显示 / false 隐藏）
 * @param coordZRef - 高度参考模式："surface" | "ground" | "altitude"
 * @returns Promise<any> - 返回拾取操作结果
 */
export async function startPickPoint(
  App: any,
  showCoordInfo: boolean = false,
  showMarker: boolean = true,
  coordZRef: "surface" | "ground" | "altitude" = "surface"
): Promise<any> {
  if (!App?.Tools?.PickerPoint?.StartPickPoint) {
    console.error("❌ App 实例无效，请确保 WdpApi 初始化完成且包含 Tools.PickerPoint 模块");
    return null;
  }

  try {
    console.log("📍 启动三维取点功能...");
    console.log(`🧭 参数 => 显示坐标:${showCoordInfo}, 显示标记:${showMarker}, 模式:${coordZRef}`);

    const res = await App.Tools.PickerPoint.StartPickPoint(showCoordInfo, showMarker, coordZRef);

    if (res?.success) {
      console.log("✅ 取点功能启动成功:", res);
    } else {
      console.warn("⚠️ 启动取点功能失败:", res);
    }

    return res;
  } catch (error) {
    console.error("🚨 startPickPoint 执行出错:", error);
    return null;
  }
}

//////////////////////////////
// 🧹 结束取点
//////////////////////////////

/**
 * 结束取点功能
 *
 * 用于关闭取点交互状态，恢复正常场景操作。
 *
 * @param App - WDP 实例对象
 * @returns Promise<any> - 返回关闭操作结果
 */
export async function endPickPoint(App: any): Promise<any> {
  if (!App?.Tools?.PickerPoint?.EndPickPoint) {
    console.error("❌ App 实例无效，请确保 WdpApi 初始化完成且包含 Tools.PickerPoint 模块");
    return null;
  }

  try {
    console.log("🛑 正在结束取点功能...");

    const res = await App.Tools.PickerPoint.EndPickPoint();

    if (res?.success) {
      console.log("✅ 取点功能已关闭:", res);
    } else {
      console.warn("⚠️ 关闭取点功能失败:", res);
    }

    return res;
  } catch (error) {
    console.error("🚨 endPickPoint 执行出错:", error);
    return null;
  }
}

//////////////////////////////
// 📍 获取取点结果
//////////////////////////////

/**
 * 获取当前取点结果
 *
 * 返回用户已拾取的坐标点数组。
 *
 * @param App - WDP 实例对象
 * @param coordZRef - 高度参考模式："surface" | "ground" | "altitude"
 * @returns Promise<[number, number, number][]> - 返回拾取到的点坐标数组
 */
export async function getPickedPoints(
  App: any,
  coordZRef: "surface" | "ground" | "altitude" = "surface"
): Promise<[number, number, number][]> {
  if (!App?.Tools?.PickerPoint?.GetPickedPoints) {
    console.error("❌ App 实例无效，请确保 WdpApi 初始化完成且包含 Tools.PickerPoint 模块");
    return [];
  }

  try {
    console.log(`📡 获取取点结果（模式：${coordZRef})...`);

    const res = await App.Tools.PickerPoint.GetPickedPoints(coordZRef);

    const pickedPoints = res?.result?.pickedPoints || [];

    if (pickedPoints.length > 0) {
      console.log(`✅ 共获取到 ${pickedPoints.length} 个点:`, pickedPoints);
    } else {
      console.warn("⚠️ 未获取到取点结果:", res);
    }

    return pickedPoints;
  } catch (error) {
    console.error("🚨 getPickedPoints 执行出错:", error);
    return [];
  }
}
