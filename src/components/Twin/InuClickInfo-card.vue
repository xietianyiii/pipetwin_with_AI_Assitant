<template>
  <div
    v-show="visible"
    class="draggable-card"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @mousedown="startDrag"
    ref="cardRef"
  >
    <div class="card-header">
      <span>GridID: {{ title }}</span>
      <button class="close-btn" @click="$emit('close')">✕</button>
    </div>

    <div class="card-body">
      <div class="row">当前时序水深值: {{ Inuvalue.toFixed(4) }} m</div>
      <div class="row">历史水深曲线: 单位(m)</div>
      <div class="row">
        <div ref="chartRef" style="width: 270px; height: 150px"></div>
      </div>

      <!-- <div class="row">
        历史水深数据:
        <span v-if="historyValues.length > 0">
          {{ historyValues.map((v) => v.toFixed(4)).join(", ") }}
        </span>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: "信息卡片" },
  Inuvalue: { type: Number, default: 0 },
  historyValues: { type: Array as () => number[], default: () => [] },
});

const emit = defineEmits(["close"]);

const position = ref({ x: 1500, y: 300 });
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
const cardRef = ref<HTMLElement | null>(null);
const velocity = ref({ x: 0, y: 0 }); // 用于跟踪拖动速度
const lastPosition = ref({ x: 0, y: 0 }); // 用于计算速度
const lastTime = ref(0); // 用于计算时间差

// 允许自定义边界
const BOUND = {
  minX: 14,
  maxX: 1500,
  minY: 70,
  maxY: 770,
};

const startDrag = (e: MouseEvent) => {
  if (!cardRef.value) return;
  isDragging.value = true;

  offset.value.x = e.clientX - position.value.x;
  offset.value.y = e.clientY - position.value.y;

  // 重置速度
  velocity.value.x = 0;
  velocity.value.y = 0;
  lastPosition.value.x = position.value.x;
  lastPosition.value.y = position.value.y;
  lastTime.value = Date.now();

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;

  let newX = e.clientX - offset.value.x;
  let newY = e.clientY - offset.value.y;

  // 使用手动边界配置
  newX = Math.max(BOUND.minX, Math.min(newX, BOUND.maxX));
  newY = Math.max(BOUND.minY, Math.min(newY, BOUND.maxY));

  // 计算时间差
  const now = Date.now();
  const deltaTime = now - lastTime.value;

  if (deltaTime > 0) {
    // 计算速度 (像素/毫秒)
    velocity.value.x = (newX - lastPosition.value.x) / deltaTime;
    velocity.value.y = (newY - lastPosition.value.y) / deltaTime;
  }

  // 更新位置和时间
  position.value = { x: newX, y: newY };
  lastPosition.value.x = newX;
  lastPosition.value.y = newY;
  lastTime.value = now;
};

// 惯性动画函数
const inertiaAnimation = () => {
  // 初始速度
  let vx = velocity.value.x * 1000; // 转换为像素/秒
  let vy = velocity.value.y * 1000;

  // 物理参数
  const friction = 0.92; // 摩擦系数 (更真实的摩擦力)
  const minVelocity = 0.5; // 最小速度阈值
  const deceleration = 0.98; // 减速度

  // 上一帧时间
  let lastTimestamp = 0;

  // 动画函数
  const animate = (timestamp: number) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.1); // 转换为秒，最大0.1秒
    lastTimestamp = timestamp;

    // 应用减速度和摩擦力
    vx *= deceleration * friction;
    vy *= deceleration * friction;

    // 计算新位置
    let newX = position.value.x + vx * deltaTime;
    let newY = position.value.y + vy * deltaTime;

    // 使用手动边界配置
    newX = Math.max(BOUND.minX, Math.min(newX, BOUND.maxX));
    newY = Math.max(BOUND.minY, Math.min(newY, BOUND.maxY));

    // 如果碰到边界，反转速度方向以产生反弹效果
    if (newX <= BOUND.minX || newX >= BOUND.maxX) {
      vx = -vx * 0.3; // 反弹并减少速度
    }
    if (newY <= BOUND.minY || newY >= BOUND.maxY) {
      vy = -vy * 0.3; // 反弹并减少速度
    }

    // 更新位置
    position.value.x = newX;
    position.value.y = newY;

    // 如果速度足够大，继续动画
    if (Math.abs(vx) > minVelocity || Math.abs(vy) > minVelocity) {
      requestAnimationFrame(animate);
    }
  };

  // 开始动画
  if (Math.abs(vx) > minVelocity || Math.abs(vy) > minVelocity) {
    requestAnimationFrame(animate);
  }
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);

  // 启动惯性动画
  inertiaAnimation();
};

