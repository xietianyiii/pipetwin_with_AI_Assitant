<template>
  <div class="drainage-container">
    <div class="header">
      <img src="@/assets/pngs/top.png" alt="顶部图片" class="top-image" />
      <div class="header-text">昆山市排水防涝管理平台</div>
    </div>

    <div class="sidebar">
      <div class="sidebar-left">
        <div class="cards-left-wrapper">
          <!-- 水位监测 -->
          <div class="card card-3">
            <div class="card-header card-header-flex">
              <div class="card-header-left">
                <svg
                  t="1759140862845"
                  class="card-header-icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="31836"
                  width="14"
                  height="12"
                >
                  <path
                    d="M0 355.388235h355.388235V0H0v355.388235zM668.611765 0v355.388235H1024V0H668.611765zM0 1024h355.388235V668.611765H0V1024z m668.611765 0H1024V668.611765H668.611765V1024z"
                    fill="#1ebdd0"
                    p-id="31837"
                  ></path>
                </svg>
                积水告警
              </div>
              <div class="card-header-right">
                <button
                  class="card-close-button"
                  @click="onCloseRoadFloodAlert"
                  v-show="isFloodAlertCloseButtonVisible"
                >
                  ✕
                </button>
              </div>
            </div>
            <div class="card3-content">
              <div class="card3-row1-content">
                <div class="card4-top-content">
                  <div class="card4-top-svg-container">
                    <svg
                      t="1759980938313"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="6849"
                      data-spm-anchor-id="a313x.search_index.0.i16.78e83a81pS2hqz"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M513.29 962.25c-49.69 0-97.91-9.74-143.32-28.95-43.85-18.54-83.22-45.09-117.02-78.89s-60.34-73.17-78.89-117.02c-19.21-45.41-28.95-93.63-28.95-143.32 0-67.38 18.94-137.04 56.29-207.05 29.21-54.74 69.74-109.89 120.47-163.89 85.64-91.16 170.24-147.38 173.8-149.73a31.98 31.98 0 0 1 35.25 0c3.56 2.35 88.16 58.58 173.79 149.74 50.73 54.01 91.26 109.15 120.47 163.89 37.35 70.01 56.29 139.67 56.29 207.05 0 49.69-9.74 97.91-28.95 143.32-18.54 43.85-45.09 83.22-78.89 117.02s-73.17 60.34-117.02 78.89c-45.41 19.2-93.63 28.94-143.32 28.94z m0-823.01c-28.52 20.79-87.47 66.54-145.68 128.69-72.3 77.2-158.49 196.45-158.49 326.15 0 167.72 136.45 304.17 304.17 304.17 167.72 0 304.17-136.45 304.17-304.17 0-129.7-86.19-248.95-158.49-326.15-58.2-62.15-117.15-107.89-145.68-128.69z"
                        fill="#2c2c2c"
                        p-id="6850"
                      ></path>
                      <path
                        d="M514.73 827.23c0.01-0.32 0.02-0.63 0.04-0.95 0.52-13.83 10.03-25.64 23.39-29.21 19.51-5.22 49.48-18.12 81.3-49.94 31.92-31.92 44.93-62.1 50.22-81.75 3.62-13.43 15.54-22.93 29.44-23.37l0.95-0.03c21.09-0.67 36.92 19.19 31.45 39.57-0.81 3.03-1.74 6.2-2.79 9.49-11.51 35.93-33.65 70.98-64.01 101.35-30.39 30.39-65.39 52.46-101.23 63.84-3.38 1.07-6.8 2.01-10.2 2.83-20.17 4.84-39.35-11.11-38.56-31.83z"
                        fill="#2c2c2c"
                        p-id="6851"
                      ></path>
                    </svg>
                  </div>

                  <div class="card4-top-text-background">
                    <span class="card4-top-text1">积水点总数</span>
                    <span class="card4-top-text2">60</span>
                    <span class="card4-top-text3">个</span>
                  </div>
                </div>
              </div>

              <div class="card3-row2-content">
                <div class="card3-left-content">
                  <div class="card3-svg-container"  @click="handleRoadIconClick">
                    <svg
                      t="1760492183499"
                      class="icon"
                      viewBox="0 0 1308 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="7922"
                      width="30"
                      height="30"
                    >
                      <path
                        d="M649.57812509 91.390625h-70.82812491l-6.56250045 140.43749991h83.81250054L649.57812509 91.390625z m9.65624991 210.65625027h-90.2343749l-13.03124992 280.78124964h116.15624945l-12.89062463-280.78124964z m-106.50000037 351L539.65624963 933.875h148.5l-12.89062464-280.82812473H552.78124973z m-294.37499981-460.31250009c-31.49999973 93.75000019-112.96874983 424.31249981-150.93749982 544.92187473-38.43750009 121.96875009-13.50000001 191.90624991 81.09375018 191.9062499h177.98437491L501.03124999 90.125h-134.5312499c-58.59374991 4.45312463-76.59374963 8.90625009-108.14062528 102.65625027zM1129.57812491 751.06249973c-22.54687537-66.93749972-112.59374991-460.07812462-139.59374991-544.87499964C962.984375 121.34374999 908.93749991 90.125 832.39062538 90.125H723.40625009l135.93750018 839.43749981h211.68749982c90.00000027 0 81.04687509-111.60937462 58.54687482-178.54687518z"
                        fill="#2c2c2c"
                        p-id="7923"
                      ></path>
                    </svg>
                  </div>
                  <div class="card3-label-container">
                    <div class="card3-label-container-top">
                      <div class="card3-label-title">道路</div>
                    </div>

                    <div class="card3-label-container-bottom">
                      <div class="card3-label-number">6</div>
                      <div class="card3-label-unit">条</div>
                    </div>
                  </div>
                </div>

                <div class="card3-middle-content">
                  <div class="card3-svg-container">
                    <svg
                      t="1760492429920"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="9017"
                      width="28"
                      height="28"
                    >
                      <path
                        d="M911.525 854.545h-40.3V354.6a37.657 37.657 0 0 0-18.828-33.032L647.763 202.488a37.822 37.822 0 0 0-56.816 33.032v619.025h-42.942V136.919a37.657 37.657 0 0 0-16.516-31.546 37.161 37.161 0 0 0-36.005-3.138L175.566 239.484a37.987 37.987 0 0 0-22.957 34.849v580.212h-40.134a13.378 13.378 0 0 0-13.378 13.378v43.602a13.378 13.378 0 0 0 13.378 13.378h799.05a13.378 13.378 0 0 0 13.378-13.378v-43.602a13.378 13.378 0 0 0-13.378-13.378zM695.33 337.755a13.378 13.378 0 0 1 13.378-13.378h42.447a13.378 13.378 0 0 1 13.378 13.378v42.116a13.378 13.378 0 0 1-13.378 13.378h-42.447a13.378 13.378 0 0 1-13.378-13.378z m0 107.024a13.378 13.378 0 0 1 13.378-13.378h42.447a13.378 13.378 0 0 1 13.378 13.378v42.612a13.378 13.378 0 0 1-13.378 13.378h-42.447a13.378 13.378 0 0 1-13.378-13.378z m0 107.19a13.378 13.378 0 0 1 13.378-13.378h42.447a13.378 13.378 0 0 1 13.378 13.378v42.612a13.378 13.378 0 0 1-13.378 13.378h-42.447a13.378 13.378 0 0 1-13.378-13.378z m0 107.025a13.378 13.378 0 0 1 13.378-13.379h42.447a13.378 13.378 0 0 1 13.378 13.379v42.446a13.378 13.378 0 0 1-13.378 13.378h-42.447a13.378 13.378 0 0 1-13.378-13.378z m0 107.024a13.378 13.378 0 0 1 13.378-13.378h42.447a13.378 13.378 0 0 1 13.378 13.378v43.272a13.378 13.378 0 0 1-13.378 13.378h-42.447a13.378 13.378 0 0 1-13.378-13.378zM379.871 231.226a13.543 13.543 0 0 1 13.378-13.543h42.612a13.543 13.543 0 0 1 13.378 13.543v42.446a13.378 13.378 0 0 1-13.378 13.378h-42.942a13.378 13.378 0 0 1-13.378-13.378z m0 107.024a13.378 13.378 0 0 1 13.378-13.378h42.612a13.378 13.378 0 0 1 13.378 13.378v41.621a13.378 13.378 0 0 1-13.378 13.378h-42.942a13.378 13.378 0 0 1-13.048-13.378z m0 107.025a13.378 13.378 0 0 1 13.378-13.378h42.612a13.378 13.378 0 0 1 13.378 13.378v42.611a13.543 13.543 0 0 1-13.378 13.379h-42.942a13.543 13.543 0 0 1-13.378-13.379z m0 107.19a13.378 13.378 0 0 1 13.378-13.379h42.612a13.378 13.378 0 0 1 13.378 13.379v42.116a13.378 13.378 0 0 1-13.378 13.378h-42.942a13.378 13.378 0 0 1-13.048-13.378z m0 107.024a13.378 13.378 0 0 1 13.378-13.378h42.612a13.378 13.378 0 0 1 13.378 13.378v42.446a13.378 13.378 0 0 1-13.378 13.379h-42.942a13.378 13.378 0 0 1-13.378-13.379z m0 107.025a13.543 13.543 0 0 1 13.378-13.379h42.612a13.543 13.543 0 0 1 13.378 13.379v42.776a13.543 13.543 0 0 1-13.378 13.378h-42.942a13.543 13.543 0 0 1-13.048-13.378zM250.88 337.754a13.213 13.213 0 0 1 13.213-13.377h42.612a13.378 13.378 0 0 1 13.378 13.378v42.116a13.378 13.378 0 0 1-13.378 13.378h-42.447a13.213 13.213 0 0 1-13.213-13.378z m0 107.025a13.213 13.213 0 0 1 13.213-13.378h42.612a13.378 13.378 0 0 1 13.378 13.378v42.612a13.378 13.378 0 0 1-13.378 13.378h-42.447a13.378 13.378 0 0 1-13.213-13.378z m0 107.19a13.213 13.213 0 0 1 13.213-13.378h42.612a13.378 13.378 0 0 1 13.378 13.378v42.612a13.378 13.378 0 0 1-13.378 13.378h-42.447a13.213 13.213 0 0 1-13.213-13.378z m0 107.025a13.213 13.213 0 0 1 13.213-13.379h42.612a13.378 13.378 0 0 1 13.378 13.379v42.446a13.378 13.378 0 0 1-13.378 13.378h-42.447a13.213 13.213 0 0 1-13.213-13.378z m0 107.024a13.378 13.378 0 0 1 13.213-13.378h42.612a13.378 13.378 0 0 1 13.378 13.378v43.272a13.378 13.378 0 0 1-13.378 13.378h-42.447a13.378 13.378 0 0 1-13.213-13.378z m0 0"
                        fill="#2c2c2c"
                        p-id="9018"
                      ></path>
                    </svg>
                  </div>
                  <div class="card3-label-container">
                    <div class="card3-label-container-top">
                      <div class="card3-label-title">小区</div>
                    </div>

                    <div class="card3-label-container-bottom">
                      <div class="card3-label-number">7</div>
                      <div class="card3-label-unit">个</div>
                    </div>
                  </div>
                </div>

                <div class="card3-right-content">
                  <div class="card3-svg-container">
                    <svg
                      t="1760492756612"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="11996"
                      width="26"
                      height="26"
                    >
                      <path
                        d="M832.078232 516.664371v177.644261c0 182.422398-145.733141 329.634485-326.335296 329.634485-172.752361 0-312.114654-134.982335-324.059993-306.426397h-0.511943v-5.233196c-0.341295-6.086435-1.76336-11.774692-1.76336-17.974892V516.664371H0.056902V358.75836h181.114098V0h154.948117v358.75836h688.05155v157.906011h-192.092435z m-495.959115 200.397289c11.205866 84.868792 82.650372 150.966337 169.623819 150.966337 94.709477 0 171.84224-78.042884 171.84224-173.719365V516.664371H336.119117v200.397289z"
                        fill="#2c2c2c"
                        p-id="11997"
                      ></path>
                    </svg>
                  </div>
                  <div class="card3-label-container">
                    <div class="card3-label-container-top">
                      <div class="card3-label-title">下立交</div>
                    </div>

                    <div class="card3-label-container-bottom">
                      <div class="card3-label-number">5</div>
                      <div class="card3-label-unit">个</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 积水点监测 -->
          <div class="card card-4">
            <div class="card-header">
              <svg
                t="1759140862845"
                class="card-header-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="31836"
                width="14"
                height="12"
              >
                <path
                  d="M0 355.388235h355.388235V0H0v355.388235zM668.611765 0v355.388235H1024V0H668.611765zM0 1024h355.388235V668.611765H0V1024z m668.611765 0H1024V668.611765H668.611765V1024z"
                  fill="#1ebdd0"
                  p-id="31837"
                ></path>
              </svg>
              <div class="card2-header-left">
                <button class="card2-title-button" @click="onFloodPumpCarClick">
                  防汛泵车
                </button>
              </div>
              <div class="card2-header-right">
                <button
                  class="card2-close-button"
                  @click="onCloseCard4"
                  v-show="isSimCard4CloseButtonVisible"
                >
                  ✕
                </button>
              </div>
            </div>
            <div class="card4-content">
              <div class="card4-top-container">
                <div class="card4-left-container">
                  <div class="card4-left-container-top">
                    <div class="card4-left-label-container">
                      <span class="card4-left-title-text1">泵车总数量</span>
                      <div class="card4-left-title-text-background"></div>
                    </div>

                    <div class="card4-left-number-container">
                      <div class="card4-left-number-text1">80</div>
                      <div class="card4-left-number-text2">辆</div>
                    </div>
                  </div>

                  <div class="card4-left-container-bottom">
                    <div class="card4-left-bottom-svg-container">
                      <img src="@/assets/svgs/泵车.svg" alt="泵车" />
                    </div>
                  </div>
                </div>
                <div class="card4-right-container">
                  <div class="card4-right-row-container">
                    <div class="card4-right-row-column-container">
                      <div class="card4-right-number-container">
                        <div class="card4-right-number-text1">16</div>
                        <div class="card4-right-number-text2">辆</div>
                      </div>

                      <div class="card4-right-bottom-svg-container">
                        <img
                          src="@/assets/svgs/car1.svg"
                          style="margin-top: 5px; width: 40px; height: 40px"
                          alt="car1"
                        />
                      </div>
                    </div>
                    <div class="card4-right-row-column-container">
                      <div class="card4-right-number-container">
                        <div class="card4-right-number-text1">22</div>
                        <div class="card4-right-number-text2">辆</div>
                      </div>

                      <div class="card4-right-bottom-svg-container">
                        <img
                          src="@/assets/svgs/car2.svg"
                          style="margin-top: 3px; width: 40px; height: 40px"
                          alt="car2"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="card4-right-row-container">
                    <div class="card4-right-row-column-container">
                      <div class="card4-right-number-container">
                        <div class="card4-right-number-text1">18</div>
                        <div class="card4-right-number-text2">辆</div>
                      </div>

                      <div class="card4-right-bottom-svg-container">
                        <img
                          src="@/assets/svgs/car3.svg"
                          style="margin-top: 0px; width: 55px; height: 55px"
                          alt="car3"
                        />
                      </div>
                    </div>
                    <div class="card4-right-row-column-container">
                      <div class="card4-right-number-container">
                        <div class="card4-right-number-text1">24</div>
                        <div class="card4-right-number-text2">辆</div>
                      </div>

                      <div class="card4-right-bottom-svg-container">
                        <img
                          src="@/assets/svgs/car4.svg"
                          style="margin-top: 0px; width: 50px; height: 50px"
                          alt="car4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card4-middle-container">
                <div class="card4-middle-left-container">
                  <div class="card4-middle-left-legend-container">
                    <div class="card4-legend-item">
                      <div
                        class="card4-legend-color"
                        style="background-color: #5470c6"
                      ></div>
                      <div class="card4-legend-title">任务完成</div>
                      <div class="card4-legend-number">36</div>
                      <div class="card4-legend-unit">辆</div>
                    </div>

                    <div class="card4-legend-item">
                      <div
                        class="card4-legend-color"
                        style="background-color: #91cc75"
                      ></div>
                      <div class="card4-legend-title">集结待命</div>
                      <div class="card4-legend-number">15</div>
                      <div class="card4-legend-unit">辆</div>
                    </div>

                    <div class="card4-legend-item">
                      <div
                        class="card4-legend-color"
                        style="background-color: #fac858"
                      ></div>
                      <div class="card4-legend-title">驻点保障</div>
                      <div class="card4-legend-number">24</div>
                      <div class="card4-legend-unit">辆</div>
                    </div>

                    <div class="card4-legend-item">
                      <div
                        class="card4-legend-color"
                        style="background-color: #ee6666"
                      ></div>
                      <div class="card4-legend-title">任务执行</div>
                      <div class="card4-legend-number">12</div>
                      <div class="card4-legend-unit">辆</div>
                    </div>
                  </div>
                </div>

                <div class="card4-middle-right-container">
                  <div class="card4-middle-right-chart-container">
                    <iframe
                      src="Sim/card2-chart.html"
                      class="chart-iframe"
                      frameborder="0"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div class="card4-bottom-container">
                <div class="card4-bottom-top-btn-container">
                  <button
                    class="card4-item-top-btn"
                    :class="{ active: activeButton === 'smart' }"
                    @click="handleButtonClick('smart')"
                  >
                    智能调度
                  </button>
                  <button
                    class="card4-item-top-btn"
                    :class="{ active: activeButton === 'manual' }"
                    @click="handleButtonClick('manual')"
                  >
                    人工调度
                  </button>
                </div>

                <div class="card4-bottom-mid-content-container">
                  <div class="card4-bottom-mid-item-title-container">
                    <img src="@/assets/pngs/arrow.png" alt="arrow" />
                    <span>调度条件</span>
                  </div>

                  <div class="card4-bottom-select-container">
                    <div class="card4-bottom-select-row-container">
                      <el-select
                        v-model="priorityValue"
                        clearable
                        placeholder="择优排序"
                        class="card4-bottom-select-item"
                      >
                        <el-option
                          v-for="item in priorityOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                      <el-select
                        v-model="managementUnit"
                        clearable
                        placeholder="管理单位"
                        class="card4-bottom-select-item"
                      >
                        <el-option
                          v-for="item in managementUnitOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                    <div class="card4-bottom-select-row-container">
                      <el-select
                        v-model="pumpCategory"
                        multiple
                        clearable
                        collapse-tags
                        :max-collapse-tags="1"
                        placeholder="泵车类别"
                        class="card4-bottom-select-item"
                        popper-class="custom-header"
                      >
                        <template #header>
                          <el-checkbox
                            v-model="pumpCategoryCheckAll"
                            :indeterminate="pumpCategoryIndeterminate"
                            @change="handlePumpCategoryCheckAll"
                          >
                            全选
                          </el-checkbox>
                        </template>
                        <el-option
                          v-for="item in pumpCategoryOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                      <el-select
                        v-model="pumpStatus"
                        multiple
                        clearable
                        collapse-tags
                        :max-collapse-tags="1"
                        placeholder="泵车状态"
                        class="card4-bottom-select-item"
                        popper-class="custom-header"
                      >
                        <template #header>
                          <el-checkbox
                            v-model="pumpStatusCheckAll"
                            :indeterminate="pumpStatusIndeterminate"
                            @change="handlePumpStatusCheckAll"
                          >
                            全选
                          </el-checkbox>
                        </template>
                        <el-option
                          v-for="item in pumpStatusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </div>

                  <div class="card4-bottom-bottom-btn-container">
                    <button
                      class="card4-bottom-bottom-btn"
                      :class="{ active: dispatchPlanActive }"
                      @click="handleDispatchPlan"
                      :disabled="
                        !priorityValue ||
                        !managementUnit ||
                        pumpCategory.length === 0 ||
                        pumpStatus.length === 0
                      "
                    >
                      <svg
                        t="1760586345338"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="99586"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M572.928 88.576h-112.64c-45.056 0-85.504 41.984-85.504 89.088 0 46.592 40.448 89.088 85.504 89.088h112.64c45.056 0 85.504-37.376 85.504-89.088 0-46.592-40.448-89.088-85.504-89.088z m0 327.68h-112.64c-45.056 0-85.504 41.984-85.504 89.088S415.232 593.92 460.288 593.92h112.64c45.056 0 85.504-41.984 85.504-89.088s-40.448-88.576-85.504-88.576z m0 317.952h-112.64c-45.056 0-85.504 41.984-85.504 89.088 0 46.592 40.448 89.088 85.504 89.088h112.64c45.056 0 85.504-41.984 85.504-89.088s-40.448-89.088-85.504-89.088z m211.968-603.136v-56.32l-90.112 98.304 90.112 93.696V196.608c65.536 2.56 117.248 57.856 117.248 125.952 0 70.144-54.272 126.464-121.856 126.464h-31.744c-17.92 0-31.744 13.824-31.744 32.768 0 18.432 13.312 32.768 31.744 32.768h31.744c103.936 0 184.832-83.968 184.832-191.488-0.512-105.984-83.456-189.44-180.224-192zM244.224 780.8c-65.536-2.56-117.248-57.856-117.248-125.952 0-70.144 54.272-126.464 121.856-126.464h31.744c17.92 0 31.744-13.824 31.744-32.768s-13.312-32.768-31.744-32.768h-31.744c-103.424 0-184.832 88.576-184.832 191.488 0 105.984 82.944 188.928 180.224 191.488v60.928L334.336 808.96l-90.112-93.696v65.536z"
                          p-id="99587"
                          fill="#ffffff"
                        ></path>
                      </svg>
                      调度方案
                    </button>
                    <button
                      class="card4-bottom-bottom-btn"
                      @click="handleDispatchExecution"
                      :disabled="!dispatchPlanActive"
                    >
                      调度执行
                      <svg
                        t="1760585811887"
                        class="icon dispatch-icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="95794"
                        width="25"
                        height="25"
                      >
                        <path
                          d="M724.3 553.9L583.2 681c-23.3 23.3-61.5 23.3-84.9 0V343c23.3-23.3 61.5-23.3 84.9 0l141.1 126.1c23.3 23.3 23.3 61.5 0 84.8z"
                          fill="#ffffff"
                          p-id="95795"
                        ></path>
                        <path
                          d="M508.3 553.9L367.2 681c-23.3 23.3-61.5 23.3-84.9 0V343c23.3-23.3 61.5-23.3 84.9 0l141.1 126.1c23.3 23.3 23.3 61.5 0 84.8z"
                          fill="#ffffff"
                          p-id="95796"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { CheckboxValueType } from "element-plus";

