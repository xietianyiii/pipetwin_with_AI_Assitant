<template>
  <div
    v-show="visible"
    class="draggable-card"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @mousedown="startDrag"
    ref="cardRef"
  >
    <div class="card-header">
      <span class="card-header-text">管网编辑 </span>
      <button class="close-btn" @click="$emit('close')">✕</button>
    </div>

    <div class="card-body">
      <div class="mapping-header">
        <span class="header-item">字段</span>
        <span class="header-item">属性</span>
      </div>
      <div class="mapping-row">
        <span class="field-item">管网代码</span
        ><span class="value-item">{{ PipeFID }}</span>
      </div>
      <div class="mapping-row">
        <span class="field-item">材质</span
        ><span class="value-item">{{ pipeData?.cz }}</span>
      </div>
      <div class="mapping-row">
        <span class="field-item">管径</span
        ><span class="value-item">{{ pipeData?.gj }} mm</span>
      </div>
      <div class="mapping-row">
        <span class="field-item">长度</span
        ><span class="value-item">{{ pipeData?.length }} m</span>
      </div>
      <div class="mapping-row">
        <span class="field-item">起点高程</span
        ><span class="value-item">{{ pipeData?.qdg }} m</span>
      </div>
      <div class="mapping-row">
        <span class="field-item">终点高程</span
        ><span class="value-item">{{ pipeData?.zdg }} m</span>
      </div>
      <div class="mapping-row">
        <span class="field-item">起点经度</span
        ><span class="value-item">{{ pipeData?.start_lon }} °</span>
      </div>
      <div class="mapping-row">
        <span class="field-item">起点纬度</span
        ><span class="value-item">{{ pipeData?.start_lat }} °</span>
      </div>
      <div class="mapping-row">
        <span class="field-item">终点经度</span
        ><span class="value-item">{{ pipeData?.end_lon }} °</span>
      </div>
      <div class="mapping-row">
        <span class="field-item">终点纬度</span
        ><span class="value-item">{{ pipeData?.end_lat }} °</span>
      </div>
    </div>

    <div class="card-footer">
      <div class="AI-analysis-button" @click="AIanalysis">
        <svg
          t="1765353626494"
          class="icon"
          :class="{ 'searching': aiAnalysisTrigger }"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="91657"
          width="18"
          height="18"
        >
          <path
            d="M512 89.6a38.4 38.4 0 0 1 0 76.8A345.6 345.6 0 1 0 857.6 512a38.4 38.4 0 0 1 76.8 0 420.928 420.928 0 0 1-112.768 287.296l67.904 67.968a38.4 38.4 0 1 1-54.272 54.272l-70.848-70.784A422.4 422.4 0 1 1 512 89.6z"
            fill="#0090d3"
            p-id="91658"
          ></path>
          <path
            d="M799.488 82.688l30.016 54.784c13.12 24.064 32.96 43.904 57.088 57.088l54.784 29.952a35.904 35.904 0 0 1 0 62.976l-54.784 30.016a143.616 143.616 0 0 0-57.088 57.024l-30.016 54.848a35.904 35.904 0 0 1-62.976 0l-29.952-54.848a143.616 143.616 0 0 0-57.088-57.024l-54.784-30.016a35.904 35.904 0 0 1 0-62.976l54.784-29.952c24.064-13.184 43.904-33.024 57.088-57.088l29.952-54.784a35.904 35.904 0 0 1 62.976 0zM559.872 393.408l14.848 27.136c6.592 12.16 16.64 22.144 28.736 28.8l27.136 14.784a18.112 18.112 0 0 1 0 31.744l-27.136 14.848a72.32 72.32 0 0 0-28.8 28.8l-14.784 27.072a18.112 18.112 0 0 1-31.744 0L513.28 539.52a72.32 72.32 0 0 0-28.736-28.8l-27.136-14.72a18.112 18.112 0 0 1 0-31.808l27.136-14.848c12.16-6.592 22.144-16.64 28.8-28.8l14.784-27.072a18.112 18.112 0 0 1 31.744 0z"
            fill="#0090d3"
            p-id="91659"
          ></path>
        </svg>
        <span class="AI-analysis-button-text"> AI智能分析 </span>
      </div>

      <div class="AI-analysis-button" @click="AIrepair">
        <svg
          t="1765352013306"
          class="icon"
          :class="{ 'repairing': aiRepairTrigger }"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="81244"
          width="22"
          height="22"
        >
          <path
            d="M834.56 389.12c-64.426667 0-115.626667 47.786667-119.893333 109.653333H602.88c0-30.293333-11.093333-58.88-29.44-82.346666l54.186667-53.333334c14.08 9.386667 32 8.106667 44.8-1.28 12.8-9.386667 18.346667-27.306667 12.8-42.666666-5.546667-14.933333-19.626667-26.026667-36.266667-26.026667-14.08 0-27.733333 8.106667-33.28 20.48-6.826667 12.373333-5.546667 27.306667 1.28 38.4l-52.906667 53.333333c-22.186667-21.76-52.906667-34.133333-83.626666-35.84V244.906667c36.266667-4.266667 62.72-34.133333 62.72-68.693334 0-38.4-32-69.973333-71.253334-69.973333s-71.253333 31.573333-71.253333 69.973333c0 35.84 26.453333 65.706667 62.72 68.693334v124.586666c-32 1.28-61.44 14.933333-83.626667 35.84l-43.093333-42.666666c15.36-17.92 19.626667-42.666667 9.813333-64.426667S315.733333 262.4 290.56 262.4c-15.36 0-32 6.826667-43.093333 17.92-11.093333 11.093333-18.346667 26.026667-18.346667 42.666667 0 21.76 12.8 42.666667 32 52.053333 19.626667 11.093333 43.093333 9.386667 61.44-2.56L366.933333 416.853333c-19.626667 23.466667-29.44 52.053333-29.44 82.346667H200.533333c-2.56-35.84-33.28-63.146667-69.973333-60.16-36.266667 1.28-64.426667 31.573333-62.72 67.413333 1.28 35.84 30.72 64.426667 66.986667 64.426667 32 0 59.733333-23.466667 65.706666-55.04h139.52c2.986667 29.013333 16.64 55.04 36.266667 75.52l-57.173333 56.32c-14.08-9.386667-32-11.093333-47.36-2.56-15.36 8.106667-25.173333 23.466667-25.173334 39.68 0 12.373333 4.266667 23.466667 14.08 31.573333 8.533333 8.106667 19.626667 13.653333 32 13.653334 16.64 0 32-9.386667 40.533334-24.746667 8.533333-14.933333 6.826667-32.853333-2.56-46.506667l57.173333-56.32c20.906667 17.92 47.36 27.306667 75.52 29.013334v145.493333c-37.546667 4.266667-66.986667 37.12-64.426667 74.24 1.28 37.12 33.28 67.413333 72.533334 67.413333 37.546667 0 69.973333-29.013333 72.533333-67.413333 1.28-37.12-26.453333-69.973333-64.426667-74.24v-146.773333c27.733333-1.28 54.186667-12.373333 75.52-29.013334L610.986667 654.933333c-5.546667 8.106667-8.533333 17.92-8.533334 27.306667 0 26.026667 20.906667 46.506667 47.36 46.506667 26.453333 0 47.36-20.48 47.36-46.506667 0-26.026667-20.906667-46.506667-47.36-46.506667-9.813333 0-19.626667 2.56-27.733333 8.106667l-54.186667-53.333333c19.626667-20.48 33.28-46.506667 36.266667-75.52h111.786667c4.266667 61.866667 55.893333 109.653333 119.893333 109.653333 65.706667 0 119.893333-52.053333 119.893333-118.186667 0-65.28-55.893333-117.333333-121.173333-117.333333zM290.133333 340.906667c-9.813333 0-18.346667-8.106667-18.346666-17.92 0-9.386667 8.533333-17.92 18.346666-17.92s18.346667 8.106667 18.346667 17.92c0 9.813333-8.533333 17.92-18.346667 17.92z m358.826667 315.306666c14.08 0 26.453333 11.093333 26.453333 26.026667 0 13.653333-11.093333 26.026667-26.453333 26.026667-14.08 0-26.453333-11.093333-26.453333-26.026667 1.28-14.933333 12.373333-26.026667 26.453333-26.026667z m185.6-75.093333c-26.453333 0-51.626667-13.653333-65.706667-37.12-14.08-23.466667-14.08-50.773333 0-74.24 14.08-23.466667 37.546667-37.12 65.706667-37.12 41.813333 0 75.52 32.853333 75.52 74.24-0.426667 41.386667-33.706667 74.24-75.52 74.24z m0 0"
            fill="#0090d3"
            p-id="81245"
          ></path>
        </svg>
        <span class="AI-analysis-button-text"> AI智能修复 </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  computed,
} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  visible: { type: Boolean, default: false },
  PipeFID: { type: String, default: "信息卡片" },
  PipeEID: { type: String, default: "0" },
  pipeData: { type: Object, default: () => ({}) },
  aiAnalysisTrigger: { type: Boolean, default: false },
  aiRepairTrigger: { type: Boolean, default: false },
});

