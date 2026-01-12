<template>
  <div class="drainage-container">
    <div class="sidebar-background">
      <div class="sidebar-background-left">
        <img class="sidebar-background-left-img" src="@/assets/pngs/BG/sidebar/L.png" />
      </div>
      <div class="sidebar-background-right">
        <img class="sidebar-background-right-img" src="@/assets/pngs/BG/sidebar/R.png" />
      </div>
    </div>
    <div class="sidebar">
      <div class="sidebar-left">

        <div class="sidebar-left-card card1">
          <BaseCard title="管网总览" titleType="left" :contentBg="contentLbg1" width="344px" height="184px"
            contentClass="card1-content-row">
            <div class="card-content-row card1-row1">
              <div class="card-content-row-left card1-row1-left">
                <div class="card-content-row-left-icon card1-row1-left-icon">
                  <img class="card-content-row-left-icon-img card1-row1-left-icon-img"
                    src="@/assets/pngs/BG/sidebar/card/card1-svg/pipe.png" />
                </div>
                <div class="card-content-row-left-text card1-row1-left-text">
                  <div class="card1-row1-left-text-title">管网总里程</div>
                  <NumberUnit value="9282" unit="km" />
                </div>
              </div>
              <div class="card-content-row-right card1-row1-right">
                <div class="card-content-row-right-text-container card1-row1-right-text">
                  <div class="card-content-row-right-text-left">
                    <div class="card1-row1-right-text-title">雨水管网</div>
                    <div class="card1-row1-right-text-number-wrapper-left">
                      <span class="card1-row1-right-number">3200</span>
                      <span class="card1-row1-right-unit">km</span>
                    </div>
                  </div>

                  <div class="card-content-row-right-text-right">
                    <div class="card1-row1-right-text-title">污水管网</div>
                    <div class="card1-row1-right-text-number-wrapper-right">
                      <span class="card1-row1-right-number">6082</span>
                      <span class="card1-row1-right-unit">km</span>
                    </div>
                  </div>
                </div>
                <div class="card-content-row-right-icon-container card1-row1-right-icon">
                  <img class="card-content-row-right-icon-img card1-row1-right-icon-img"
                    src="@/assets/pngs/BG/sidebar/card/card1-svg/km.png" />
                </div>
              </div>
            </div>

            <div class="card-content-row card1-row2">
              <div class="card-content-row-three-container">
                <div class="card-content-row-three-item">
                  <img class="card-content-row-three-icon card1-row2-left-icon"
                    src="@/assets/pngs/BG/sidebar/card/card1-svg/check.png" />
                  <NumberUnit value="547" unit="万个" />
                  <div class="card1-row2-text-title">检查井</div>
                </div>
                <div class="card-content-row-three-item">
                  <img class="card-content-row-three-icon card1-row2-left-icon"
                    src="@/assets/pngs/BG/sidebar/card/card1-svg/rain.png" />
                  <NumberUnit value="27.16" unit="万个" />
                  <div class="card1-row2-text-title">雨水口</div>
                </div>
                <div class="card-content-row-three-item">
                  <img class="card-content-row-three-icon card1-row2-left-icon"
                    src="@/assets/pngs/BG/sidebar/card/card1-svg/outlet.png" />
                  <NumberUnit value="100" unit="个" />
                  <div class="card1-row2-text-title">排河口</div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="sidebar-left-card card2">
          <BaseCard title="泵站监测" titleType="left" :contentBg="contentLbg2" width="344px" height="156px"
            contentClass="card2-content-row">
            <div class="card2-left-chart-container-wrapper">
              <div class="card2-left-chart-container">
                <RainPumpChart1 />
                <div class="card2-left-chart-text">
                  <div class="card2-left-chart-text-title">雨水泵站</div>
                  <NumberUnit value="16" unit="个" />
                </div>
              </div>
            </div>
            <div class="card2-right-chart-container-wrapper">
              <div class="card2-right-chart-container">
                <RainPumpChart2 />
                <div class="card2-right-chart-text">
                  <div class="card2-right-chart-text-title">污水泵站</div>
                  <NumberUnit value="3" unit="个" />
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="sidebar-left-card card3">
          <BaseCard title="污水厂概况" titleType="left" :contentBg="contentLbg3" width="344px" height="80px"
            contentClass="card3-content-row">
            <div class="card3-content-left-container">
              <div class="card3-left-icon">
                <img class="card3-left-icon-img" src="@/assets/pngs/BG/sidebar/card/card3-svg/icon-left.png" />
              </div>
              <div class="card3-left-text-wrapper">
                <div class="card3-left-text-title">污水厂</div>
                <NumberUnit value="5" unit="座" />
              </div>
            </div>
            <div class="card3-content-right-container">
              <div class="card3-right-icon">
                <img class="card3-right-icon-img" src="@/assets/pngs/BG/sidebar/card/card3-svg/icon-right.png" />
              </div>
              <div class="card3-right-text-wrapper">
                <div class="card3-right-text-title">处理规模</div>
                <NumberUnit value="150" unit="万吨/天" />
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="sidebar-left-card card4">
          <BaseCard title="排水分区" titleType="left" :contentBg="contentLbg4" width="344px" height="240px"
            contentClass="card4-content-row">
            <div class="card4-content-row card4-row1">
              <div class="card4-row1-icon">
                <img class="card4-row1-icon-img" src="@/assets/pngs/BG/sidebar/card/card4-svg/row1-icon.png" />
              </div>
              <div class="card4-row1-text-container">
                <div class="card4-row1-text-title">排水分区总数</div>
                <div class="card4-row1-text-number-wrapper">
                  <div class="card4-row1-text-number">60</div>
                  <div class="card4-row1-text-unit">个</div>
                </div>
              </div>
            </div>
            <div class="card4-content-row card4-row2">
              <div class="card4-row2-title">排水单元数量</div>
              <div class="card4-row2-item-container">
                <div class="card4-row2-item-left">
                  <div class="card4-row2-left-text-container">
                    <div class="card4-row2-left-title">重力波:</div>
                    <NumberUnit value="60" unit="个" unitSize="11px" class="card4-row-number" />
                  </div>
                </div>
                <div class="card4-row2-item-right">
                  <div class="card4-row2-right-text-container">
                    <div class="card4-row2-right-title">压力波:</div>
                    <NumberUnit value="0" unit="个" unitSize="11px" class="card4-row-number" />
                  </div>
                </div>
              </div>
            </div>
            <div class="card4-content-row card4-row3">
              <div class="card4-row3-title">防洪设计标准</div>
              <div class="card4-row3-item-container">
                <div class="card4-row3-item-left">
                  <div class="card4-row3-left-text-container">
                    <div class="card4-row3-left-title">青龙涧:</div>
                    <NumberUnit value="50" unit="年一遇" unitSize="11px" class="card4-row-number" />
                  </div>
                </div>
                <div class="card4-row3-item-right">
                  <div class="card4-row3-right-text-container">
                    <div class="card4-row3-right-title">苍龙涧:</div>
                    <NumberUnit value="50" unit="年一遇" unitSize="11px" class="card4-row-number" />
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

      </div>
      <div class="sidebar-right">
        <div class="sidebar-right-card card1">
          <div class="sidebar-right-card-title card1-title">
            <span class="card1-title-text-wrapper">
              <span class="card-title-text">管网养护</span>
              <span class="card1-title-text-data">(本月)</span>
            </span>
          </div>

          <div class="sidebar-right-card-content card1-content">
            <div class="Rcard1-content-row">
              <div class="card-content-row-three-container">
                <div class="card-content-row-three-item">
                  <img class="card-content-row-three-icon card1-row2-left-icon"
                    src="@/assets/pngs/BG/sidebar/card/card5-svg/length.png" />
                  <NumberUnit value="310" unit="km" />
                  <div class="card1-row2-text-title">长度</div>
                </div>
                <div class="card-content-row-three-item">
                  <img class="card-content-row-three-icon card1-row2-left-icon"
                    src="@/assets/pngs/BG/sidebar/card/card1-svg/check.png" />
                  <NumberUnit value="1092" unit="个" />
                  <div class="card1-row2-text-title">检查井</div>
                </div>
                <div class="card-content-row-three-item">
                  <img class="card-content-row-three-icon card1-row2-left-icon"
                    src="@/assets/pngs/BG/sidebar/card/card1-svg/rain.png" />
                  <NumberUnit value="403" unit="个" />
                  <div class="card1-row2-text-title">雨水口</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar-right-card card2">
          <BaseCard title="管网缺陷" titleType="right" :contentBg="contentRbg2" width="344px" height="628px"
            contentClass="Rcard2-content-row">

            <div class="Rcard2-content-item1">
              <div class="Rcard2-content-item1-button1">
                结构性缺陷
              </div>
              <div class="Rcard2-content-item1-button2">
                功能性缺陷
              </div>
            </div>
            <div class="Rcard2-content-item2">
              <div class="Rcard2-chart-container">
                <RainPumpChart6 />
              </div>
              <div class="Rcard2-chart-legend">
                <div class="chart-legend-item">
                  <div class="legend-item-name">
                    <div class="color-circle circle1"></div>
                    <div class="legend-text">
                      结垢
                    </div>
                  </div>
                  <div class="legend-item-count">
                    <div class="legend-count">804</div>
                    <div class="legend-ratio">40.1%</div>
                  </div>
                </div>
                <div class="chart-legend-item">
                  <div class="legend-item-name">
                    <div class="color-circle circle2"></div>
                    <div class="legend-text">
                      脱节
                    </div>
                  </div>
                  <div class="legend-item-count">
                    <div class="legend-count">735</div>
                    <div class="legend-ratio">36.69%</div>
                  </div>
                </div>
                <div class="chart-legend-item">
                  <div class="legend-item-name">
                    <div class="color-circle circle3"></div>
                    <div class="legend-text">
                      变形
                    </div>
                  </div>
                  <div class="legend-item-count">
                    <div class="legend-count">280</div>
                    <div class="legend-ratio">13.98%</div>
                  </div>
                </div>
                <div class="chart-legend-item">
                  <div class="legend-item-name">
                    <div class="color-circle circle4"></div>
                    <div class="legend-text">
                      腐蚀
                    </div>
                  </div>
                  <div class="legend-item-count">
                    <div class="legend-count">184</div>
                    <div class="legend-ratio">6.2%</div>
                  </div>
                </div>

              </div>
            </div>
            <div class="Rcard2-content-item3">
              <ReuseTable :columns="defectColumns" :data="defectRows" />
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
import contentLbg2 from "@/assets/pngs/BG/sidebar/card/background/L_Content2.png";
import contentLbg3 from "@/assets/pngs/BG/sidebar/card/background/L_Content3.png";
import contentLbg4 from "@/assets/pngs/BG/sidebar/card/background/L_Content4.png";
import contentRbg2 from "@/assets/pngs/BG/sidebar/card/background/R_Content2.png";