const emit = defineEmits<{
  (e: "create-poi"): void;
  (e: "delete-poi"): void;
  (e: "onSmartDispatchClicked"): void;
  (e: "onDispatchPlanClicked"): void;
  (e: "downDispatchPlanClicked"): void;
  (e: "onDispatchExecutionClicked"): void;
  (e: "onRoadIconClick"): void;
  (e: "onCloseRoadFloodAlert"): void;
  (e: "update:isSimCard4CloseButtonVisible", value: boolean): void;
}>();

const props = defineProps({
  isSimCard4CloseButtonVisible: {
    type: Boolean,
    default: false,
  },
});

// 按钮激活状态管理
const activeButton = ref<"smart" | "manual" | null>(null);
const dispatchPlanActive = ref(false);

// 积水告警关闭按钮显示控制
const isFloodAlertCloseButtonVisible = ref(false);

const handleButtonClick = (type: string) => {
  if (type === "smart") {
    // 如果智能调度已经激活，则取消激活
    if (activeButton.value === "smart") {
      activeButton.value = null;
      priorityValue.value = "";
      managementUnit.value = "";
      pumpCategory.value = [];
      pumpStatus.value = [];
    } else {
      // 激活智能调度
      activeButton.value = "smart";
      priorityValue.value = "priority1";
      managementUnit.value = "unit1";
      pumpCategory.value = ["pumpcateg1", "pumpcateg2"];
      pumpStatus.value = ["pumpstat1", "pumpstat2", "pumpstat3", "pumpstat4"];
      emit("onSmartDispatchClicked");
    }
  } else if (type === "manual") {
    // 如果手动调度已经激活，则取消激活
    if (activeButton.value === "manual") {
      activeButton.value = null;
      priorityValue.value = "";
      managementUnit.value = "";
      pumpCategory.value = [];
      pumpStatus.value = [];
    } else {
      // 激活手动调度
      activeButton.value = "manual";
      priorityValue.value = "";
      managementUnit.value = "";
      pumpCategory.value = [];
      pumpStatus.value = [];
    }
  }
};

