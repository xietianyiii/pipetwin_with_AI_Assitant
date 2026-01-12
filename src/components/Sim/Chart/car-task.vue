<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chartBg from '@/assets/pngs/BG/sidebar/Sim/card2/chart-bg.png'

const chartRef = ref(null)

onMounted(() => {
  const chart = echarts.init(chartRef.value)

  const option = {
    tooltip: { show: true },
    legend: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['56%', '66%'],
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
            value: 84,
            name: '任务完成',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0.17, color: '#61E0D7' },
                  { offset: 0.76, color: '#9EF9F2' }
                ]
              }
            }


          },
          {
            value: 73,
            name: '驻点保障',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0.17, color: '#54EBFF' },
                  { offset: 0.76, color: '#3FC1D5' }
                ]
              }
            }


          },
          {
            value: 28,
            name: '集结待命',
            itemStyle: {
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#4D99FC' },
                  { offset: 0.9, color: '#75C3F2' }
                ]
              }
            }


          },
          {
            value: 18,
            name: '任务执行',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0.1, color: '#FEE9D4' },
                  { offset: 0.6, color: '#FCB169' }
                ]
              }
            }
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
  width: 117px;
  height: 117px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>
