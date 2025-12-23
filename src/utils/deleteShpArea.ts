/**
 * 删除所有 SHP 区域实体
 * @param App - WdpApi 实例
 * @param shpAreaRegistry - 存储的 SHP 区域 customId 数组
 */
export async function deleteShpArea(App: any, shpAreaRegistry: string[]): Promise<void> {
  if (!App || !shpAreaRegistry?.length) {
    console.warn("⚠️ App 实例或 shpAreaRegistry 无效，无法删除");
    return;
  }

  console.log("🧹 即将删除以下 SHP 区域对象:", shpAreaRegistry);

  try {
    // 一次性查找所有 SHP 实体
    const res = await App.Scene.GetByCustomId(shpAreaRegistry);

    if (res.success && res.result.length > 0) {
      for (const entity of res.result) {
        try {
          const delRes = await entity.Delete();
          console.log(`✅ 已删除 SHP 区域对象 ${entity.customId || "未知ID"}`, delRes);
        } catch (err) {
          console.warn(`⚠️ 删除 SHP 区域失败 (${entity.customId || "未知ID"}):`, err);
        }
      }

      console.log(`🧩 共删除 ${res.result.length} 个 SHP 区域实体`);
    } else {
      console.warn("⚠️ 未找到可删除的 SHP 区域，请确认是否已创建");
    }
  } catch (error) {
    console.error("❌ 删除 SHP 区域失败:", error);
  }

  // ✅ 清空内存中的记录
  shpAreaRegistry.length = 0;
  console.log("📦 已清空 shpAreaRegistry 本地缓存");
}
