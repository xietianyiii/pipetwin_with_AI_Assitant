<template>
  <div
    v-show="visible"
    class="draggable-card"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @mousedown="startDrag"
    ref="cardRef"
  >
    <div class="card-header">
      <span class="card-header-text">上传管网 </span>
      <button class="close-btn" @click="$emit('close')">✕</button>
    </div>

    <div class="card-body">
      <el-steps
        style="max-width: 600px"
        :space="280"
        :active="props.pipeUploadStepActive"
        align-center
        finish-status="success"
      >
        <el-step title="上传数据" />
        <el-step title="映射字段" />
        <el-step title="自动加载" />
      </el-steps>

      <transition name="slide-fade" mode="out-in">
        <el-upload
          class="pipe-upload-demo"
          drag
          action="http://127.0.0.1:3000/upload/"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :before-upload="beforeUpload"
          :auto-upload="false"
          :on-change="handleFileChange"
          :on-remove="handleFileRemove"
          multiple
          v-if="props.pipeUploadStepActive === 0"
          ref="pipeUpload"
          key="step-0"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖放到此处或 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="upload-footer">
              <div class="el-upload__tip">
                上传的shp文件需要包括prj、shp、shx、dbf文件
              </div>
              <!-- <el-button type="primary" @click="handleManualUpload">手动上传</el-button> -->

              <el-button
                v-show="isUploading"
                type="primary"
                size="small"
                :loading="isUploadLoading"
                @click="handleManualUpload"
                class="upload-button"
              >
                <svg
                  t="1760585811887"
                  class="icon dispatch-icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="95794"
                  width="30"
                  height="30"
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
              </el-button>
            </div>
          </template>
        </el-upload>

        <div v-else-if="props.pipeUploadStepActive === 1" key="step-1">
          <!-- 字段映射内容 -->
          <div class="field-mapping-container">
            <div class="mapping-header">
              <span class="header-item">映射字段</span>
              <span class="header-item">标准名称</span>
              <span class="header-item">用户字段</span>
            </div>
            <div
              class="mapping-row"
              v-for="(field, index) in fieldMappings"
              :key="index"
            >
              <span class="field-item">{{ field.name }}</span>
              <span class="standard-item">{{ field.standardName }}</span>
              <el-select
                class="input-item"
                v-model="field.mappedName"
                placeholder="请选择字段"
                size="small"
              >
                <el-option
                  v-for="fieldName in UserDatafieldNames"
                  :key="fieldName"
                  :label="fieldName"
                  :value="fieldName"
                />
              </el-select>
            </div>
            <div class="mapping-actions">
              <div class="mapping-button" @click="saveFieldMappings">
                <span class="mapping-button-text"> 保存映射 </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="props.pipeUploadStepActive === 2" key="step-2">
          <div class="loading-step-container">
            <el-slider
              class="loading-step-slider"
              v-model="loadingProgress"
              size="small"
              :show-tooltip="false"
            />
          </div>
        </div>

        <div v-else-if="props.pipeUploadStepActive === 3" key="step-3">
          <div class="completion-container">
            <div class="celebration-animation">
              <div class="checkmark">✓</div>
              <div class="completion-text">完成!</div>
            </div>
          </div>
        </div>
      </transition>
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
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import * as echarts from "echarts";

const props = defineProps({
  visible: { type: Boolean, default: false },
  pipeUploadStepActive: { type: Number, default: 0 }
});

const pipeUpload = ref(null);
const isUploading = ref(false);
const isUploadLoading = ref(false);

const loadingProgress = ref(0);

const UserDatafieldNames = ref<string[]>([]); // 存储字段名称数组

// 字段映射数据
const fieldMappings = ref([
  { name: "管道唯一ID", standardName: "PIPE_ID", mappedName: "" },
  { name: "材质", standardName: "MATERIAL", mappedName: "cz" },
  { name: "管径(mm)", standardName: "DIAMETER", mappedName: "gj" },
  { name: "长度(m)", standardName: "LENGTH", mappedName: "length" },
  { name: "拓扑方向", standardName: "FLOW", mappedName: "flow" },
  { name: "起点管井ID", standardName: "START_PIPE_ID", mappedName: "qdb" },
  { name: "终点管井ID", standardName: "END_PIPE_ID", mappedName: "zdb" },
  { name: "起点X坐标", standardName: "START_X", mappedName: "start_lon" },
  { name: "起点Y坐标", standardName: "START_Y", mappedName: "start_lat" },
  { name: "终点X坐标", standardName: "END_X", mappedName: "end_lon" },
  { name: "终点Y坐标", standardName: "END_Y", mappedName: "end_lat" },
]);