import ReuseTable from "@/components/ReuseCop/Table.vue";
import NumberUnit from "@/components/ReuseCop/NumberUnit.vue";
import BaseCard from "@/components/ReuseCop/BaseCard.vue";

const RainPumpChart1 = defineAsyncComponent(
  () => import("@/components/Drainage/Chart/card2-chart1.vue")
);

const RainPumpChart2 = defineAsyncComponent(
  () => import("@/components/Drainage/Chart/card2-chart2.vue")
);

const RainPumpChart6 = defineAsyncComponent(
  () => import("@/components/Drainage/Chart/card6-chart.vue")
);

const defectRows = ref([
  { id: "36170506", location: "西城区-管段 B-05", defect: "脱节" },
  { id: "f790a225", location: "东城区-管段 A-12", defect: "结垢" },
  { id: "f790a225", location: "东城区-管段 A-12", defect: "结垢" },
  { id: "f790a225", location: "东城区-管段 A-12", defect: "变形" },
  { id: "f790a225", location: "东城区-管段 A-12", defect: "结垢" },
  { id: "f790a225", location: "东城区-管段 A-12", defect: "腐蚀" },
]);

const defectColumns = [
  { key: "id", label: "缺陷管网ID" },
  { key: "location", label: "位置" },
  { key: "defect", label: "缺陷名称" },
]

