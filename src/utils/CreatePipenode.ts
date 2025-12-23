/**
 * Createpipenode.ts
 * 创建与操作管井（pipenode）
 * 包含：
 *  - 创建管井
 *  - 修改管井高度
 *  - 缓存管理
 */

const pipenodeCache = {
    pipenodes: {} as Record<string, any>,
};

/**
 * 创建管井对象
 * @param App - WDP 实例
 * @param shpUrl - 管井 SHP 文件路径
 * @param key - 管井标识（如 "rain", "sewage"）
 */
export async function createPipenode(App: any, shpUrl: string, key: string): Promise<void> {
    if (!App) {
        console.warn("⚠️ App 实例无效，无法创建管井");
        return;
    }

    try {
        console.log("🚧 开始创建管井...");

        // 如果已缓存对象则直接复用
        if (pipenodeCache.pipenodes[key]) {
            console.log(`🔁 管井已存在（${key}），使用缓存 EID:`, pipenodeCache.pipenodes[key].eid);
            return;
        }

        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "CreateWimPipeEntity",
            args:
            {
                guid: "",
                pipeUrl: shpUrl,
                groupType: key,
                fieldList:
                {
                    fields:
                        [
                            {
                                StandardName: "WellSurfaceAltitude",
                                FeatureName: "dmg"
                            },
                            {
                                StandardName: "WellLocationX",
                                FeatureName: "longitude"
                            },
                            {
                                StandardName: "WellLocationY",
                                FeatureName: "latitude"
                            },
                            {
                                StandardName: "WellCode",
                                FeatureName: "Wyid"
                            },
                            {
                                StandardName: "WellNeckDepth",
                                DefaultValue: "0.4"
                            },
                            {
                                StandardName: "WellBottomDepth",
                                FeatureName: "jds"
                            },
                            {
                                StandardName: "WellRoomSize",
                                DefaultValue: "2000X2000"
                            },
                            {
                                StandardName: "WellNeckSize",
                                DefaultValue: "700X700", 
                            },
                            {
                                StandardName: "WellCoverSize",
                                DefaultValue: "700X700"
                            },
                            {
                                StandardName: "WellCoverShapeType",
                                FeatureName: "jgx",
                                DefaultValue: "Round",
                                DetailFields:
                                    [
                                        {
                                            SourceName: "圆形",
                                            TargetName: "Round"
                                        },
                                        {
                                            SourceName: "矩形",
                                            TargetName: "Rect"
                                        }
                                    ]
                            },
                            {
                                StandardName: "WellAccessories",
                                FeatureName: "gzw",
                                DefaultValue: "jcj",
                                DetailFields:
                                    [
                                        {
                                            SourceName: "平箅",
                                            TargetName: "yb"
                                        },
                                        {
                                            SourceName: "雨水井",
                                            TargetName: "ysj"
                                        }
                                    ]
                            },
                            {
                                StandardName: "WellMaterial",
                                FeatureName: "cz",
                                DefaultValue: "HNT",
                                DetailFields:
                                    [
                                        {
                                            SourceName: "混凝土",
                                            TargetName: "HNT"
                                        },
                                        {
                                            SourceName: "塑料",
                                            TargetName: "SL"
                                        },
                                        {
                                            SourceName: "砖砌",
                                            TargetName: "ZQ"
                                        }
                                    ]
                            },
                            {
                                StandardName: "WellCoverMaterial",
                                FeatureName: "jgc",
                                DefaultValue: "CoverRain",
                                DetailFields:
                                    [
                                        {
                                            SourceName: "污水井盖",
                                            TargetName: "CoverSewage"
                                        },
                                        {
                                            SourceName: "雨水井盖",
                                            TargetName: "CoverRain"
                                        }
                                    ]
                            },
                            {
                                StandardName: "Fid",
                                FeatureName: "Wyid"
                            },
                            {
                                StandardName: "FilterType",
                                DetailFields:
                                    [
                                        {
                                            SourceName: "xl"
                                        },
                                        {
                                            SourceName: "dl",
                                        }
                                    ]
                            }
                        ]
                }
            }
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);
        console.log("🧱 管井创建结果:", res);

        if (!res.success) throw new Error(`❌ 管井创建失败: ${key}`);

        pipenodeCache.pipenodes[key] = res.result;
        console.log(`✅ 管井创建成功（${key}):`, res.result.eid);
        console.log("⏳ 等待管井加载完成...");
        await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch (error) {
        console.error("🚨 createpipenode 执行出错:", error);
    }
}

/**
 * 获取管井对象
 */
export function getPipeNodeByKey(key: string): any {
    const pipenode = pipenodeCache.pipenodes[key];
    if (!pipenode) {
        console.warn(`⚠️ 管井不存在，请先创建：${key}`);
        return null;
    }
    return pipenode;
}

/**
 * 修改管井高度
 * @param App - WDP 实例
 * @param height - 新的管井高度
 * @param key - 管井标识（如 "rain", "sewage"）
 */