const emit = defineEmits(["close", "ai-analysis", "ai-repair"]);

const position = ref({ x: 1500, y: 180 });
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
const cardRef = ref<HTMLElement | null>(null);
const velocity = ref({ x: 0, y: 0 }); // 用于跟踪拖动速度
const lastPosition = ref({ x: 0, y: 0 }); // 用于计算速度
const lastTime = ref(0); // 用于计算时间差

// 允许自定义边界
const BOUND = {
  minX: 50,
  maxX: 1600,
  minY: 100,
  maxY: 370,
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

// 监听值变化并触发动画
let animationTimeouts = [];

onBeforeUnmount(() => {
  // 清除所有待执行的定时器
  animationTimeouts.forEach((timeout) => clearTimeout(timeout));
});

// 当任何值发生变化时，为对应的元素添加动画类
const triggerValueChangeAnimation = (selector) => {
  nextTick(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      const element = el as HTMLElement;
      // 先移除可能存在的动画类，确保动画能重新触发
      element.classList.remove("value-change-animation");

      // 强制重排，确保移除类后能重新触发动画
      element.offsetHeight;

      // 添加动画类
      element.classList.add("value-change-animation");

      // 设置定时器在动画结束后移除类
      const timeout = setTimeout(() => {
        el.classList.remove("value-change-animation");
        // 从 timeouts 数组中移除已执行的定时器
        const index = animationTimeouts.indexOf(timeout);
        if (index > -1) {
          animationTimeouts.splice(index, 1);
        }
      }, 500); // 动画持续时间应与 CSS 中定义的相同

      // 将定时器添加到数组中
      animationTimeouts.push(timeout);
    });
  });
};