// 择优排序选项数据
const priorityOptions = ref([
  {
    value: "priority1",
    label: "最近距离",
  },
  {
    value: "priority2",
    label: "最合适距离",
  },
]);

// 管理单位选项
const managementUnitOptions = ref([
  {
    value: "unit1",
    label: "51服务队",
  },
  {
    value: "unit2",
    label: "新区服务队",
  },
]);

// 泵车类别选项
const pumpCategoryOptions = ref([
  {
    value: "pumpcateg1",
    label: "移动式",
  },
  {
    value: "pumpcateg2",
    label: "固定式",
  },
]);

// 泵车状态选项
const pumpStatusOptions = ref([
  {
    value: "pumpstat1",
    label: "任务完成",
  },
  {
    value: "pumpstat2",
    label: "集结待命",
  },
  {
    value: "pumpstat3",
    label: "驻点保障",
  },
  {
    value: "pumpstat4",
    label: "任务执行",
  },
]);

// select绑定值
const priorityValue = ref("");
const managementUnit = ref("");
const pumpCategory = ref<CheckboxValueType[]>([]);
const pumpStatus = ref<CheckboxValueType[]>([]);

// 泵车类别全选相关
const pumpCategoryCheckAll = ref(false);
const pumpCategoryIndeterminate = ref(false);

