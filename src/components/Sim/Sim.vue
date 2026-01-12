<template>
  <div class="drainage-container">
    <div class="sidebar-background">
      <div class="sidebar-background-right">
        <img class="sidebar-background-right-img" src="@/assets/pngs/BG/sidebar/R.png" />
      </div>
    </div>
    <div class="sidebar">
      <div class="sidebar-left">
      </div>
      <div class="sidebar-right">
        <div class="sidebar-right-card card1">
          <BaseCard title="积水告警" titleType="right" :contentBg="contentLbg1" width="344px" height="130px"
            contentClass="Rcard1-content-row">
            <!-- <div class="Rcard1-content-row row1">
              <div class="Rcard1-row1-icon">
                <img class="Rcard1-row1-icon-img" src="@/assets/pngs/BG/sidebar/Sim/card1/tatal-point.png" />
              </div>
              <div class="Rcard1-row1-text-container">
                <div class="Rcard1-row1-text-title">积水点总数</div>
                <div class="Rcard1-row1-text-number-wrapper">
                  <div class="Rcard1-row1-text-number">60</div>
                  <div class="Rcard1-row1-text-unit">个</div>
                </div>
              </div>
            </div> -->
            <div class="Rcard1-content-row row2">
              <div class="Rcard1-column-container">
                <div class="Rcard1-icon">
                  <img src="@/assets/pngs/BG/sidebar/Sim/card1/road.png" />
                  <NumberUnit value="6" unit="条" />
                  道路
                </div>

              </div>

              <div class="Rcard1-column-container">
                <div class="Rcard1-icon">
                  <img src="@/assets/pngs/BG/sidebar/Sim/card1/house-area.png" />
                  <NumberUnit value="7" unit="个" />
                  小区
                </div>
              </div>

              <div class="Rcard1-column-container">
                <div class="Rcard1-icon">
                  <img src="@/assets/pngs/BG/sidebar/Sim/card1/underpass.png" />
                  <NumberUnit value="5" unit="个" />
                  下立交
                </div>
              </div>
            </div>
          </BaseCard>

        </div>

        <div class="sidebar-right-card card2">
          <BaseCard title="防汛泵车" titleType="right" :contentBg="contentRbg2" width="344px" height="620px"
            contentClass="Rcard2-content-row">
            <div class="Rcard2-content-item1">
              <div class="Rcard1-content-row row1">
                <div class="Rcard1-row1-icon">
                  <img class="Rcard1-row1-icon-img" src="@/assets/pngs/BG/sidebar/Sim/card1/tatal-point.png" />
                </div>
                <div class="Rcard1-row1-text-container">
                  <div class="Rcard1-row1-text-title">泵车总数量</div>
                  <div class="Rcard1-row1-text-number-wrapper">
                    <div class="Rcard1-row1-text-number">80</div>
                    <div class="Rcard1-row1-text-unit">辆</div>
                  </div>
                </div>
              </div>

              <div class="Rcard2-content-row row2">
                <div class="Rcard2-column-container">
                  <div class="Rcard2-icon">
                    <img src="@/assets/pngs/BG/sidebar/Sim/card2/repair.png" />
                  </div>
                  <div class="column-text-wrapper">
                    <NumberUnit value="16" unit="辆" />
                    <div class="column-text-title">修理泵车</div>
                  </div>
                </div>

                <div class="Rcard2-column-container">
                  <div class="Rcard2-icon">
                    <img src="@/assets/pngs/BG/sidebar/Sim/card2/emergy.png" />
                  </div>
                  <div class="column-text-wrapper">
                    <NumberUnit value="16" unit="辆" />
                    <div class="column-text-title">应急泵车</div>
                  </div>
                </div>
                <div class="Rcard2-column-container">
                  <div class="Rcard2-icon">
                    <img src="@/assets/pngs/BG/sidebar/Sim/card2/safe.png" />
                  </div>
                  <div class="column-text-wrapper">
                    <NumberUnit value="16" unit="辆" />
                    <div class="column-text-title">安全泵车</div>
                  </div>
                </div>
                <div class="Rcard2-column-container">
                  <div class="Rcard2-icon">
                    <img src="@/assets/pngs/BG/sidebar/Sim/card2/transport.png" />
                  </div>
                  <div class="column-text-wrapper">
                    <NumberUnit value="16" unit="辆" />
                    <div class="column-text-title">运输泵车</div>
                  </div>
                </div>
              </div>

            </div>
            <div class="Rcard2-content-item2">
              <div class="Rcard2-chart-container">
                <PumpCarChart />
              </div>
              <div class="Rcard2-chart-legend">
                <div class="chart-legend-item">
                  <div class="legend-item-name">
                    <div class="color-circle circle1"></div>
                    <div class="legend-text">
                      任务完成
                    </div>
                  </div>
                  <div class="legend-item-count">
                    <NumberUnit value="84" unit="辆" numberSize="18px" unitSize="11px" />
                  </div>
                </div>
                <div class="chart-legend-item">
                  <div class="legend-item-name">
                    <div class="color-circle circle2"></div>
                    <div class="legend-text">
                      驻点保障
                    </div>
                  </div>
                  <div class="legend-item-count">
                    <NumberUnit value="73" unit="辆" numberSize="18px" unitSize="11px" />
                  </div>
                </div>
                <div class="chart-legend-item">
                  <div class="legend-item-name">
                    <div class="color-circle circle3"></div>
                    <div class="legend-text">
                      集结待命
                    </div>
                  </div>
                  <div class="legend-item-count">
                    <NumberUnit value="28" unit="辆" numberSize="18px" unitSize="11px" />
                  </div>
                </div>
                <div class="chart-legend-item">
                  <div class="legend-item-name">
                    <div class="color-circle circle4"></div>
                    <div class="legend-text">
                      任务执行
                    </div>
                  </div>
                  <div class="legend-item-count">
                    <NumberUnit value="18" unit="辆" numberSize="18px" unitSize="11px" />
                  </div>
                </div>

              </div>
            </div>
            <div class="Rcard2-content-item3">
              <div class="Rcard2-row-button-container">
                <div class="Rcard2-content-item3-button1">
                  智能调度
                </div>
                <div class="Rcard2-content-item3-button2">
                  人工调度
                </div>
              </div>

              <div class="dispatch-container">
                <div class="dispatch-title">调度条件</div>
                <div class="dispatch-options-container">
                  <div class="dispatch-options-row">
                    <div class="dispatch-option-item">
                      <div class="dispatch-option-item-icon">
                        <img src="@/assets/pngs/BG/sidebar/Sim/card2/dispatch/sort.png" />
                      </div>
                      <BaseSelect v-model="sortValue" :options="sortOptions" placeholder="排序方法" />
                    </div>
                    <div class="dispatch-option-item">
                      <div class="dispatch-option-item-icon">
                        <img src="@/assets/pngs/BG/sidebar/Sim/card2/dispatch/manage.png" />
                      </div>
                      <BaseSelect v-model="manageValue" :options="manageOptions" placeholder="管理单位" />
                    </div>
                  </div>

                  <div class="dispatch-options-row">
                    <div class="dispatch-option-item">
                      <div class="dispatch-option-item-icon">
                        <img src="@/assets/pngs/BG/sidebar/Sim/card2/dispatch/type.png" />
                      </div>
                      <BaseSelect v-model="typeValue" :options="typeOptions" placeholder="泵车类别" />
                    </div>
                    <div class="dispatch-option-item">
                      <div class="dispatch-option-item-icon">
                        <img src="@/assets/pngs/BG/sidebar/Sim/card2/dispatch/status.png" />
                      </div>
                      <BaseSelect v-model="statusValue" :options="statusOptions" placeholder="泵车状态"
                        collapse-tags-tooltip />
                    </div>
                  </div>
                </div>
                <div class="Rcard2-column-button-container">
                  <div class="Rcard2-content-item3-button3">
                    调度方案
                  </div>
                  <div class="Rcard2-content-item3-button4">
                    调度执行
                  </div>
                </div>
              </div>
            </div>

          </BaseCard>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import contentLbg1 from "@/assets/pngs/BG/sidebar/card/background/L_Content1.png";
