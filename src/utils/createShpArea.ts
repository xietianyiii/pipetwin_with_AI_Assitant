/**
 * 批量创建 SHP 面积覆盖物到场景中
 * @param App       - WdpApi 实例
 * @param shpUrls   - SHP 文件 URL 数组
 * @param colors    - 颜色字符串数组（如 ["FFE4B5", "87CEFA"]），会与 shpUrls 按索引对应，不足时循环使用
 * @returns Promise<string[]> - 返回创建成功的 customId 数组
 */
export async function createShpArea(App: any, shpUrls: string[], colors: string[]): Promise<string[]> {
  const createdIds: string[] = [];

  if (!App || !App.Scene || !App.DataModel) {
    console.error("❌ App 实例无效，请确保传入的是正确的 WdpApi 实例。");
    return createdIds;
  }

  for (let i = 0; i < shpUrls.length; i++) {
    const shpUrl = shpUrls[i];
    const color = colors[i % colors.length];
    const customId = `shp-range-${Date.now()}-${i}`; // 保证唯一性

    try {
      // 删除旧的同 ID 对象（防止残留）
      const exist = await App.Scene.GetByCustomId([customId]);
      if (exist.success && exist.result.length > 0) {
        await exist.result[0].Delete();
      }

      // 从 SHP 文件创建几何
      const geoRes = await App.DataModel.Geometry.CreateGeometryFromShapefile(shpUrl);
      if (!geoRes.success || !geoRes.result?.polygon2D?.length) {
        console.error(`❌ 创建几何失败: ${shpUrl}`);
        continue;
      }

      // 创建范围实体
      const range = new App.Range({
        polygon2D: {
          coordinates: geoRes.result.polygon2D[0].polygon,
        },
        rangeStyle: {
          type: "loop_line",
          fillAreaType: "block",
          height: 50,
          strokeWeight: 20,
          color,
        },
        entityName: `shp-area-${i}`,
        customId,
        customData: { sourceUrl: shpUrl },
      });

      // 添加到场景
      const res = await App.Scene.Add(range, {
        calculateCoordZ: {
          coordZRef: "Ground",
          coordZOffset: 0,
        },
      });

      if (res.success) {
        createdIds.push(customId);
        console.log(`✅ 已创建 SHP 区域: ${shpUrl} -> ID: ${customId}`);
      } else {
        console.warn(`⚠️ 添加失败: ${shpUrl}`);
      }
    } catch (err) {
      console.error(`❌ 处理 SHP 文件出错: ${shpUrl}`, err);
    }
  }

  return createdIds;
}