// 监听各个属性的变化
watch(
  () => props.PipeFID,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      triggerValueChangeAnimation(".mapping-row:nth-child(2) .value-item");
    }
  }
);

// AI智能分析按钮点击事件
const AIanalysis = () => {
  emit("ai-analysis", props.PipeFID);
};

// AI智能修复按钮点击事件
const AIrepair = () => {
  emit("ai-repair", props.PipeFID);
};

watch(
  () => props.pipeData?.cz,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      triggerValueChangeAnimation(".mapping-row:nth-child(3) .value-item");
    }
  }
);

watch(
  () => props.pipeData?.gj,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      triggerValueChangeAnimation(".mapping-row:nth-child(4) .value-item");
    }
  }
);

watch(
  () => props.pipeData?.length,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      triggerValueChangeAnimation(".mapping-row:nth-child(5) .value-item");
    }
  }
);

watch(
  () => props.pipeData?.qdg,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      triggerValueChangeAnimation(".mapping-row:nth-child(6) .value-item");
    }
  }
);

watch(
  () => props.pipeData?.zdg,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      triggerValueChangeAnimation(".mapping-row:nth-child(7) .value-item");
    }
  }
);

watch(
  () => props.pipeData?.start_lon,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      triggerValueChangeAnimation(".mapping-row:nth-child(8) .value-item");
    }
  }
);