const emit = defineEmits(["close", "update:pipeUploadStepActive"]);

const position = ref({ x: 500, y: 300 });
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

// 监听步骤变化，当进入步骤2时启动定时器使loadingProgress按指定值增加
let progressInterval = null;
watch(() => props.pipeUploadStepActive, (newVal, oldVal) => {
  // 清除之前的定时器
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }

  // 如果进入步骤2，启动定时器
  if (newVal === 2) {
    // 重置进度
    loadingProgress.value = 0;

    // 定义目标值和对应的延迟时间（毫秒）
    const targets = [15, 40, 55, 80, 99, 100];
    const delays = [1000, 1200, 1000, 1500, 1500, 800]; // 每个阶段1.5秒
    let currentIndex = 0;

    const updateProgress = () => {
      if (currentIndex < targets.length) {
        loadingProgress.value = targets[currentIndex];
        currentIndex++;

        if (loadingProgress.value >= 100) {
          // 进度达到100时清除定时器
          clearInterval(progressInterval);
          progressInterval = null;
          // 确保最终值是整数100
          loadingProgress.value = 100;
          // 可以在这里添加完成后的逻辑
          emit("update:pipeUploadStepActive", 3);
        } else {
          // 设置下一个定时器
          setTimeout(updateProgress, delays[currentIndex - 1]);
        }
      }
    };

    // 启动第一个定时器
    setTimeout(updateProgress, delays[0]);
  }
});

// 上传成功回调
const handleUploadSuccess = (response: any, file: any) => {
  console.log("上传成功:", response);
  pipeUpload.value?.clearFiles();
  isUploading.value = false; // 上传成功后隐藏按钮
  emit("update:pipeUploadStepActive", 1); // 上传成功后进入Mapping步骤

  const filename = response.filename; // 获取上传的文件名
  axios
    .get(`http://localhost:3000/query_Fieldname/${filename}`)
    .then((res) => {
      console.log("字段名称:", res.data.fieldnames); // 处理返回的字段名称
      // 可以在这里处理返回的字段名称，展示在界面上等
      UserDatafieldNames.value = res.data.fieldnames;
    })
    .catch((error) => {
      console.error("查询字段名称失败:", error);
    });
};

// 上传失败回调
const handleUploadError = (error: any, file: any) => {
  console.log("上传失败:", error);
  // 可以在这里处理失败的逻辑
};

// 上传前的验证
const beforeUpload = (file: File) => {
  // 可以在这里进行文件大小、类型等验证
  console.log("文件信息:", file);
  if (file.size / 1024 / 1024 > 5) {
    alert("文件不能超过5MB");
    return false; // 返回 false 阻止上传
  }
  return true; // 返回 true 表示允许上传
};

// 处理文件选择变化
const handleFileChange = (file: any, fileList: any[]) => {
  // 只要 fileList 里有东西，就显示按钮
  isUploading.value = fileList.length > 0;
};

const handleFileRemove = (file: any, fileList: any[]) => {
  isUploading.value = fileList.length > 0;
};

const handleManualUpload = async () => {
  isUploadLoading.value = true;
  // 1秒后移除loading状态
  await new Promise((resolve) => setTimeout(resolve, 1000));
  isUploadLoading.value = false;
  if (pipeUpload.value) {
    pipeUpload.value.submit(); // 手动触发上传
  }
};

const saveFieldMappings = () => {
  console.log("保存字段映射:", fieldMappings.value);

  // 检查是否有未映射的字段
  const emptyMappings = fieldMappings.value.filter(
    (item) => !item.mappedName.trim()
  );

  if (emptyMappings.length > 0) {
    const emptyNames = emptyMappings.map((item) => item.name).join("、");
    ElMessage({
      message: `请检查以下字段的映射关系: ${emptyNames}`,
      type: "warning",
      duration: 5000,
    });
    return;
  }

  // 这里可以添加保存到服务器或本地存储的逻辑
  ElMessage({
    message: "字段映射已保存",
    type: "success",
    duration: 3000,
  });

  emit("update:pipeUploadStepActive", 2);
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
  font-size: 17px;
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

.field-mapping-container {
  margin-top: 20px;
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
  font-size: 10px;
  border-radius: 5.04px;
}

.mapping-row:nth-child(odd) {
  background: rgba(79, 111, 120, 0.2);
}

.field-item,
.standard-item {
  flex: 1;
  text-align: center;
  line-height: 16px;
}

.input-item {
  flex: 1;
  margin: 0 10px;
}

.mapping-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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

/* 步骤切换的过渡动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.row {
  margin-bottom: 8px;
  letter-spacing: 1.2px;
}

.upload-button {
  flex: 1;
  margin-top: 7.5px;
  max-width: 20px;
  padding: 5px 30px;
  font-family: "SHJGSK";
  background-color: rgba(40, 90, 104, 0.7);
  border: 1px solid rgba(170, 151, 151, 0.8);
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0, 191, 255, 0.5);
  transition: all 0.3s ease;
}

.upload-button:hover {
  background: radial-gradient(
    circle at 0% 60%,
    #509e9a 0%,
    #2f8ba7 60%,
    #26757e 100%
  );
  box-shadow: 0 0 10px rgba(0, 255, 255, 1);
}

.upload-button:active {
  transform: scale(0.95);
}

.pipe-upload-demo {
  background-color: transparent;
  margin-top: 15px;
}

.upload-footer {
  display: flex;
  justify-content: space-between; /* 左右分布 */
  align-items: center;
  width: 100%;
}