// 泵车状态全选相关
const pumpStatusCheckAll = ref(false);
const pumpStatusIndeterminate = ref(false);

function onFloodPumpCarClick() {
  emit("update:isSimCard4CloseButtonVisible", true);
  emit("create-poi");
}

function onCloseCard4() {
  emit("update:isSimCard4CloseButtonVisible", false);
  emit("delete-poi");
}

function handleRoadIconClick() {
  isFloodAlertCloseButtonVisible.value = true;
  emit("onRoadIconClick");
}

function onCloseRoadFloodAlert() {
  isFloodAlertCloseButtonVisible.value = false;
  emit("onCloseRoadFloodAlert");
}

// 监听泵车类别选择变化
watch(pumpCategory, (val) => {
  if (val.length === 0) {
    pumpCategoryCheckAll.value = false;
    pumpCategoryIndeterminate.value = false;
  } else if (val.length === pumpCategoryOptions.value.length) {
    pumpCategoryCheckAll.value = true;
    pumpCategoryIndeterminate.value = false;
  } else {
    pumpCategoryIndeterminate.value = true;
  }
});

// 监听泵车状态选择变化
watch(pumpStatus, (val) => {
  if (val.length === 0) {
    pumpStatusCheckAll.value = false;
    pumpStatusIndeterminate.value = false;
  } else if (val.length === pumpStatusOptions.value.length) {
    pumpStatusCheckAll.value = true;
    pumpStatusIndeterminate.value = false;
  } else {
    pumpStatusIndeterminate.value = true;
  }
});

