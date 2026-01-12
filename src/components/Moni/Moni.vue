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
          <BaseCard title="防汛预报" titleType="right" :contentBg="contentLbg1" width="344px" height="120px"
            contentClass="Rcard1-content-row">
            <div class="Rcard1-left-container">
              <div class="Rcard1-icon">
                <img src="@/assets/pngs/BG/sidebar/Moni/card1/rain.png" />
                暴雨预警
              </div>
            </div>
            <div class="Rcard1-right-container">
              <div class="Rcard1-icon">
                <img src="@/assets/pngs/BG/sidebar/Moni/card1/Ⅱ.png" />
                二级响应
              </div>
            </div>
          </BaseCard>

        </div>

        <div class="sidebar-right-card card2">
          <BaseCard title="雨量监测" titleType="right" :contentBg="contentLbg1" width="344px" height="96px"
            contentClass="Rcard2-content-row">
            <div class="Rcard2-left-container">
              <div class="Rcard2-icon">
                <img src="@/assets/pngs/BG/sidebar/Moni/card2/rain.png" />
              </div>
              <div class="column-text-wrapper">
                <div class="column-text-title">多日平均雨量</div>
                <NumberUnit value="23.3" unit="mm" />
              </div>
            </div>
            <div class="Rcard2-right-container">
              <div class="Rcard2-icon">
                <img src="@/assets/pngs/BG/sidebar/Moni/card2/station.png" />
              </div>
              <div class="column-text-wrapper">
                <div class="column-text-title">单站累计最大</div>
                <NumberUnit value="43.1" unit="mm" />
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="sidebar-right-card card3">
          <BaseCard title="水位监测" titleType="right" :contentBg="contentLbg1" width="344px" height="120px"
            contentClass="Rcard3-content-row">
            <div class="Rcard3-column-container">
              <div class="Rcard3-icon">
                <img src="@/assets/pngs/BG/sidebar/Moni/card3/road.png" />
                <NumberUnit value="6" unit="个" />
                道路积水
              </div>

            </div>

            <div class="Rcard3-column-container">
              <div class="Rcard3-icon">
                <img src="@/assets/pngs/BG/sidebar/Moni/card3/pipe.png" />
                <NumberUnit value="7" unit="个" />
                管道液位
              </div>
            </div>

            <div class="Rcard3-column-container">
              <div class="Rcard3-icon">
                <img src="@/assets/pngs/BG/sidebar/Moni/card3/river.png" />
                <NumberUnit value="1" unit="个" />
                河道监测
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="sidebar-right-card card4">
          <BaseCard title="积水点监测" titleType="right" :contentBg="contentLbg1" width="344px" height="310px"
            contentClass="Rcard4-content-row">
            <div class="card4-row1">
              <div class="card4-row1-icon">
                <img class="card4-row1-icon-img" src="@/assets/pngs/BG/sidebar/card/card4-svg/row1-icon.png" />
              </div>
              <div class="card4-row1-text-container">
                <div class="card4-row1-text-title">积水点总数</div>
                <div class="card4-row1-text-number-wrapper">
                  <div class="card4-row1-text-number">60</div>
                  <div class="card4-row1-text-unit">个</div>
                </div>
              </div>
            </div>
            <div class="card4-row2">
              <ReuseTable :columns="defectColumns" :data="defectRows" />
            </div>
          </BaseCard>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import contentLbg1 from "@/assets/pngs/BG/sidebar/card/background/L_Content1.png";

import ReuseTable from "@/components/ReuseCop/Table.vue";
import NumberUnit from "@/components/ReuseCop/NumberUnit.vue";
import BaseCard from "@/components/ReuseCop/BaseCard.vue";

const defectRows = ref([
  { id: "华新", time: "06-01 14:00", level: "12.5", type: "道路" },
  { id: "徐泾", time: "06-01 14:00", level: "10.8", type: "道路" },
  { id: "青浦", time: "06-01 14:00", level: "11.2", type: "道路" },
  { id: "秦家角", time: "06-01 14:00", level: "13.0", type: "下立交" },
  { id: "青浦", time: "06-01 14:00", level: "12.0", type: "道路" },
]);

const defectColumns = [
  { key: "id", label: "积水点" },
  { key: "time", label: "监测时间" },
  { key: "level", label: "水位" },
  { key: "type", label: "积水点类型" },
]

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
  align-items: center;
  justify-content: center;
  padding: 0px;
  gap: 22px;
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

:deep(.Rcard1-content-row) {
  display: flex;
  color: #fff;
  font-size: 14px;
  font-family: "AlimamaAgileVF", sans-serif;
  justify-content: center;
  gap: 21%;
}

.Rcard1-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.Rcard2-left-container,
.Rcard2-right-container {
  display: flex;
  gap: 6px;
}

.column-text-wrapper {
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 3px;
  margin-top: 8px;
}

.column-text-title {
  font-size: 12px;
  font-family: "AlimamaAgileVF", sans-serif;
}

:deep(.Rcard3-content-row) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 55px;
}

.Rcard3-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 12px;
  font-family: "AlimamaAgileVF", sans-serif;
  gap: 5px;
}

.card4-row1 {
  display: flex;
}

.card4-row1-text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 45px;
  background: url(/src/assets/pngs/BG/sidebar/card/card4-svg/row1-back.png) no-repeat center / contain;
  width: 256px;
  height: 32px;
  margin-top: 12px;
  color: #fff;
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

</style>