export async function setPipeNodeHeight(App: any, height: number, key: string): Promise<void> {
    if (!App) {
        console.warn("⚠️ App 实例无效");
        return;
    }

    const pipenode = getPipeNodeByKey(key);
    if (!pipenode) {
        console.warn(`⚠️ 尚未创建 ${key} 管井，请先调用 createPipenode(${key})`);
        return;
    }

    try {
        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "SetPipeHeight",
            args: {
                guid: "",
                pipeHeight: height,
                eid: pipenode.eid,
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);
        if (res.success) {
            console.log(`📏 管井高度修改成功：${height} 米`);
        } else {
            console.error("❌ 修改管井高度失败:", res);
        }
    } catch (error) {
        console.error("🚨 setpipenodeHeight 执行出错:", error);
    }
}


/**
 * 设置管井高亮
 * @param App - WDP 实例
 * @param highlight - 是否高亮（true 表示开启高亮）
 * @param color - 高亮颜色（如 "#ffe600"）
 * @param intensity - 高亮强度（数值，如 15）
 * @param types - 管井类型数组（如 ["HNT"]）
 * @param key - 管井标识（如 "rain", "sewage"）
 * @param fIds - 可选的 FID 数组，用于指定特定的 FID 进行高亮（默认值为空数组）
 */
export async function setPipeNodeHighlight(
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

    const pipenode = getPipeNodeByKey(key);
    if (!pipenode) {
        console.warn(`⚠️ 尚未创建 ${key} 管井，请先调用 createpipenode(${key})`);
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
                eid: pipenode.eid, // 当前管井对象的 EID
                fIds: fIds || [],
                types: types || [], // 需要高亮的类型
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);

        if (res.success) {
            console.log(
                `💡 管井高亮设置成功: ${highlight ? "开启" : "关闭"}，颜色=${color}，亮度=${intensity}`
            );
        } else {
            console.error("❌ 设置高亮失败:", res);
        }
    } catch (error) {
        console.error("🚨 setpipenodeHighlight 执行出错:", error);
    }
}

/**
 * 设置管井显隐状态
 * @param App - WDP 实例
 * @param visible - 是否显示（true = 显示，false = 隐藏）
 * @param types - 管井类型数组（如 ["SN", "SL", "ZT"]，可选）
 * @param key - 管井标识（如 "rain", "sewage"）
 */
export async function setPipeNodeVisible(
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

    const pipenode = getPipeNodeByKey(key);
    if (!pipenode) {
        console.warn(`⚠️ 尚未创建 ${key} 管井，请先调用 createPipenode(${key})`);
        return;
    }

    try {
        console.log(`👁️ 正在${visible ? "显示" : "隐藏"} ${key} 管井...`);

        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "SetPipeShowState",
            args: {
                guid: "",
                visible, // true 显示, false 隐藏
                eid: pipenode.eid,
                fIds: fIds || [],
                types: types || [], // 可以指定类型，不传则作用于全部
            },
        };

        const res = await App.Customize.RunCustomizeApi(jsondata);

        if (res.success) {
            console.log(
                `✅ 管井显隐设置成功: ${visible ? "已显示" : "已隐藏"} (${types?.length ? types.join(", ") : "全部类型"} ${fIds?.length ? `FID: ${fIds.join(", ")}` : ""})`
            );
        } else {
            console.error("❌ 管井显隐设置失败:", res);
        }
    } catch (error) {
        console.error("🚨 setPipeNodeVisible 执行出错:", error);
    }
}


/**
 * 设置管井液位高度
 * @param App - WDP 实例
 * @param pipeLiquidLevel - 管井液位高度（单位：米）
 * @param pipeLiquidLevels - 管井液位高度数组（单位：米）
 * @param color - 颜色
 * @param key - 管井标识（如 "rain", "sewage"）
 * @param types - 管井fids数组（如 ["SN", "SL", "ZT"]，可选）
 */
export async function setPipeNodeLiquidLevel(
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

    const pipenode = getPipeNodeByKey(key);
    if (!pipenode) {
        console.warn(`⚠️ 尚未创建 ${key} 管井，请先调用 createPipenode(${key})`);
        return;
    }

    try {
        console.log(`👁️ 正在设置 ${key} 管井液位高度为 ${pipeLiquidLevel} 米, 颜色为${color}...`);

        const jsondata = {
            apiClassName: "WimPipeAPI",
            apiFuncName: "SetPipeLiquidLevel",
            args: {
                guid: "",
                eid: pipenode.eid,
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
                `✅ 管井液位高度设置成功: ${pipeLiquidLevel} 米, 颜色为${color} (${types?.length ? types.join(", ") : "全部类型"})`
            );
        } else {
            console.error("❌ 管井液位高度设置失败:", res);
        }
    } catch (error) {
        console.error("🚨 setPipeNodeLiquidLevel 执行出错:", error);
    }
}



/**
 * 获取当前缓存的管井对象（如果需要直接访问）
 */
export function getpipenode(key: string): any {
    return pipenodeCache.pipenodes[key];
}