</script>

<style scoped>
.sidebar-background {
  position: relative;
  width: 100%;
  height: 100vh;
}

.sidebar-background-left {
  position: absolute;
  left: 0;
  top: -10%;
  height: 100vh;
  z-index: -1;
}

.sidebar-background-left-img {
  width: 30px;
  height: 100%;
  object-fit: contain;
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

.sidebar-left {
  display: flex;
  flex-direction: column;
  gap: 5px;
  pointer-events: auto;
}

.sidebar-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: auto;
}

.sidebar-left-card,
.sidebar-right-card {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sidebar-left-card-content {
  display: flex;
  margin-left: 8.5%;
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

.card-content-row {
  display: flex;
  /* 默认 row：横向 */
  padding: 10px 22px;
  gap: 20px;
}

:deep(.card1-content-row) {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

:deep(.card2-content-row) {
  display: flex;
  justify-content: center;
  gap: 35px;
}

:deep(.card3-content-row) {
  display: flex;
  justify-content: space-between;
}

:deep(.Rcard2-content-row) {
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 28px;
}

.card-content-row-left {
  display: flex;
  /* 默认 row：横向 */
  align-items: center;
  gap: 18px;
}

.card-content-row-left-text {
  color: #ffffff;
  font-size: 13px;
  font-family: "AlimamaAgileVF", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 5px;
}

.card-content-row-left-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content-row-right {
  margin-left: 12px;
}

.card1-row1-right-icon {
  margin-top: -10px;
}

.card-content-row-right-text-container {
  display: flex;
  justify-content: space-between;
}

.card1-row1-right-text-title {
  color: #adcbe7;
  font-size: 12px;
  font-family: "AlimamaAgileVF", sans-serif;
  margin-bottom: 5px;
}

.card1-row1-right-text-number-wrapper-left,
.card1-row1-right-text-number-wrapper-right {
  color: #fff;
  font-size: 14px;
  font-family: "AlimamaAgileVF", sans-serif;
  font-weight: 700;
}

.card1-row1-right-unit {
  color: #fff;
  font-size: 12px;
  font-family: "AlimamaAgileVF", sans-serif;
}

.card-content-row-three-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.card-content-row.card1-row2 {
  display: flex;
  margin-top: -15px;
}

.card1-row2-text-title {
  color: #fff;
  font-size: 13px;
  font-family: "AlimamaAgileVF", sans-serif;
  display: flex;
  justify-content: center;
  margin-right: 7px;
}

.card2-left-chart-container,
.card2-right-chart-container {
  width: 100%;
  height: 100%;
}

.card2-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 35px;
}

.card2-left-chart-text,
.card2-right-chart-text {
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 13px;
  align-items: baseline;
  font-family: "AlimamaAgileVF", sans-serif;
  color: #fff;
}

.card2-left-chart-text,
.card2-right-chart-text {
  margin-top: 6px;
}

.card2-left-chart-text-title,
.card2-right-chart-text-title {
  font-size: 14px;
  font-family: "AlimamaAgileVF", sans-serif;
}

.card3-content-left-container,
.card3-content-right-container {
  display: flex;
  align-items: center;
  gap: 6px;
}

.card3-left-text-wrapper,
.card3-right-text-wrapper {
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 3px;
  margin-bottom: 10px;
}

.card3-left-text-title,
.card3-right-text-title {
  font-size: 13px;
  font-family: "AlimamaAgileVF", sans-serif;
}

.card4-content {
  display: flex;
  flex-direction: column;
}

.card4-content-row {
  display: flex;
  flex-direction: row;
}

.card4-content-row.card4-row2,
.card4-content-row.card4-row3 {
  display: flex;
  flex-direction: column;
  color: #fff;
}

.card4-row1 {
  margin-top: -6px;
}

.card4-row1-text-container {
  background: url("@/assets/pngs/BG/sidebar/card/card4-svg/row1-back.png") no-repeat center/ contain;
  width: 256px;
  height: 32px;
  margin-top: 12px;
  color: #fff;
}

.card4-row1-text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 45px;
}

.card4-row1-text-title {
  font-size: 13px;
  font-family: "AlimamaAgileVF", sans-serif;
}

.card4-row1-text-number-wrapper {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.card4-row1-text-number {
  font-size: 20px;
  font-family: "AlimamaShuHeiTi", sans-serif;
  background: linear-gradient(180deg, #ffffff 0%, #fcb169 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card4-row1-text-unit {
  font-size: 13px;
  font-family: "AlimamaAgileVF", sans-serif;
  background: linear-gradient(180deg, #ffffff 0%, #fcb169 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card4-row2-title {
  font-size: 18px;
  font-family: "YouSheBiaoTiHei", sans-serif;
  margin-top: -8px;
  margin-bottom: 5px;
}

.card4-row3-title {
  font-size: 18px;
  font-family: "YouSheBiaoTiHei", sans-serif;
  margin-top: 5px;
  margin-bottom: 5px;
}

.card4-row2-item-container,
.card4-row3-item-container {
  display: flex;
  gap: 20px;
}

.card4-row2-item-left {
  background: url("@/assets/pngs/BG/sidebar/card/card4-svg/row2-left.png") no-repeat center/ contain;
  width: 142px;
  height: 48px;
}

.card4-row2-item-right {
  background: url("@/assets/pngs/BG/sidebar/card/card4-svg/row2-right.png") no-repeat center/ contain;
  width: 142px;
  height: 48px;
}

.card4-row3-item-left {
  background: url("@/assets/pngs/BG/sidebar/card/card4-svg/row3-icon.png") no-repeat center/ contain;
  width: 142px;
  height: 48px;
}

.card4-row3-item-right {
  background: url("@/assets/pngs/BG/sidebar/card/card4-svg/row3-icon.png") no-repeat center/ contain;
  width: 142px;
  height: 48px;
}

.card4-row2-left-title,
.card4-row2-right-title,
.card4-row3-left-title,
.card4-row3-right-title {
  font-size: 12px;
  font-family: "AlimamaAgileVF", sans-serif;
  margin-top: 4px;
  margin-left: 15px;
}

.card4-row-number {
  margin-left: 15px;
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

.Rcard1-content-row {
  display: flex;
  padding: 16px 32px;
}

.Rcard2-content-item1 {
  display: flex;
  padding: 10px;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
}

.Rcard2-content-item1-button1,
.Rcard2-content-item1-button2 {
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

.Rcard2-content-item1-button1:hover,
.Rcard2-content-item1-button2:hover {
  background: url("@/assets/pngs/BG/sidebar/card/card6-svg/hover.png") no-repeat center/ contain;
  cursor: pointer;
}

.Rcard2-chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.Rcard2-chart-legend {
  margin-top: 25px;
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
  gap: 40px;
  width: 180px;
  text-align: left;
}

.legend-item-name,
.legend-item-count {
  gap: 20px;
  opacity: 0.8;
}

.legend-item-name {
  gap: 15px
}

.legend-ratio {
  font-size: 14px;
  font-family: "AlimamaShuHeiTi", sans-serif;
  background: linear-gradient(180deg, #FFFFFF 0%, #62F1FA 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.8;
}

.Rcard2-content-item3{
  display: flex;
  margin-top: -10px;
}
</style>