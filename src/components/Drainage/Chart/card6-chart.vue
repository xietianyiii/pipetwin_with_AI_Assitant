<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chartBg from '@/assets/pngs/BG/sidebar/card/card6-svg/chart-bg.png'

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
            value: 804,
            name: '结构',
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
            value: 735,
            name: '脱节',
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
            value: 280,
            name: '变形',
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
            value: 184,
            name: '腐蚀',
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
  width: 180px;
  height: 180px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>
