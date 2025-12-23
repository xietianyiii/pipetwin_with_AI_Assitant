// 定义坐标类型（数组 [lon, lat, height]）
type Coord = [number, number, number?];

interface CreatedEntityInfo {
    customId: string;
    stationType: string;
}

/**
 * 批量创建 POI + 信息弹窗 + 曲线弹窗
 * @param App - WdpApi 实例
 * @param coords - 坐标数组 [[lon, lat, height], ...]
 * @param markerNormal - 普通图标 URL（单个或数组）
 * @param markerActive - 选中图标 URL（单个或数组）
 * @param infoUrl - 信息弹窗 HTML 地址（单个或数组）
 * @param curveUrl - 曲线弹窗 HTML 地址（单个或数组）
 * @param stationTypes - 泵站类型数组（与坐标一一对应）
 * @param onCurveOpen - 曲线按钮点击回调（可选）
 * @param infoWindowSize - 信息窗口大小 [width, height]（可选）
 */
export async function createPois(
    App: any,
    coords: Coord[],
    markerNormal: string | string[] = "http://wdpapi.51aes.com/doc-static/images/static/markerNormal.png",
    markerActive: string | string[] = "http://wdpapi.51aes.com/doc-static/images/static/markerActive.png",
    infoUrl: string | string[],
    curveUrl: string | string[],
    stationTypes: string[],
    onCurveOpen?: (station: string, type?: string) => void,
    infoWindowSize?: [number, number]
): Promise<CreatedEntityInfo[]> {
    if (!App || !coords?.length) {
        console.error("❌ App 实例或坐标数组无效");
        return [];
    }

    try {
        const createdEntities: CreatedEntityInfo[] = [];

        // 删除旧对象（防止重复创建）
        for (let i = 0; i < coords.length; i++) {
            const poiId = `poi-${i}`;
            const re = await App.Scene.GetByCustomId([poiId, `${poiId}-info`, `${poiId}-curve`]);
            if (re.success && re.result.length > 0) {
                for (const item of re.result) await item.Delete();
            }
        }

        // 注册一次全局事件
        await App.Renderer.RegisterSceneEvent([
            {
                name: "OnWebJSEvent",
                func: async (res: any) => {
                    console.log("📩 内嵌窗口发来的原始消息:", res);

                    const event = res?.args?.name || res?.result?.name;
                    let args = res?.args?.args || res?.result?.args;

                    if (typeof args === "string") {
                        try {
                            args = JSON.parse(args);
                        } catch (e) {
                            console.warn("⚠️ args 解析失败:", args);
                        }
                    }

                    if (event === "openCurve") {
                        const { station, index } = args || {};
                        const curveId = `poi-${index}-curve`;
                        const target = await App.Scene.GetByCustomId([curveId]);
                        if (target.success && target.result.length > 0) {
                            await target.result[0].SetVisible(true);
                        }
                        onCurveOpen && onCurveOpen(station, "open");
                    }

                    if (event === "closeCurve") {
                        const { station, index } = args || {};
                        const curveId = `poi-${index}-curve`;
                        const target = await App.Scene.GetByCustomId([curveId]);
                        if (target.success && target.result.length > 0) {
                            await target.result[0].SetVisible(false);
                        }
                        onCurveOpen && onCurveOpen(station, "close");
                    }
                },
            },
        ]);

        // 组装批量创建数据
        const jsonData = [];

        for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];
            if (!coord) continue;

            const [lon, lat, height = 71] = coord;
            const poiId = `poi-${i}`;
            const infoWinId = `${poiId}-info`;
            const curveWinId = `${poiId}-curve`;

            // 🧩 支持数组形式
            const currentMarkerNormal = Array.isArray(markerNormal)
                ? markerNormal[i] || markerNormal[0]
                : markerNormal;

            const currentMarkerActive = Array.isArray(markerActive)
                ? markerActive[i] || markerActive[0]
                : markerActive;

            const currentInfoUrl = Array.isArray(infoUrl)
                ? infoUrl[i] || infoUrl[0]
                : infoUrl;

            const currentCurveUrl = Array.isArray(curveUrl)
                ? curveUrl[i] || curveUrl[0]
                : curveUrl;

            const stationType = stationTypes[i] || "未知类型";

            jsonData.push(
                {
                    type: "Poi",
                    location: [lon, lat, height],
                    customId: poiId,
                    entityName: `POI-${i}`,
                    customData: { index: i, stationType },
                    poiStyle: {
                        markerNormalUrl: currentMarkerNormal,
                        markerActivateUrl: currentMarkerActive,
                        markerSize: [150, 342],
                        markerVisible: true,
                        labelVisible: false,
                    },
                },
                {
                    type: "Window",
                    location: [lon, lat, height],
                    customId: infoWinId,
                    entityName: `POI-${i}-window`,
                    customData: { index: i, stationType },
                    windowStyle: {
                        url: `${currentInfoUrl}?index=${i}`,
                        size: infoWindowSize || [450, 300],
                        offset: [102, 270],
                    },
                    bVisible: true,
                },
                {
                    type: "Window",
                    location: [lon, lat, height],
                    customId: curveWinId,
                    entityName: `POI-${i}-curve`,
                    customData: { index: i, stationType },
                    windowStyle: {
                        url: `${currentCurveUrl}?index=${i}`,
                        size: [600, 450],
                        offset: [580, 270],
                    },
                    bVisible: false,
                    visible2D: {
                        camera: { hideDistance: 2000, hideType: "default", scaleMode: "2D" },
                        interaction: { hoverTop: true },
                        entity: { overlapOrder: 3 },
                    },
                }
            );

            // 记录每个对象信息
            createdEntities.push(
                { customId: poiId, stationType },
                { customId: infoWinId, stationType },
                { customId: curveWinId, stationType }
            );
        }

        // 一次性创建所有对象
        const hasGroundPoint = coords.some((c) => c[2] === 0);

        const res = await App.Scene.Creates(jsonData, {
            calculateCoordZ: hasGroundPoint
                ? { coordZRef: "ground", coordZOffset: 0 }
                : { coordZRef: "surface", coordZOffset: 20 },
        });

        console.log("✅ 批量创建完成:", res);
        return createdEntities;
    } catch (error) {
        console.error("❌ 创建 POI 失败:", error);
        return [];
    }
}
