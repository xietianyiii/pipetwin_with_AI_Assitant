/**
 * effects.ts
 *  - 创建粒子特效
 *  - 删除粒子特效
 */

const EFFECT_CUSTOM_ID = "my-effects-id";



/**
 * 创建粒子特效
 *
 * @param App - WDP 实例
 * @param location - 粒子特效位置 [lon, lat, height]
 * @param scale3d - 粒子缩放 [x, y, z]
 * @param bVisible - 是否可见
 * @param seedId - 粒子模型编号（从 DaaS 获取）
 */
export async function createEffect(
  App: any,
  location: [number, number, number],
  scale3d: [number, number, number] = [1, 1, 1],
  bVisible: boolean = true,
  seedId: string
): Promise<void> {
  if (!App?.Scene) {
    console.error("❌ App 实例无效，请确保包含 Scene 模块");
    return;
  }

  try {
    console.log("✨ 正在创建粒子特效...");

    // 删除旧实例
    const re = await App.Scene.GetByCustomId([EFFECT_CUSTOM_ID]);
    if (re.success && re.result.length > 0) {
      console.log("🧹 删除旧粒子特效...");
      await re.result[0].Delete();
    }

    // 创建新特效
    const entityObj = new App.Effects({
      location,
      rotator: {
        pitch: 0,
        yaw: 0,
        roll: 0,
      },
      scale3d,
      bVisible,
      speed: 1,
      seedId,
      entityName: "effects-entity",
      customId: EFFECT_CUSTOM_ID,
      customData: { data: "effectsData" },
    });

    const res = await App.Scene.Add(entityObj, {
      calculateCoordZ: {
        coordZRef: "ground",
        coordZOffset: 0.4,
      },
    });

    if (res.success) {
      console.log("✅ 粒子特效创建成功:", entityObj);
    } else {
      console.warn("⚠️ 粒子特效创建失败:", res);
    }
  } catch (error) {
    console.error("🚨 createEffect 执行出错:", error);
  }
}



/**
 * 删除粒子特效
 *
 * @param App - WDP 实例
 */
export async function deleteEffect(App: any): Promise<void> {
  if (!App?.Scene) {
    console.error("❌ App 实例无效");
    return;
  }

  try {
    console.log("🗑️ 正在删除粒子特效...");

    const re = await App.Scene.GetByCustomId([EFFECT_CUSTOM_ID]);
    if (re.success && re.result.length > 0) {
      const res = await re.result[0].Delete();
      console.log("🧹 特效删除成功:", res);
    } else {
      console.warn("⚠️ 当前无粒子特效，请先创建！");
    }
  } catch (error) {
    console.error("🚨 deleteEffect 执行出错:", error);
  }
}