import contentRbg2 from "@/assets/pngs/BG/sidebar/card/background/R_Content2.png";

import NumberUnit from "@/components/ReuseCop/NumberUnit.vue";
import BaseCard from "@/components/ReuseCop/BaseCard.vue";
import BaseSelect from "@/components/ReuseCop/BaseSelect.vue";

const sortValue = ref<string | number | null>(null)
const manageValue = ref<string | number | null>(null)
const typeValue = ref<string | number | null>(null)
const statusValue = ref<string | number | null>(null)

const sortOptions = [
  { label: "最近距离", value: "A" },
  { label: "最合适距离", value: "B" },
]

const manageOptions = [
  { label: "51服务队", value: "A" },
  { label: "新区服务队", value: "B" },
]

const typeOptions = [
  { label: "移动式", value: "A" },
  { label: "固定式", value: "B" },
]

const statusOptions = [
  { label: "任务完成", value: "A" },
  { label: "驻点保障", value: "B" },
  { label: "集结待命", value: "C" },
  { label: "任务执行", value: "D" },
]

const PumpCarChart = defineAsyncComponent(
  () => import("@/components/Sim/Chart/car-task.vue")
);

</script>


<style scoped>
.sidebar-background {
  position: relative;
  width: 100%;
  height: 100vh;
}