// 泵车类别全选处理
const handlePumpCategoryCheckAll = (val: CheckboxValueType) => {
  pumpCategoryIndeterminate.value = false;
  if (val) {
    pumpCategory.value = pumpCategoryOptions.value.map((_) => _.value);
  } else {
    pumpCategory.value = [];
  }
};

// 泵车状态全选处理
const handlePumpStatusCheckAll = (val: CheckboxValueType) => {
  pumpStatusIndeterminate.value = false;
  if (val) {
    pumpStatus.value = pumpStatusOptions.value.map((_) => _.value);
  } else {
    pumpStatus.value = [];
  }
};

// 调度方案按钮点击处理
const handleDispatchPlan = () => {
  // 切换激活状态
  dispatchPlanActive.value = !dispatchPlanActive.value;

  if (dispatchPlanActive.value) {
    // 激活状态
    emit("onDispatchPlanClicked");
  } else {
    // 取消激活状态
    emit("downDispatchPlanClicked");
    console.log("调度方案取消激活");
  }
};

// 调度执行按钮点击处理
const handleDispatchExecution = () => {
  emit("onDispatchExecutionClicked");
};
</script>

<style scoped>
/* 如果需要覆盖或添加特定样式，可以在下面添加 */
.drainage-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: cover;
}

.top-image {
  width: 100%;
  height: 7vh;
  display: block;
}

.header {
  position: relative;
  text-align: center;
  height: 7vh;
}

.header-text {
  position: absolute;
  top: 37%;
  left: 50.3%;
  transform: translate(-50%, -50%);
  font-size: 39px;
  color: white;
  text-align: center;
  z-index: 10;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  font-family: "YSBTHeiTi", sans-serif;
  white-space: nowrap;
  letter-spacing: 5px;
}

.sidebar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 90vh;
  box-sizing: border-box;
}

/* 左侧边栏 */
.sidebar-left {
  width: 18.5vw;
  height: 90vh;
  padding: 12px;
  display: flex;
  flex-direction: column;
  transform: translateY(-1vh);
}
/* 包裹卡片的容器 */
.cards-left-wrapper {
  height: 92vh;
  display: flex;
  flex-direction: column;
}

/* 卡片 */
.card {
  width: 100%;
  flex: 1;
  /* 平分高度 */
  display: flex;
  flex-direction: column;
  border-radius: 11px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 12px;
  /* 半透明整体效果 */
  /* 毛玻璃效果，可选 */
  user-select: none;
  pointer-events: auto;
}

.card:last-child {
  margin-bottom: 0;
}

