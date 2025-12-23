/**
 * 更新相机位置与姿态
 * @param App - WDP 实例对象
 * @param position - 相机位置 [longitude, latitude, altitude]
 * @param rotation - 相机旋转角度 { pitch: number, yaw: number }
 * @param flyTime - 过渡时长（秒）
 */
export async function updateCamera(
  App: any,
  position: [number, number, number],
  rotation: { pitch: number; yaw: number },
  flyTime: number = 1
): Promise<void> {
  if (!App?.CameraControl) {
    console.error("❌ App 实例未初始化或无 CameraControl 模块");
    return;
  }

  try {
    const jsondata = {
      location: position,
      locationLimit: [],
      rotation: rotation,
      pitchLimit: [-90, 0],
      yawLimit: [-180, 180],
      viewDistanceLimit: [0, 40000],
      fieldOfView: 90,
      controlMode: "RTS", // RTS 飞行模式
      flyTime, // 过渡时长
    };

    const res = await App.CameraControl.UpdateCamera(jsondata);
    console.log("🎥 相机更新成功:", res);
  } catch (error) {
    console.error("❌ 相机更新失败:", error);
  }
}


/**
 * 更新相机位置与姿态
 * @param App - WDP 实例对象
 * @param customId - 实体自定义ID
 * @param rotation - 相机旋转角度 { pitch: number, yaw: number }
 * @param distanceFactor - 相机聚焦倍率 [0.1 ~ 1]
 * @param flyTime - 过渡时长（秒）
 */
export async function updateCamerabycustomId(
  App: any,
  customId: string | string[],
  rotation: { pitch: number; yaw: number } = { pitch: -30, yaw: 0 },
  distanceFactor: number = 0.8,
  flyTime: number = 1
): Promise<void> {
  if (!App?.CameraControl) {
    console.error("❌ App 实例未初始化或无 CameraControl 模块");
    return;
  }

  try {
    const customIdRes = await App.Scene.GetByCustomId([customId]);
    const entity = customIdRes.result[0];

    const jsondata = {
      "rotation": {
        "pitch": rotation.pitch, // 俯仰角(-90~0)
        "yaw": rotation.yaw // 偏航角(-180~180; 0:东; 90:南; -90:北)
      },
      "distanceFactor": distanceFactor, // 聚焦倍率[0.1 ~ 1]
      "flyTime": flyTime, // 过渡时长(单位:秒)
      "entity": [entity] // 实体对象
    }

    const cameraRes = await App.CameraControl.Focus(jsondata);
    console.log("🎯 相机聚焦成功:", cameraRes);
  } catch (error) {
    console.error("❌ 相机更新失败:", error);
  }
}
