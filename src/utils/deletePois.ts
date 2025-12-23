/**
 * 删除所有 POI 与 Window 实体
 * @param App - WdpApi 实例
 * @param poiRegistry - 存储的 POI 和 Window 对象列表
 */
export async function handleDeleteAllPois(
  App: any,
  poiRegistry: { customId: string; stationType: string }[]
): Promise<void> {
  if (!App || !poiRegistry?.length) {
    console.warn("⚠️ App 实例或 poiRegistry 无效，无法删除");
    return;
  }

  // 提取所有 customId
  const allIds = poiRegistry.map((item) => item.customId);

  console.log("🧹 即将删除以下对象:", allIds);

  try {
    // 一次性查找所有对象
    const res = await App.Scene.GetByCustomId(allIds);

    if (res.success && res.result.length > 0) {
      for (const entity of res.result) {
        try {
          const delRes = await entity.Delete();
          console.log(`✅ 已删除对象 ${entity.customId || "未知ID"}`, delRes);
        } catch (err) {
          console.warn("⚠️ 删除失败:", err);
        }
      }

      console.log(`🧩 共删除 ${res.result.length} 个 POI / Window 实体`);
    } else {
      console.warn("⚠️ 未找到可删除的对象，请确认是否已创建");
    }
  } catch (error) {
    console.error("❌ 删除 POI 失败:", error);
  }

  // ✅ 清空内存中的记录
  poiRegistry.length = 0;
  console.log("📦 已清空 poiRegistry 本地缓存");
}