/* 标题栏（半透明深色） */
.card-header {
  background: linear-gradient(
    to right,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  /* 渐变背景 */
  color: #fff;
  font-weight: 600;
  padding: 10px;
  text-align: left;
  font-family: "SimHei", Arial, sans-serif;
  text-shadow: 0 0 6px #00bfff;
  /* 海蓝色光效 */
  border: none;
  backdrop-filter: blur(1px);
  position: relative;
  user-select: none;
}

/* 标题栏左右布局 */
.card-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-header-right {
  display: flex;
  align-items: center;
}

/* 卡片关闭按钮样式 */
.card-close-button {
  background: linear-gradient(
    to right,
    rgba(169, 49, 49, 0.7) 0%,
    rgba(113, 79, 79, 0.7) 33%,
    rgba(245, 45, 45, 0.7) 66%,
    rgba(104, 39, 39, 0.7) 100%
  );
  background-size: 200% 100%;
  background-position: 0% 0%;
  color: #ffd9dc;
  font-weight: 600;
  font-family: "SimHei", Arial, sans-serif;
  text-shadow: 0 0 6px #ff4d4d;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  backdrop-filter: blur(1px);
  font-size: 15px;
  transition: all 0.3s ease;
  margin-left: auto;
}

.card-close-button:hover {
  background-position: -100% 0%;
  transform: scale(1.01);
}

/* card2标题栏左右排列 */
.card2-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 等雨量图按钮样式 */
.isoline-button {
  background: linear-gradient(
    to right,
    rgba(49, 141, 169, 0.7) 0%,
    rgba(79, 99, 113, 0.7) 33%,
    rgba(45, 198, 245, 0.7) 66%,
    rgba(39, 77, 104, 0.7) 100%
  );
  background-size: 200% 100%;
  background-position: 0% 0%;
  color: #dcd9ff;
  font-weight: 600;
  font-family: "SimHei", Arial, sans-serif;
  text-shadow: 0 0 6px #00bfff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  backdrop-filter: blur(1px);
  font-size: 14px;
  transition: all 0.3s ease;
}

.isoline-button:hover {
  background-position: 90% 0%;
  transform: scale(1.02);
}

.card2-title-button {
  background: linear-gradient(
    to right,
    rgba(49, 141, 169, 0.7) 0%,
    rgba(79, 99, 113, 0.7) 33%,
    rgba(45, 198, 245, 0.7) 66%,
    rgba(39, 77, 104, 0.7) 100%
  );
  background-size: 200% 100%;
  background-position: 0% 0%;
  color: #dcd9ff;
  font-weight: 600;
  font-family: "SimHei", Arial, sans-serif;
  text-shadow: 0 0 6px #00bfff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  backdrop-filter: blur(1px);
  font-size: 15px;
  transition: all 0.3s ease;
}
.card2-title-button:hover {
  background-position: -100% 0%;
  transform: scale(1.01);
}

.card-header-icon {
  margin-right: 3px;
  margin-left: 3px;
  filter: drop-shadow(0 0 6px #00bfff);
}

.card1-content {
  display: flex;
  justify-content: space-between;
}

/* 内容栏（浅色半透明） */
.card1-content,
.card2-content,
.card3-content,
.card4-content {
  flex: 1;
  padding: 12px;
  font-size: 14px;
  color: #000;
  background-color: rgba(79, 99, 113, 0.7);
  backdrop-filter: blur(3px);
  display: flex;
  flex-direction: column;
}

.card4-left-container {
  flex: 1;
  background-color: rgba(91, 140, 173, 0.7);
  border-radius: 4px;
  height: 18vh;
  margin: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: #b5bbda 0 0 3px;
}

.card4-left-container:hover {
  background-color: rgba(128, 136, 211, 0.6);
  transform: scale(1.02);
  transition: all 0.3s ease;
}

.card4-left-label-container {
  position: relative;
  display: inline-block;
  margin-top: 10px;
  margin-left: 20px;
}

.card4-left-title-text1 {
  position: relative;
  font-size: 16px;
  font-family: SimHei;
  font-weight: bold;
  color: #ffffff;
  z-index: 2;
}

.card4-left-title-text-background {
  position: absolute;
  top: 90%;
  right: 10%;
  transform: translateY(-50%);
  /* 垂直居中 */
  background: linear-gradient(
    to right,
    rgba(62, 202, 185, 0.9),
    rgba(55, 93, 96, 0.3)
  );
  width: 100%;
  height: 10px;
  z-index: 1;
}

.card4-left-number-container {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 12px;
  justify-content: center;
}

.card4-left-number-text1 {
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: #9ba9f7 0 0 8px;
}

.card4-left-number-text2 {
  font-size: 16px;
  font-weight: bold;
  color: #d3c9c9;
  text-shadow: #6177f3 0 0 8px;
}

.card4-right-container {
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 18vh;
  border-radius: 8px;
  gap: 5px;
}

.card4-right-row-container {
  flex: 1;
  display: flex;
  width: 100%;
  gap: 5px;
}

.card4-right-row-column-container {
  flex: 1;
  background-color: rgba(95, 139, 168, 0.6);
  box-shadow: #b5bbda 0 0 3px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.card4-right-row-column-container:hover {
  background-color: rgba(128, 136, 211, 0.8);
  transform: scale(1.02);
  transition: all 0.3s ease;
}

.card4-right-number-container {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 6px;
  justify-content: center;
}

.card4-right-number-text1 {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: #9ba9f7 0 0 8px;
}

.card4-right-number-text2 {
  font-size: 12px;
  font-weight: bold;
  color: #d3c9c9;
  text-shadow: #6177f3 0 0 8px;
}

.card-3 {
  height: 22.2vh;
  /* 第三个卡片的高度 */
  flex: none;
}

.card3-content {
  display: flex;
  flex-direction: column;
}

/* card3-row2-content 内部的 left, middle, right 容器等间距排列 */
.card3-row2-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

/* card3-left-content, card3-middle-content, card3-right-content 等间距排列 */
.card3-left-content,
.card3-middle-content,
.card3-right-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

/* card3-svg-container 添加圆形背景颜色，内部svg上下左右居中排列 */
.card3-svg-container,
.card3-svg-container1 {
  background-color: #7dbcdf;
  /* 圆形背景颜色 */
  border-radius: 50%;
  /* 圆形 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}

.card3-svg-container:hover {
  background-color: #c4ecb2;
  transform: scale(1.1);
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(26, 218, 106, 0.5);
}

.card3-left-content .card3-svg-container {
  cursor: pointer;
}

.card3-left-content:active .card3-svg-container {
  background-color: #5a9bbf;
  transform: scale(0.95);
  transition: all 0.1s ease;
}

/* card3-label-container 上下排列 */
.card3-label-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* card3-label-container-top 和 card3-label-container-bottom 上下排列 */
.card3-label-container-top,
.card3-label-container-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* container-bottom 中 label number 和 label unit 左右排列 */
.card3-label-container-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.card3-label-number,
.card3-label-unit {
  font-size: 14px;
  font-weight: 600;
  color: #faf4f4;
  text-shadow: #000 0 0 5px;
}

.card3-label-title {
  font-size: 19px;
  font-family: "YSBTHeiTi", Arial, sans-serif;
  color: #ffffff;
  text-shadow: #9257f0 0 0 5px;
}

.card-4 {
  height: 15vh;
}

.card-6 {
  height: 72.5vh;
  /* 第三个卡片的高度 */
  flex: none;
}

.card4-top-content {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
  margin-top: 5px;
  margin-left: 5px;
}

.card4-top-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.card4-top-svg-container {
  background-color: #7dbcdf;
  /* 圆形背景颜色 */
  border-radius: 50%;
  /* 圆形 */
  padding: 0px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  z-index: 999;
}

.card4-top-svg-container svg {
  width: 25px;
  height: 25px;
}

.card4-top-text-background {
  flex: 1;
  background: linear-gradient(
    to right,
    rgba(62, 202, 185, 0.9),
    rgba(55, 93, 96, 0.3)
  );
  /* 渐变背景 */
  border-radius: 8px;
  padding: 6px 15px;
  display: flex;
  justify-content: space-between;
  /* 左右两端对齐 */
  align-items: center;
  margin-left: -40px;
  padding-left: 33px;
  width: calc(100% + 30px);
  height: 20px;
}

.card4-top-text1 {
  font-size: 18px;
  font-family: "YSBTHeiTi", sans-serif;
  color: #ffffff;
  text-shadow: #9257f0 0 0 5px;
}

.card4-top-text2 {
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: #566fff 0 0 8px;
  margin-left: 90px;
}

.card4-top-text3 {
  font-size: 15px;
  font-weight: bold;
  color: #7eb2ee;
  text-shadow: #566fff 0 0 8px;
  margin-left: 5px;
}

.card4-item-title-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 12px;
}

.card4-item-title-container img {
  width: 20px;
  height: auto;
}

.card4-item-title-container span {
  font-size: 18px;
  font-family: "YSBTHeiTi", sans-serif;
  color: #ffffff;
}

@font-face {
  font-family: "YSBTHeiTi";
  src: url("@/assets/fonts/YouSheBiaoTiHei-2.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "SHJGSK";
  src: url("@/assets/fonts/ShanHaiJiGuSongKe-JianFan-2.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "YRDZST";
  src: url("@/assets/fonts/杨任东竹石体.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.card4-item-text-background {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: linear-gradient(
    to right,
    rgba(200, 196, 250, 0.3),
    rgba(175, 166, 223, 0.4)
  );
  border-radius: 6px;
  position: relative;
  /* 为左侧矩形定位 */
  gap: 5px;
}

.card4-item-text-background::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0%;
  bottom: 0%;
  width: 6px;
  background-color: #00ffff;
}

.card4-item-content-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 12px;
  margin-right: 12px;
}

.card4-item-content-text1 {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
}

.card4-item-content-text2 {
  font-size: 19px;
  font-weight: bold;
  color: #fff;
  margin-left: 8px;
}

.card4-item-content-text3 {
  font-size: 14px;
  margin-left: 4px;
  color: #fff;
}

@font-face {
  font-family: "number-font";
  src: url("@/assets/fonts/number.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.card4-left-bottom-svg-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.card4-left-bottom-svg-container img {
  margin-top: 10px;
  width: 66px;
  height: 66px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
}

.card4-right-bottom-svg-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  pointer-events: none;
}

.card4-middle-container {
  margin: 5px 0;
  background-color: rgba(79, 99, 113, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 15vh;
}

/* 新增样式：确保left和right容器在同一行 */
.card4-middle-left-container {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card4-middle-right-chart-container {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
.card4-middle-right-chart-container .chart-iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}

/* 新增样式：控制legend-container内的legend-item垂直排列，legend-item内部元素水平排列 */
.card4-middle-left-legend-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 3px;
  gap: 6px;
  flex: 1;
  margin-left: 10px;
}

.card4-legend-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background-color: rgba(79, 99, 113, 0.5);
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.card4-legend-item:hover {
  background-color: rgba(128, 136, 211, 0.6);
  transform: scale(1.02);
  transition: all 0.3s ease;
}

.card4-legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.card4-legend-title {
  flex: 1;
  font-size: 16px;
  font-family: "YSBTHeiTi", Arial, sans-serif;
  color: #ffffff;
  white-space: nowrap;
}

.card4-legend-number {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 5px #8465d8;
}

.card4-legend-unit {
  font-size: 12px;
  color: #d3c9c9;
}

.card4-bottom-container {
  flex: 1;
  background-color: rgba(79, 99, 113, 0.3);
  border-radius: 4px;
}

.card4-bottom-mid-item-title-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
}

.card4-bottom-mid-item-title-container img {
  width: 20px;
  height: auto;
}

.card4-bottom-mid-item-title-container span {
  font-size: 18px;
  font-family: "YSBTHeiTi", sans-serif;
  color: #ffffff;
}

/* 调度条件选择器样式 */
.card4-bottom-select-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 20px;
}

.card4-bottom-select-row-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

/* 为el-select元素添加样式支持 */
.card4-bottom-select-item {
  --el-select-border-color: #1ebdd0;
  --el-select-hover-border-color: #40c4d6;
  --el-select-focus-border-color: #00ffff;
}

.card4-bottom-select-item :deep(.el-select__wrapper) {
  background-color: rgba(91, 140, 173, 0.6) !important;
  border: 1px solid #1ebdd0 !important;
  border-radius: 6px !important;
  box-shadow: #b5bbda 0 0 3px !important;
  backdrop-filter: blur(3px);
  height: 40px;
  transition: all 0.3s ease;
}

.card4-bottom-select-item :deep(.el-select__wrapper:hover) {
  background-color: rgba(128, 136, 211, 0.8) !important;
}

.card4-bottom-select-item
  :deep(.el-select__wrapper:not(:has(.el-select__placeholder.is-transparent))) {
  background-color: rgba(30, 189, 208, 0.4) !important;
  border-color: #00ffff !important;
  box-shadow: 0 0 8px rgba(30, 189, 208, 0.6) !important;
}

.card4-bottom-select-item :deep(.el-select__selected-item) {
  color: #ffffff !important;
  font-family: "YRDZST", sans-serif !important;
  font-size: 13px !important;
  font-weight: 600;
}

.card4-bottom-select-item :deep(.el-select__placeholder.is-transparent) {
  color: #a8abb2 !important;
}

.card4-bottom-top-btn-container {
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
}

.card4-bottom-bottom-btn-container {
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  gap: 15px;
}

.card4-bottom-bottom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.card4-item-top-btn {
  background-color: rgba(79, 99, 113, 0.7);
  color: white;
  border: 1px solid #1ebdd0;
  border-radius: 4px;
  padding: 3px 6px;
  font-size: 19px;
  font-family: "YSBTHeiTi", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(3px);
  width: 120px;
  height: 35px;
}

.card4-bottom-bottom-btn {
  background-color: rgba(79, 99, 113, 0.7);
  color: rgb(255, 255, 255);
  border: 1px solid #1ebdd0;
  border-radius: 4px;
  padding: 4px 16px;
  font-size: 17px;
  font-family: "YRDZST", sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(3px);
  flex: 1;
  margin: 0 5px;
}

.card4-bottom-bottom-btn:hover {
  background-color: rgba(54, 147, 201, 0.7);
  box-shadow: 0 0 8px rgba(30, 189, 208, 0.8);
  color: white;
}

.card4-bottom-bottom-btn:focus {
  outline: none;
}

.card4-bottom-bottom-btn:active {
  background-color: rgba(116, 219, 56, 0.9);
  box-shadow: 0 0 12px rgba(25, 150, 170, 1);
}

.card4-bottom-bottom-btn:disabled {
  background-color: rgba(79, 99, 113, 0.3);
  border-color: #5f7a8a;
  color: #aaa;
  cursor: not-allowed;
  box-shadow: none;
}

.card4-item-top-btn:hover {
  background-color: rgba(30, 189, 208, 0.7);
  box-shadow: 0 0 8px rgba(30, 189, 208, 0.8);
}

.card4-item-top-btn:focus {
  outline: none;
}

.card4-item-top-btn:active {
  background-color: rgba(25, 150, 170, 0.9);
  box-shadow: 0 0 12px rgba(25, 150, 170, 1);
}

/* 激活状态样式 */
.card4-item-top-btn.active {
  background-color: rgba(34, 181, 197, 0.9);
  box-shadow: 0 0 12px rgba(30, 189, 208, 1);
  transform: translateY(1px);
  border-color: #00ffff;
}

/* 调度方案按钮激活状态样式 */
.card4-bottom-bottom-btn.active {
  background-color: rgba(34, 181, 197, 0.9);
  box-shadow: 0 0 12px rgba(30, 189, 208, 1);
  transform: translateY(1px);
  border-color: #00ffff;
  color: white;
}

.top-menu-container {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 800px;
  z-index: 100;
}

.top-menu-icon-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-radius: 10px 10px 0 0;
}

