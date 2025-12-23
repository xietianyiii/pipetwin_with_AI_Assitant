/**
 * CreatePipeline.ts
 * 创建与操作管网（Pipeline）
 * 包含：
 *  - 创建管网
 *  - 修改管网高度
 *  - 缓存管理
 */

const pipelineCache = {
    pipelines: {} as Record<string, any>,
};

/**
 * 创建管网对象
 * @param App - WDP 实例
 * @param shpUrl - 管网 SHP 文件路径
 * @param key - 管网标识（如 "rain", "sewage"）
 */
export async function createPipeline(App: any, shpUrl: string, key: string): Promise<void> {
    if (!App) {
        console.warn("⚠️ App 实例无效，无法创建管网");
        return;
    }

    try {
        console.log("🚧 开始创建管网...");

        // 如果已缓存对象则直接复用
        if (pipelineCache.pipelines[key]) {
            console.log(`🔁 管网已存在（${key}），使用缓存 EID:`, pipelineCache.pipelines[key].eid);
            return;
        }

        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "CreateWimPipeEntity",
            args: {
                guid: "",
                pipeUrl: shpUrl,
                groupType: key,
                fieldList: {
                    fields: [
                        { StandardName: "PipeFlow", FeatureName: "flow_direction" },
                        { StandardName: "PipeCodeStart", FeatureName: "start_lon" },
                        { StandardName: "PipeCodeEnd", FeatureName: "start_lon" },
                        { StandardName: "PipeLocationStartX", FeatureName: "start_lon" },
                        { StandardName: "PipeLocationStartY", FeatureName: "start_lat" },
                        { StandardName: "PipeLocationEndX", FeatureName: "end_lon" },
                        { StandardName: "PipeLocationEndY", FeatureName: "end_lat" },
                        { StandardName: "PipeSurfaceAltitudeStart", FeatureName: "qdg" },
                        { StandardName: "PipeSurfaceAltitudeEnd", FeatureName: "zdg" },
                        { StandardName: "PipeBurialDepthStart", FeatureName: "qdm" },
                        { StandardName: "PipeBurialDepthEnd", FeatureName: "zdm" },
                        { StandardName: "PipeDiameter", FeatureName: "gj"},
                        // { StandardName: "PipeDiameter", FeatureName: "gj", "Expression": "param(gj)*2" },
                        {
                            StandardName: "PipeMaterial",
                            FeatureName: "cz",
                            DefaultValue: "HNT",
                            DetailFields: [
                                { SourceName: "钢管", TargetName: "GC" },
                                // { SourceName: "铸铁", TargetName: "ZT" },
                                { SourceName: "铸铁", TargetName: "SN" },
                                { SourceName: "水泥", TargetName: "SN" },
                                { SourceName: "砖石", TargetName: "ZQ" },
                                { SourceName: "陶瓷", TargetName: "TC" },
                                { SourceName: "塑料", TargetName: "SL" },
                                { SourceName: "ZT", TargetName: "ZT" },
                            ],
                        },
                        { StandardName: "Fid", FeatureName: "Wyid" },
                        {
                            StandardName: "FilterType",
                            DetailFields: [{ SourceName: "xl" }, { SourceName: "dl" }],
                        },
                    ],
                },
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);
        console.log("🧱 管网创建结果:", res);

        if (!res.success) throw new Error(`❌ 管网创建失败: ${key}`);

        pipelineCache.pipelines[key] = res.result;
        console.log(`✅ 管网创建成功（${key}):`, res.result.eid);
        console.log("⏳ 等待管网加载完成...");
        await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch (error) {
        console.error("🚨 createPipeline 执行出错:", error);
    }
}

/**
 * 获取管网对象
 */
export function getPipelineByKey(key: string): any {
    const pipeline = pipelineCache.pipelines[key];
    if (!pipeline) {
        console.warn(`⚠️ 管网不存在，请先创建：${key}`);
        return null;
    }
    return pipeline;
}

/**
 * 修改管网高度
 * @param App - WDP 实例
 * @param height - 新的管网高度
 * @param key - 管网标识（如 "rain", "sewage"）
 */
export async function setPipelineHeight(App: any, height: number, key: string): Promise<void> {
    if (!App) {
        console.warn("⚠️ App 实例无效");
        return;
    }

    const pipeline = getPipelineByKey(key);
    if (!pipeline) {
        console.warn(`⚠️ 尚未创建 ${key} 管网，请先调用 createPipeline(${key})`);
        return;
    }

    try {
        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "SetPipeHeight",
            args: {
                guid: "",
                pipeHeight: height,
                eid: pipeline.eid,
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);
        if (res.success) {
            console.log(`📏 管网高度修改成功：${height} 米`);
        } else {
            console.error("❌ 修改管网高度失败:", res);
        }
    } catch (error) {
        console.error("🚨 setPipelineHeight 执行出错:", error);
    }
}


/**
 * 设置管网高亮
 * @param App - WDP 实例
 * @param highlight - 是否高亮（true 表示开启高亮）
 * @param color - 高亮颜色（如 "#ffe600"）
 * @param intensity - 高亮强度（数值，如 15）
 * @param types - 管网类型数组（如 ["SN", "SL", "ZT"]）
 * @param key - 管网标识（如 "rain", "sewage"）
 * @param fIds - 可选的 FID 数组，用于指定特定的 FID 进行高亮（默认值为空数组）
 */
export async function setPipelineHighlight(
    App: any,
    highlight: boolean,
    color: string,
    intensity: number,
    types: string[],
    key: string,
    fIds?: string[],
): Promise<void> {
    if (!App) {
        console.warn("⚠️ App 实例无效");
        return;
    }

    const pipeline = getPipelineByKey(key);
    if (!pipeline) {
        console.warn(`⚠️ 尚未创建 ${key} 管网，请先调用 createPipeline(${key})`);
        return;
    }

    try {
        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "SetPipeHighLight",
            args: {
                guid: "",
                highLightInst: intensity, // 高亮强度
                highLightType: highlight ? 1 : 0, // 1=开，0=关
                highLightColor: color, // 高亮颜色
                eid: pipeline.eid, // 当前管网对象的 EID
                fIds: fIds || [],
                types: types || [], // 需要高亮的类型
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);

        if (res.success) {
            console.log(
                `💡 管网高亮设置成功: ${highlight ? "开启" : "关闭"}，颜色=${color}，亮度=${intensity}`
            );
        } else {
            console.error("❌ 设置高亮失败:", res);
        }
    } catch (error) {
        console.error("🚨 setPipelineHighlight 执行出错:", error);
    }
}

/**
 * 设置管网显隐状态
 * @param App - WDP 实例
 * @param visible - 是否显示（true = 显示，false = 隐藏）
 * @param types - 管网类型数组（如 ["SN", "SL", "ZT"]，可选）
 * @param key - 管网标识（如 "rain", "sewage"）
 */
export async function setPipelineVisible(
    App: any,
    visible: boolean,
    key: string,
    types?: string[],
    fIds?: string[],
): Promise<void> {
    if (!App) {
        console.warn("⚠️ App 实例无效");
        return;
    }

    const pipeline = getPipelineByKey(key);
    if (!pipeline) {
        console.warn(`⚠️ 尚未创建 ${key} 管网，请先调用 createPipeline(${key})`);
        return;
    }

    try {
        console.log(`👁️ 正在${visible ? "显示" : "隐藏"} ${key} 管网...`);

        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "SetPipeShowState",
            args: {
                guid: "",
                visible, // true 显示, false 隐藏
                eid: pipeline.eid,
                fIds: fIds || [],
                types: types || [], // 可以指定类型，不传则作用于全部
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);

        if (res.success) {
            console.log(
                `✅ 管网显隐设置成功: ${visible ? "已显示" : "已隐藏"} (${types?.length ? types.join(", ") : "全部类型"} ${fIds?.length ? `FID: ${fIds.join(", ")}` : ""})`
            );
        } else {
            console.error("❌ 管网显隐设置失败:", res);
        }
    } catch (error) {
        console.error("🚨 setPipelineVisible 执行出错:", error);
    }
}


/**
 * 设置管网液位高度
 * @param App - WDP 实例
 * @param pipeLiquidLevel - 管网液位高度（单位：米）
 * @param pipeLiquidLevels - 管网液位高度数组（单位：米）
 * @param color - 颜色
 * @param key - 管网标识（如 "rain", "sewage"）
 * @param types - 管网fids数组（如 ["SN", "SL", "ZT"]，可选）
 */
export async function setPipeLiquidLevel(
    App: any,
    pipeLiquidLevel: number,
    color: string,
    key: string,
    pipeLiquidLevels?: number[],
    types?: string[],
): Promise<void> {
    if (!App) {
        console.warn("⚠️ App 实例无效");
        return;
    }

    const pipeline = getPipelineByKey(key);
    if (!pipeline) {
        console.warn(`⚠️ 尚未创建 ${key} 管网，请先调用 createPipeline(${key})`);
        return;
    }

    try {
        console.log(`👁️ 正在设置 ${key} 管网液位高度为 ${pipeLiquidLevel} 米, 颜色为${color}...`);

        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "SetPipeLiquidLevel",
            args: {
                guid: "",
                eid: pipeline.eid,
                fIds: [],
                pipeLiquidLevel: pipeLiquidLevel,
                pipeLiquidLevels: pipeLiquidLevels,
                color: color,
                isOpen: true,
                isFlow: true,
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);

        if (res.success) {
            console.log(
                `✅ 管网液位高度设置成功: ${pipeLiquidLevel} 米, 颜色为${color} (${types?.length ? types.join(", ") : "全部类型"})`
            );
        } else {
            console.error("❌ 管网液位高度设置失败:", res);
        }
    } catch (error) {
        console.error("🚨 setPipeLiquidLevel 执行出错:", error);
    }
}


/**
 * 设置管网流向
 * @param App - WDP 实例
 * @param pipeFlowdirction - 管网流向（单位：米）
 * @param pipeFlowStyle - 管网流向样式（0,1,2）
 * @param color - 颜色
 * @param visible - 是否显示（true = 显示，false = 隐藏）
 * @param key - 管网标识（如 "rain", "sewage"）
 * @param fIds - 管网fids数组（"fid"为各构件要素的唯一标识ID，可选）
 */
export async function setPipeFlowState(
    App: any,
    pipeFlowdirction: number,
    pipeFlowStyle: number,
    color: string,
    visible: boolean,
    key: string,
    fIds?: number[],
): Promise<void> {
    if (!App) {
        console.warn("⚠️ App 实例无效");
        return;
    }

    const pipeline = getPipelineByKey(key);
    if (!pipeline) {
        console.warn(`⚠️ 尚未创建 ${key} 管网，请先调用 createPipeline(${key})`);
        return;
    }

    try {
        console.log(`👁️ 正在设置 ${key} 管网流向为 ${pipeFlowdirction} ,样式为${pipeFlowStyle}, 颜色为${color}..., 显示为${visible}`);

        const jsondata = {
            "apiClassName": "WimPipeAPI",
            "apiFuncName": "SetPipeFlowState",
            "args":
            {
                "guid": "",  //为空即可
                "eid": pipeline.eid,
                "visible": visible,
                "fIds": fIds,
                "flow": pipeFlowdirction,
                "type": pipeFlowStyle,
                "color": color,
                "reset": false
            }
        }

        const res = await App.Customize.RunCustomizeApi(jsondata);

        if (res.success) {
            console.log(
                `✅ ${key} 管网流向设置成功: ${pipeFlowdirction} ,样式为${pipeFlowStyle}, 颜色为${color}..., 显示为${visible} (${fIds?.length ? fIds.join(", ") : "全部类型"})`
            );
        } else {
            console.error("❌ 管网流向设置失败:", res);
        }
    } catch (error) {
        console.error("🚨 setPipeFlowState 执行出错:", error);
    }
}

/**
 * 获取当前缓存的管网对象（如果需要直接访问）
 */
export function getPipeline(key: string): any {
    return pipelineCache.pipelines[key];
}


/**
 * pipelineClickEvent.ts
 * 开启管网点击事件 + 注册回调
 */


/**
 * 开启管网点击事件（SetPipeClickStatus）
 *
 * @param App - WDP 实例对象
 * @param enable - 是否开启点击回调（true 开启 / false 关闭）
 * @returns Promise<any>
 */
export async function enablePipelineClick(
    App: any,
    enable: boolean = true
): Promise<any> {
    if (!App?.Customize?.RunCustomizeApi) {
        console.error("❌ App 实例无效，缺少 Customize.RunCustomizeApi");
        return null;
    }

    try {
        console.log(`🔔 管网点击事件：${enable ? "开启" : "关闭"}...`);

        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "SetPipeClickStatus",
            args: {
                guid: "",
                status: enable,
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);

        if (res.success) {
            console.log("✅ 管网点击事件设置成功:", res);
        } else {
            console.warn("⚠️ 管网点击事件设置失败:", res);
        }

        return res;
    } catch (error) {
        console.error("🚨 enablePipelineClick 执行出错:", error);
        return null;
    }
}



/**
 * 注册管网点击事件回调（OnPipeElementClicked）
 *
 * @param App - WDP 实例
 * @param onClick - 点击回调函数：参数为 res（包含管线属性信息）
 * @returns Promise<void>
 */
export async function registerPipelineClickEvent(
    App: any,
    onClick: (res: any) => void
): Promise<void> {
    if (!App?.Renderer?.RegisterSceneEvent) {
        console.error("❌ App 实例无效，缺少 Renderer.RegisterSceneEvent");
        return;
    }

    try {
        console.log("🎧 正在注册管网点击事件回调...");

        await App.Renderer.RegisterSceneEvent([
            {
                name: "OnPipeElementClicked",
                func: async (res: any) => {
                    console.log("🛰️ 管网元素被点击:", res);
                    if (onClick) onClick(res);
                },
            },
        ]);

        console.log("✅ 管网点击事件回调注册完成");
    } catch (error) {
        console.error("🚨 registerPipelineClickEvent 执行出错:", error);
    }
}

/**
 * 从管网点击事件中提取 eid 和 fId
 *
 * @param eventResult - OnPipeElementClicked 回调中的 res
 * @returns { eid: string, fId: string } | null
 */
export function extractPipelineClickInfo(eventResult: any): { eid: string, fId: string } | null {
    if (!eventResult || !eventResult.result) {
        console.warn("⚠️ 点击事件格式异常，无法解析管网信息:", eventResult);
        return null;
    }

    const eid = eventResult.result.eid;
    const fId = eventResult.result.fId;

    if (!eid || !fId) {
        console.warn("⚠️ 缺少 eid 或 fId, 返回信息不完整:", eventResult.result);
        return null;
    }

    console.log(`📌 管网点击信息提取成功 -> eid: ${eid}, fId: ${fId}`);

    return { eid, fId };
}

//////////////////////////////
// 🎯 聚焦指定管线
//////////////////////////////

/**
 * 聚焦指定管线段
 *
 * @param App - WDP 实例对象
 * @param eid - 管网实体 EID
 * @param fId - 管段 FID
 * @param pitch - 俯仰角（默认 -30）
 * @param yaw - 偏航角（默认 0）
 * @param distanceFactor - 镜头距离系数（默认 1）
 * @param flyTime - 飞行过渡时间（默认 1s）
 */
export async function focusPipelineSegment(
    App: any,
    eid: string,
    fId: string,
    distanceFactor: number = 0.25,
    pitch: number = -30,
    yaw: number = -60,
    flyTime: number = 1
): Promise<any> {
    if (!App?.Customize?.RunCustomizeApi) {
        console.error("❌ App 实例无效，请检查 Customize 模块");
        return null;
    }

    try {
        console.log(
            `🎯 正在聚焦管段... \n` +
            `   ➤ eid: ${eid}\n` +
            `   ➤ fId: ${fId}\n` +
            `   ➤ pitch: ${pitch}\n` +
            `   ➤ yaw: ${yaw}\n` +
            `   ➤ distanceFactor(传入): ${distanceFactor}\n` +   // 👈 打印你指定的参数
            `   ➤ flyTime: ${flyTime}`
        );


        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "PipeCoordquery",
            args: {
                guid: "",
                eid,
                fId,
                pitch,
                yaw,
                distanceFactor,
                flyTime,
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);

        if (res.success) {
            console.log("✅ 管段聚焦成功:", res);
        } else {
            console.warn("⚠️ 管段聚焦失败:", res);
        }

        return res;
    } catch (error) {
        console.error("🚨 focusPipelineSegment 执行出错:", error);
        return null;
    }
}

// 当前显示的管线标签缓存
const pipelineLabelCache = {
    PipeInfo: { eid: null as string | null, fId: null as string | null },
    WellInfo: { eid: null as string | null, fId: null as string | null },
    Fluid: { eid: null as string | null, fId: null as string | null },
};

//////////////////////////////
// 🏷️ 添加管线标签
//////////////////////////////

/**
 * 为指定管段添加标签
 *
 * @param App - WDP 实例对象
 * @param eid - 管网实体 EID
 * @param fId - 管段 FID
 * @param type - 标签类型 PipeInfo | WellInfo | Fluid
 */
export async function addPipelineLabel(
    App: any,
    eid: string,
    fId: string,
    type: "PipeInfo" | "WellInfo" | "Fluid" = "PipeInfo"
): Promise<any> {
    if (!App?.Customize?.RunCustomizeApi) {
        console.error("❌ App 实例无效，请检查 Customize 模块");
        return null;
    }

    try {
        // 1️⃣ 先删除上一条的标签
        if (pipelineLabelCache[type].eid && pipelineLabelCache[type].fId) {
            await deletePipelineLabel(App, type);
        }

        console.log(`🏷️ 添加管段标签 eid=${eid}, fId=${fId}, type=${type} ...`);

        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "AddLabels",
            args: {
                guid: "",
                eid,
                fid: fId,
                Type: type,
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);

        if (res.success) {
            console.log("✅ 标签添加成功:", res);

            pipelineLabelCache[type] = { eid, fId };
        } else {
            console.warn("⚠️ 标签添加失败:", res);
        }

        return res;
    } catch (error) {
        console.error("🚨 addPipelineLabel 执行出错:", error);
        return null;
    }
}


//////////////////////////////
// 🗑️ 删除标签（自动处理缓存）
//////////////////////////////

/**
 * 删除指定管段的标签
 * 如果传入 eid 和 fId，则删除该标签；
 * 如果未传入，则删除缓存中的标签（上一条）
 *
 * @param App - WDP 实例对象
 * @param eid - 管网实体 EID（可选）
 * @param fId - 管段 FID（可选）
 * @param type - 标签类型，"" 表示全部类型
 */
export async function deletePipelineLabel(
    App: any,
    type: "PipeInfo" | "WellInfo" | "Fluid",
    eid?: string,
    fId?: string,
): Promise<void> {
    if (!App?.Customize?.RunCustomizeApi) {
        console.error("❌ App 实例无效");
        return;
    }

    // 若未传入，则删除缓存中记录的标签
    const cache = pipelineLabelCache[type];
    const targetEid = eid || cache.eid;
    const targetFid = fId || cache.fId;

    if (!targetEid || !targetFid) {
        console.warn("⚠️ 没有可删除的标签（缓存为空）");
        return;
    }

    try {
        console.log(`🗑️ 删除标签 eid=${targetEid}, fId=${targetFid}`);

        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "DeleteLabels",
            args: {
                guid: "",
                eid: targetEid,
                fid: targetFid,
                Type: type,
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);

        if (res.success) {
            console.log("✅ 标签删除成功:", res);

            // 清空缓存
            pipelineLabelCache[type].eid = null;
            pipelineLabelCache[type].fId = null;
        } else {
            console.warn("⚠️ 标签删除失败:", res);
        }
    } catch (error) {
        console.error("🚨 deletePipelineLabel 执行出错:", error);
    }
}
