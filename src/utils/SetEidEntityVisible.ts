/**
 * SetEidEntity.ts
 * 为场景中已有 EID 设置 customId，并提供显隐控制方法
 */

export async function setEntityCustomId(
  App: any,
  eid: string,
  customId: string
): Promise<any> {
  if (!App?.Scene?.GetByEids) {
    console.error("❌ App 实例无效，请确认 Scene 模块已加载");
    return null;
  }

  try {
    console.log(`🔍 正在通过 EID 查询实体: ${eid} ...`);

    const res = await App.Scene.GetByEids([eid]);
    console.log("📦 查询结果:", res);

    if (!res.success || res.result.length === 0) {
      console.warn("⚠️ 未找到对应 EID 的实体:", eid);
      return null;
    }

    const entity = res.result[0];

    // 直接设置 customId
    entity.customId = customId;
    console.log(`🔑 已为实体设置 customId: ${customId}`);

    return entity;
  } catch (error) {
    console.error("🚨 setEntityCustomId 执行出错:", error);
    return null;
  }
}



/**
 * 设置通过 customId 绑定的实体显隐
 *
 * @param App - WDP 实例
 * @param customId - 先前绑定的 customId
 * @param visible - 是否显示（true 显示 / false 隐藏）
 */
export async function setEntityVisible(
  App: any,
  customId: string,
  visible: boolean
): Promise<any> {
  if (!App?.Scene?.GetByCustomId) {
    console.error("❌ App 实例无效，请确认 Scene 模块已加载");
    return null;
  }

  try {
    console.log(`👁️ 正在设置实体显隐: ${customId} => ${visible}`);

    const re = await App.Scene.GetByCustomId([customId]);

    if (!re.success || re.result.length === 0) {
      console.warn("⚠️ 未找到对应 customId 的实体:", customId);
      return null;
    }

    const entity = re.result[0];
    const res = await entity.SetVisible(visible);

    if (res.success) {
      console.log(`✅ 实体显隐设置成功: ${visible}`);
    } else {
      console.warn("⚠️ 实体显隐设置失败:", res);
    }

    return res;
  } catch (error) {
    console.error("🚨 setEntityVisible 执行出错:", error);
    return null;
  }
}
