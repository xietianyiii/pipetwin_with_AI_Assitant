<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chartBg from '@/assets/pngs/BG/sidebar/card/card2-svg/chart_back2.png'

const chartRef = ref(null)

onMounted(() => {
  const chart = echarts.init(chartRef.value)

  const option = {
    tooltip: { show: true },
    legend: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['55%', '66%'],
        padAngle: 8,

        itemStyle: {
          borderRadius: 0,
          borderWidth: 0
        },

        emphasis: {
          scale: true,
          scaleSize: 2
        },

        label: { show: false },
        labelLine: { show: false },

        data: [
          {
            value: 12,
            name: '雨水泵站',
            itemStyle: { color: '#4D99FC' }
          },
          {
            value: 4,
            name: '雨水开泵',
            itemStyle: { color: '#FAA450' }
          }
        ]
      }
    ]
  }

  chart.setOption(option)
})
</script>

<template>
  <div class="chart-card">
    <img class="bg" :src="chartBg" />
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<style scoped>
.chart-card {
  position: relative;
  display: inline-block;
}

.bg {
  display: block;
}

.chart {
  position: absolute;
  width: 120px;
  height: 120px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>