// 当卡片每次被打开时，重置位置
watch(
  () => props.visible,
  (n) => {
    if (n) {
      position.value = { x: 1500, y: 300 };
    }
  }
);

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const renderChart = () => {
  if (!chartRef.value) return;

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value);
  }

  const option = {
    color: ["#37A2FF"],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      formatter: (params: any[]) => {
        const data = params[0];
        return `${data.name}<br/>${data.marker} ${data.seriesName}: ${data.data.toFixed(4)}`;
      }
    },
    grid: {
      top: 20,
      left: 35,
      right: 10,
      bottom: 20,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.historyValues.map((_, i) => `9.${i + 1}`),

      axisLabel: { color: "#FFFFFF" }, // ✔ X轴文字白色
      axisLine: { lineStyle: { color: "transparent" } }, // ✔ X轴轴线无色
      axisTick: { lineStyle: { color: "#CCCCCC" } }, // ✔ X轴刻度线白灰色
      name: "日期",
      nameLocation: "end",
      nameTextStyle: {
        color: "#FFFFFF",
        fontSize: 10,
      },
    },
    yAxis: {
      type: "value",
      splitNumber: 2,
      min: (value: { min: number }) => value.min * 0.8,
      max: (value: { max: number }) => value.max * 1.2,

      axisLabel: {
        color: "#FFFFFF",
        formatter: (value: number) => value.toFixed(1),
      },
      name: "水深(m)",
      nameLocation: "end",
      nameTextStyle: {
        color: "#FFFFFF",
        fontSize: 10,
      },
      nameGap: 20,
    },
    series: [
      {
        name: "水深",
        type: "line",
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgb(128, 255, 165)" },
            { offset: 1, color: "rgb(1, 191, 236)" },
          ]),
        },
        showSymbol: false,
        data: props.historyValues,
      },
    ],
  };

  chartInstance.setOption(option);
};

// 当历史数据变化时更新图表
watch(
  () => props.visible,
  (v) => {
    if (v) {
      nextTick(() => {
        if (!chartInstance && chartRef.value) {
          chartInstance = echarts.init(chartRef.value);
        }
        chartInstance?.resize();
        renderChart();
      });
    }
  }
);

watch(
  () => props.historyValues,
  () => {
    nextTick(() => {
      if (chartInstance) {
        chartInstance.setOption({
          xAxis: {
            data: props.historyValues.map((_, i) => `9.${i + 1}`),
          },
          series: [
            {
              data: props.historyValues,
            },
          ],
        });
      }
    });
  },
  { deep: true }
);

// 组件挂载后初始化图表
onMounted(() => {
  renderChart();
});
</script>

<style scoped>
.draggable-card {
  position: absolute;
  width: 280px;
  background-color: rgba(79, 99, 113, 0.7);
  border: 2px solid rgba(248, 248, 248, 0.8);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
  padding: 16px 20px;
  font-size: 14px;
  z-index: 999;
  backdrop-filter: blur(6px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  pointer-events: auto;
  user-select: none;
  cursor: grab;
  animation: popupAppear 0.3s ease-out;
}

.draggable-card:hover {
  box-shadow: 0 5px 20px rgba(0, 191, 255, 1);
}

.draggable-card:active {
  cursor: grabbing;
}

@keyframes popupAppear {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  font-family: "SHJGSK";
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(248, 248, 248, 0.5);
}

.close-btn {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(5, 50, 66, 0.5),
    rgba(0, 212, 255, 0.5)
  );
  border: 1px solid rgba(248, 248, 248, 0.8);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(0, 191, 255, 0.5);
}

.close-btn:hover {
  background: radial-gradient(
    circle at 0% 60%,
    #1a918b 0%,
    #0099c8 60%,
    #00e5ff 100%
  );
  box-shadow: 0 0 10px rgba(0, 255, 255, 1);
  transform: scale(1.1);
}

.card-body {
  font-family: "YRDZST";
  font-weight: 600;
  color: #ffffff;
  animation: contentFadeIn 0.3s ease-out 0.2s both;
}

@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.row {
  margin-bottom: 15px;
}
</style>