:deep(.el-upload-dragger) {
  background-color: transparent;
  height: 160px;
}

:deep(.el-upload__text) {
  font-size: 14px;
  color: #a8abb2;
}

:deep(.el-upload__tip) {
  font-size: 12px;
  color: #a8abb2;
}

:deep(.el-upload-list__item-file-name) {
  font-size: 12.5px;
  color: #a8abb2;
}

:deep(.el-input__wrapper) {
  background-color: rgba(28, 49, 77, 0.6) !important;
  border-top: 1px solid #1ebdd0 !important;
  border-bottom: 1px solid #1ebdd0 !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 6px !important;
  box-shadow: #b5bbda 0 0 3px !important;
  text-align: center !important;

  height: 14px !important;
}

:deep(.el-input__inner) {
  text-align: center !important;
  font-size: 10px !important;
  color: #ffffff !important;
}

.mapping-button {
  width: 260px;
  height: 28px;
  background-image: url("@/assets/pngs/pipeUploadCard/mapping-button.png");
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.mapping-button:hover {
  transform: scale(1.05);
}

.mapping-button:active {
  transform: scale(0.98);
}

.mapping-button-text {
  font-size: 11px;
  color: #ffffff;
  font-family: "SHJGSK";
  font-weight: lighter;
  line-height: 24px;
}

.mapping-row :deep(.el-select__wrapper) {
  background-color: rgba(28, 49, 77, 0.4) !important;
  border-top: 1px solid #1ebdd0 !important;
  border-bottom: 1px solid #1ebdd0 !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 6px !important;
  box-shadow: #b5bbda 0 0 3px !important;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
  height: 18px !important;
  min-height: 14px !important;
  max-width: 180px;
  text-align: center !important;
  line-height: 14px !important;
}

.mapping-row :deep(.el-select__wrapper .el-select__selected-item) {
  height: 14px !important;
  line-height: 14px !important;
  font-size: 10px !important;
}

.mapping-row :deep(.el-select__wrapper .el-select__caret) {
  height: 14px !important;
  line-height: 14px !important;
}

.mapping-row :deep(.el-select__wrapper:hover) {
  background-color: rgba(128, 136, 211, 0.8) !important;
}

.mapping-row :deep(.el-select__placeholder) {
  color: #ffffff !important;
  font-size: 10px !important;
}

:deep(.el-step__title.is-process) {
  color: #0af01dbd !important;
}

.loading-step-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 20px 0;
  transition: all 0.5s ease;
}

.loading-step-container :deep(.el-slider__button) {
  width: 18px;
  height: 18px;
  background-image: url("@/assets/pngs/pipetoolbar/el-select-button.png");
  background-size: contain;
  border: none;
  transition: all 0.5s ease;
}

.loading-step-container :deep(.el-slider__runway) {
  background: rgba(0, 16, 32, 0.2) !important;
  border-top: 1px solid #1ebdd0 !important;
  border-bottom: 1px solid #1ebdd0 !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 6px !important;
  box-shadow: #b5bbda 0 0 3px !important;
  height: 6px;
  transition: all 0.8s ease;
}

.loading-step-container :deep(.el-slider__bar) {
  background: rgba(5, 195, 243, 0.8) !important;
  transition: all 0.8s ease;
}

.loading-step-container :deep(.el-slider__button-wrapper) {
  transition: all 0.8s ease;
}

.completion-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  width: 100%;
}

.celebration-animation {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.checkmark {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4caf50;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: white;
  margin-bottom: 20px;
  animation: checkmark-pop 0.5s ease-out;
}

.completion-text {
  font-size: 20px;
  color: #4caf50;
  font-weight: bold;
  animation: text-pop 0.5s ease-out 0.2s forwards;
  opacity: 0;
}

@keyframes checkmark-pop {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes text-pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(160px) rotate(360deg);
    opacity: 0;
  }
}


</style>