watch(
  () => props.pipeData?.start_lat,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      triggerValueChangeAnimation(".mapping-row:nth-child(9) .value-item");
    }
  }
);

watch(
  () => props.pipeData?.end_lon,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      triggerValueChangeAnimation(".mapping-row:nth-child(10) .value-item");
    }
  }
);

watch(
  () => props.pipeData?.end_lat,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      triggerValueChangeAnimation(".mapping-row:nth-child(11) .value-item");
    }
  }
);
</script>

<style scoped>
.draggable-card {
  position: absolute;
  width: 260px;
  background: rgba(23, 50, 88, 0.6);
  border: 1px solid rgba(214, 245, 255, 0.2);
  box-sizing: border-box;
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
  font-size: 15px;
  color: #ffffff;
  /* text-shadow: 0 0 5px rgba(25, 223, 18, 0.7); */
  font-family: "ALMMAVF";
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(248, 248, 248, 0.5);
  margin-bottom: 15px;
}

.card-header-text {
  letter-spacing: 1px;
  word-spacing: 4px;
  font-size: 16px;
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
  font-family: "ALMMAVF";
  font-weight: 600;
  color: #ffffff;
  animation: contentFadeIn 0.3s ease-out 0.2s both;
  font-size: 13px;
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

.mapping-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  opacity: 1;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(36, 104, 190, 0.06) 0%,
    rgba(0, 144, 211, 0.6) 105%
  );
  box-sizing: border-box;
  border: 0.81px solid rgba(65, 129, 225, 0.3);
  margin-bottom: 3px;
}

.header-item {
  flex: 1;
  text-align: center;
  font-size: 13px;
  font-weight: lighter;
}

.mapping-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(214, 245, 255, 0.2);
  max-height: 16px;
  font-size: 12px;
  border-radius: 5.04px;
}

.mapping-row:nth-child(odd) {
  background: rgba(79, 111, 120, 0.2);
}

.field-item,
.value-item {
  flex: 1;
  text-align: center;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 为值变化添加特殊的动画效果 */
.value-item.value-change-animation {
  animation: valueChange 0.5s ease-in-out;
}

@keyframes valueChange {
  0% {
    opacity: 0.5;
    transform: translateY(-5px) scale(0.95);
  }
  50% {
    opacity: 1;
    transform: translateY(2px) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.AI-analysis-button {
  width: 100%;
  height: 28px;
  background-image: url("@/assets/pngs/pipeUploadCard/mapping-button.png");
  background-size: 190px 26px;
  margin-left: 30px;
  background-repeat: no-repeat;
  border: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.AI-analysis-button:hover {
  transform: scale(1.05);
}

.AI-analysis-button:active {
  transform: scale(0.98);
}

.searching {
  animation: searchAnimation 1.5s linear infinite;
}

.repairing {
  animation: repairAnimation 2s ease-in-out infinite;
}

@keyframes searchAnimation {
  0% {
    transform: translate(0, -2px) scale(1.35);
  }
  25% {
    transform: translate(2px, 0px) scale(1.35);
  }
  50% {
    transform: translate(0, 2px) scale(1.35);
  }
  75% {
    transform: translate(-2px, 0px) scale(1.35);
  }
  100% {
    transform: translate(0, -2px) scale(1.35);
  }
}

@keyframes repairAnimation {
  0% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.6);
  }
  100% {
    transform: scale(1.2);
  }
}

.AI-analysis-button-text {
  font-size: 11px;
  color: #ffffff;
  font-family: "SHJGSK";
  font-weight: lighter;
  line-height: 22px;
  margin-left: 9px; /* 与图标保持间距 */
  margin-right: 12px;
}

.card-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}
</style>