.sidebar-background-right {
  position: absolute;
  right: 0;
  top: -10%;
  height: 100vh;
  z-index: -1;
}

.sidebar-background-right-img {
  width: 30px;
  height: 100%;
  object-fit: contain;
}

.sidebar {
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  padding: 0 0.16%;
  box-sizing: border-box;
  user-select: none;
}

.sidebar-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: auto;
}

.sidebar-right-card {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sidebar-right-card-title {
  align-self: flex-end;
  width: 220px;
  height: 40px;
  background: url("@/assets/pngs/BG/sidebar/card/background/R_Title.png") no-repeat center / contain;
}

.card-title-text {
  color: #fff;
  margin-left: 38px;
  font-size: 22px;
  font-family: "YouSheBiaoTiHei", sans-serif;
  pointer-events: none;
  display: flex;
  align-items: center;
}

.sidebar-right-card-content.card1-content {
  background: url("@/assets/pngs/BG/sidebar/card/background/R_Content1.png") no-repeat center / contain;
  width: 344px;
  height: 124px;
}

:deep(.Rcard2-content-row) {
  display: flex;
  flex-direction: column;
  padding: 0px;
}

.card-content-row-three-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.card1-row2-text-title {
  color: #fff;
  font-size: 13px;
  font-family: "AlimamaAgileVF", sans-serif;
  display: flex;
  justify-content: center;
  margin-right: 7px;
}

.card1-title-text-wrapper {
  display: flex;
  margin-top: 5px;
  margin-right: 3px;
  align-items: baseline;
  justify-content: center;
}

.card1-title-text-data {
  font-size: 13px;
  font-family: "YouSheBiaoTiHei", sans-serif;
  color: #fff;
  opacity: 0.6;
}

.Rcard1-content-row,
.Rcard2-content-row {
  display: flex;
}

.Rcard2-content-row.row2 {
  margin-top: -3px;
}

.Rcard1-content-row.row2 {
  justify-content: center;
  margin-top: -2px;
  gap: 55px;
}

.Rcard1-row1-text-container {
  background: url("@/assets/pngs/BG/sidebar/card/card4-svg/row1-back.png") no-repeat center/ contain;
  width: 256px;
  height: 32px;
  margin-top: 12px;
  color: #fff;
}

.Rcard1-row1-text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 45px;
}

