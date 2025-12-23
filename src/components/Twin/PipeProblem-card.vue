<template>
  <div
    v-show="visible"
    class="draggable-card"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @mousedown="startDrag"
    ref="cardRef"
  >
    <div class="card-header">
      <span class="card-header-text">管网问题清单 </span>
      <button class="close-btn" @click="$emit('close')">✕</button>
    </div>

    <div class="card-body">
      <div class="mapping-header">
        <span class="header-item">缺陷管网ID</span>
        <span class="header-item">位置</span>
        <span class="header-item">缺陷名称</span>
        <span class="header-item">图例</span>
      </div>
      <transition-group name="row" tag="div">
        <div class="mapping-row" v-for="(item, index) in pipeProblemData" :key="item.fid || PipeProblemFID[index] || index" @click="handleRowClick(item, index)">
          <span class="value-item">{{ PipeProblemFID[index] || '未知ID' }}</span>
          <span class="value-item">{{ item.position || '未知位置' }}</span>
          <span class="value-item">{{ item.defectName || '未知缺陷' }}</span>
          <span class="value-item">
            <div class="color-circle" :style="{ backgroundColor: item.color || '#ccc' }"></div>
          </span>
        </div>
      </transition-group>
    </div>

    <div class="card-footer">
      
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
  PipeProblemFID: { type: Array, default: () => [] },
  pipeProblemData: { type: Array, default: () => [] },
  aiAnalysisTrigger: { type: Boolean, default: false },
  aiRepairTrigger: { type: Boolean, default: false },
});

const emit = defineEmits(["close", "ai-analysis", "ai-repair", "row-click"]);

const position = ref({ x: 150, y: 250 });
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

// 监听pipeProblemData变化，当数据添加或删除时为相应的行添加动画
watch(
  () => props.pipeProblemData,
  (newVal, oldVal) => {
    nextTick(() => {
      // 获取所有行元素
      const rows = document.querySelectorAll('.mapping-row');
      
      // 为新增的行添加入场动画
      if (newVal.length > oldVal.length) {
        // 新增的行通常是最后一行
        if (rows.length > 0) {
          const newRow = rows[rows.length - 1] as HTMLElement;
          if (newRow) {
            newRow.classList.remove('row-enter-animation');
            void newRow.offsetHeight; // 触发重排
            newRow.classList.add('row-enter-animation');
            
            // 1秒后移除动画类
            setTimeout(() => {
              newRow.classList.remove('row-enter-animation');
            }, 1000);
          }
        }
      }
      // 为删除的行添加离场动画
      else if (newVal.length < oldVal.length) {
        // 由于元素已经被删除，我们为容器添加整体动画
        const container = document.querySelector('.card-body') as HTMLElement;
        if (container) {
          container.classList.remove('value-change-animation');
          void container.offsetHeight; // 触发重排
          container.classList.add('value-change-animation');
          
          // 1秒后移除动画类
          setTimeout(() => {
            container.classList.remove('value-change-animation');
          }, 1000);
        }
      }
    });
  },
  { deep: true }
);

// 监听PipeProblemFID变化，当数据添加或删除时添加动画效果
watch(
  () => props.PipeProblemFID,
  (newVal, oldVal) => {
    if (newVal.length !== oldVal.length) {
      nextTick(() => {
        const container = document.querySelector(".card-body") as HTMLElement;
        container.classList.remove("value-change-animation");
        container.classList.remove("delete-animation");
        
        // 根据数据变化类型添加相应的动画类
        if (newVal.length < oldVal.length) {
          // 删除数据时添加删除动画类
          container.classList.add("value-change-animation");
          container.classList.add("delete-animation");
        } else {
          // 添加数据时添加普通动画类
          container.classList.add("value-change-animation");
        }

        // 强制重排，确保移除类后能重新触发动画
        container.offsetHeight; // 触发重排

        // 设置定时器在动画结束后移除类
        setTimeout(() => {
          container.classList.remove("value-change-animation");
          container.classList.remove("delete-animation");
        }, 500);
      });
    }
  },
  { deep: true }
);

// 监听值变化并触发动画
let animationTimeouts = [];

onBeforeUnmount(() => {
  // 清除所有待执行的定时器
  animationTimeouts.forEach((timeout) => clearTimeout(timeout));
});

// AI智能分析按钮点击事件
const AIanalysis = () => {
  emit("ai-analysis");
};

// AI智能修复按钮点击事件
const AIrepair = () => {
  emit("ai-repair");
};

// 处理行点击事件
const handleRowClick = (item: any, index: number) => {
  const fid = item.fid || props.PipeProblemFID[index] || null;
  if (fid) {
    emit("row-click", fid);
  }
};


</script>

<style scoped>
.draggable-card {
  position: absolute;
  width: 400px;
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

/* 问题清单区域动画效果 */
.card-body.value-change-animation {
  animation: problemListChange 0.8s ease-in-out;
}

@keyframes problemListChange {
  0% {
    opacity: 0.7;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 删除数据时的问题清单区域动画效果 */
.card-body.value-change-animation.delete-animation {
  animation: problemListDelete 0.5s ease-in-out;
}

@keyframes problemListDelete {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    opacity: 0.8;
    transform: scale(0.98);
  }
  60% {
    opacity: 0.6;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 单行删除动画 */
.mapping-row.v-leave-active {
  transition: all 0.1s ease;
}

.mapping-row.v-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.8);
}

/* 行入场动画效果 */
.row-enter-animation {
  animation: rowEnter 0.5s ease-out;
}

@keyframes rowEnter {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* transition-group动画类 */
.row-enter-active {
  transition: all 0.5s ease;
}

.row-leave-active {
  transition: all 0.3s ease;
}

.row-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.row-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.8);
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
  transition: all 0.3s ease;
}

.mapping-row:nth-child(odd) {
  background: rgba(79, 111, 120, 0.2);
}

.mapping-row:hover {
  background: rgba(0, 191, 255, 0.3);
  transform: translateX(2px);
}

.mapping-row:active {
  background: rgba(0, 191, 255, 0.5);
  transform: translateX(5px) scale(0.98);
  transition: all 0.1s ease;
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

.color-circle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(214, 245, 255, 0.5);
  box-shadow: 0 0 8px rgba(0, 191, 255, 0.8);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.color-circle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent 70%);
  opacity: 0.88;
}

.color-circle:hover {
  box-shadow: 0 0 12px rgba(0, 191, 255, 1);
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