.top-menu-icon-item-container {
  position: relative;
  display: flex;
  align-items: center;
}

.top-menu-icon-item {
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at 30% 30%, #053242, #00d4ff);

  border: 2px solid rgba(248, 248, 248, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.5s ease;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.top-menu-icon-item:hover {
  background: radial-gradient(
    circle at 0% 60%,
    #1a918b 0%,
    #0099c8 60%,
    #00e5ff 100%
  );
  border: 2px solid rgba(248, 248, 248, 0.6);
  box-shadow: inset 3px 3px 8px rgba(255, 255, 255, 0.4),
    inset -4px -4px 10px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 255, 255, 0.4);
  transform: scale(1.15);
  animation: pulseGlow 1s ease-in-out infinite alternate;
}

@keyframes pulseGlow {
  from {
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
  to {
    box-shadow: 0 0 25px rgba(0, 255, 255, 1);
  }
}

.top-menu-scalebar-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 10px;
  border-radius: 0 0 10px 10px;
}

.scalebar-item {
  width: 4px;
  background-color: rgba(7, 74, 97, 0.7);
  border-radius: 2px;
}

.scalebar-item.short {
  height: 10px;
}

.scalebar-item.tall {
  height: 20px;
  background-color: rgba(7, 74, 97, 0.7);
}

.top-menu-icon-label {
  height: 40px;
  border-radius: 0 20px 20px 0;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(5, 50, 66, 0.5),
    rgba(0, 212, 255, 0.5)
  );
  border: 1px solid rgba(248, 248, 248, 0.8);
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  color: #ffffff;
  font-size: 18px;
  font-family: "SHJGSK";
  font-weight: bold;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  left: 90%;
  top: 50%;
  transform: translateY(-50%);
}

.top-menu-icon-item:hover + .top-menu-icon-label {
  opacity: 1;
}

.card2-close-button {
  background: linear-gradient(
    to right,
    rgba(169, 49, 49, 0.7) 0%,
    rgba(113, 79, 79, 0.7) 33%,
    rgba(245, 45, 45, 0.7) 66%,
    rgba(104, 39, 39, 0.7) 100%
  );
  background-size: 200% 100%;
  background-position: 0% 0%;
  color: #ffd9dc;
  font-weight: 600;
  font-family: "SimHei", Arial, sans-serif;
  text-shadow: 0 0 6px #ff4d4d;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  backdrop-filter: blur(1px);
  font-size: 15px;
  transition: all 0.3s ease;
  margin-left: auto;
}

.card2-close-button:hover {
  background-position: -100% 0%;
  transform: scale(1.01);
}

.card-4 .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card2-header-left {
  flex: 1;
  text-align: left;
}

.card2-header-right {
  flex-shrink: 0;
  text-align: right;
}
</style>