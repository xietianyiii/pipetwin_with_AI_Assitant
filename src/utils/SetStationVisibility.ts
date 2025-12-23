/**
 * 设置指定泵站类型的 POI 与 Window 显隐
 * @param App - WdpApi 实例
 * @param poiRegistry - 所有创建的 POI / Window 信息数组
 * @param targetType - 目标泵站类型（如“雨水泵站”）
 * @param visible - 是否显示（true: 显示; false: 隐藏）
 */
export async function setStationVisibility(
  App: any,
  poiRegistry: { customId: string; stationType: string }[],
  targetType: string,
  visible: boolean
): Promise<void> {
  if (!App || !poiRegistry?.length) {
    console.warn("⚠️ App 实例或 poiRegistry 无效");
    return;
  }

  // ✅ 筛选出指定类型的对象
  const targets = poiRegistry.filter(
    (item) =>
      item.stationType === targetType && 
      !item.customId.includes("-curve") // ✅ 不操作曲线窗口
  );
  
  if (!targets.length) {
    console.warn(`⚠️ 未找到类型为 "${targetType}" 的对象`);
    return;
  }

  // ✅ 循环设置显隐
  for (const item of targets) {
    const re = await App.Scene.GetByCustomId([item.customId]);
    if (re.success && re.result.length > 0) {
      const entity = re.result[0];
      const res = await entity.SetVisible(visible);
      console.log(
        `🎯 ${visible ? "显示" : "隐藏"} ${item.stationType} (${item.customId})`,
        res
      );
    } else {
      console.warn(`未找到实体 ${item.customId}`);
    }
  }
}