.Rcard1-row1-text-title {
  font-size: 13px;
  font-family: "AlimamaAgileVF", sans-serif;
}

.Rcard1-row1-text-number-wrapper {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.Rcard1-row1-text-number {
  font-size: 20px;
  font-family: "AlimamaShuHeiTi", sans-serif;
  background: linear-gradient(180deg, #ffffff 0%, #fcb169 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.Rcard1-row1-text-unit {
  font-size: 13px;
  font-family: "AlimamaAgileVF", sans-serif;
  background: linear-gradient(180deg, #ffffff 0%, #fcb169 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.Rcard2-content-item1 {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 5px;
  justify-content: center;
}

.Rcard2-content-item3-button1,
.Rcard2-content-item3-button2 {
  font-size: 13px;
  font-weight: 500;
  font-family: "AlimamaAgileVF", sans-serif;
  color: #fff;
  background: url("@/assets/pngs/BG/sidebar/card/card6-svg/button.png") no-repeat center/ contain;
  width: 142px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}

.Rcard2-content-item3-button3,
.Rcard2-content-item3-button4 {
  font-size: 16px;
  font-family: "YouSheBiaoTiHei", sans-serif;
  color: #fff;
  background: url("@/assets/pngs/BG/sidebar/Sim/button/background.png") no-repeat center/ contain;
  width: 288px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}

.Rcard2-content-item3-button1:hover,
.Rcard2-content-item3-button2:hover {
  background: url("@/assets/pngs/BG/sidebar/card/card6-svg/hover.png") no-repeat center/ contain;
  cursor: pointer;
}


.Rcard2-content-item3-button3:hover,
.Rcard2-content-item3-button4:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.Rcard2-content-item3-button3:active,
.Rcard2-content-item3-button4:active {
  transform: scale(0.98);
}

.Rcard2-chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.Rcard2-chart-legend {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.color-circle {
  width: 7.5px;
  height: 7.5px;
  border-radius: 50%;
}

.color-circle.circle1 {
  background: linear-gradient(0deg, #ABFFF8 0%, #57DCD1 100%);
}

.color-circle.circle2 {
  background: linear-gradient(0deg, #54EBFF 0%, #3FC1D5 100%);
}

.color-circle.circle3 {
  background: linear-gradient(0deg, #85D3EE 0%, #4591FE 100%);
}

.color-circle.circle4 {
  background: linear-gradient(0deg, #F0BF7C 0%, #FCA24B 100%);
}

.chart-legend-item,
.legend-item-name,
.legend-item-count {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  font-family: "AlimamaAgileVF", sans-serif;
  color: #fff;
}

.chart-legend-item {
  gap: 20px;
  text-align: left;
}

.legend-item-name,
.legend-item-count {
  gap: 10px;
  opacity: 0.8;
}

.Rcard1-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 12px;
  font-family: "AlimamaAgileVF", sans-serif;
  gap: 5px;
}

.Rcard2-column-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.Rcard2-icon {
  margin-bottom: -15px;
}

.column-text-wrapper {
  background: url("@/assets/pngs/BG/sidebar/Sim/card2/car-background.png") no-repeat center/ contain;
  width: 68px;
  height: 60px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-family: "AlimamaAgileVF", sans-serif;
}

.Rcard2-content-row.row2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.Rcard2-content-item2 {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 25px;
  gap: 20px;
}

.Rcard2-row-button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.dispatch-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 12px 25px;

}

.dispatch-title {
  font-size: 16x;
  font-family: "YouSheBiaoTiHei", sans-serif;
  color: #fff;
}

.dispatch-options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dispatch-options-row {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.dispatch-option-item {
  background: url("@/assets/pngs/BG/sidebar/Sim/card2/dispatch/background.png") no-repeat center/ contain;
  width: 142px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.dispatch-option-item-icon {
  height: 32px;
}

.dispatch-option-item-select {
  width: 74px;
  height: 16px;
  background-color: #3FC1D5;
}

.Rcard2-column-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}
</style>