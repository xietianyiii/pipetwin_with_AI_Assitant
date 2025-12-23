<template>
  <div class="Header_mask">
    <img
      class="Header_mask_img"
      src="@/assets/pngs/pipetoolbar/Header_mask.png"
    />
  </div>
  <div class="pipe-toolbar">
    <!-- 左侧标题 -->
    <div class="toolbar-title">51管网工具</div>

    <!-- 分割线 -->
    <div class="divider"></div>

    <!-- 右侧图标区域 -->
    <div class="toolbar-icons">
      <!-- 图标1 -->
      <div
        class="icon-container"
        :class="{ 'icon-container-expanded': activeToolIndex === 0 }"
      >
        <div
          class="icon-wrapper"
          :class="{ active: activeToolIndex === 0 }"
          @click="() => handleFirstToolClick()"
        >
          <div
            class="icon"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/pngs/pipetoolbar/1.png"
              style="width: 28px; height: 28px"
            />
          </div>
        </div>
        <div v-if="activeToolIndex === 0" class="icon-extension">
          <div class="extension-content">
            <span class="extension-title" @click="handleDigCut">剖切</span>
            <div class="extension-divider"></div>
            <div class="label-icon" @click="handleResetDigCut">
              <img
                src="@/assets/pngs/pipetoolbar/label1.png"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 图标2 -->
      <div
        class="icon-container"
        :class="{ 'icon-container-expanded': activeToolIndex === 1 }"
      >
        <div
          class="icon-wrapper"
          :class="{ active: activeToolIndex === 1 }"
          @click="() => handleToolClick(1)"
        >
          <div
            class="icon"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/pngs/pipetoolbar/2.png"
              style="width: 28px; height: 28px"
            />
          </div>
        </div>
        <div v-if="activeToolIndex === 1" class="icon-extension">
          <div class="extension-content">
            <span class="extension-title" @click="handleLift">抬升</span>
            <div class="extension-divider"></div>
            <div class="label-icon" @click="handleResetElevation">
              <img
                src="@/assets/pngs/pipetoolbar/label2.png"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 图标3 -->
      <div
        class="icon-container"
        :class="{ 'icon-container-expanded': activeToolIndex === 2 }"
      >
        <div
          class="icon-wrapper"
          :class="{ active: activeToolIndex === 2 }"
          @click="() => handleToolClick(2)"
        >
          <div
            class="icon"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/pngs/pipetoolbar/3.png"
              style="width: 28px; height: 28px"
            />
          </div>
        </div>
        <div v-if="activeToolIndex === 2" class="icon-extension">
          <div class="extension-content">
            <span class="extension-title" @click="handlePipeLight">高亮</span>
            <div class="extension-divider"></div>
            <div class="label-icon" @click="handleResetPipeLight">
              <img
                src="@/assets/pngs/pipetoolbar/label2.png"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 图标4 -->
      <div
        class="icon-container"
        :class="{ 'icon-container-expanded': activeToolIndex === 3 }"
      >
        <div
          class="icon-wrapper"
          :class="{ active: activeToolIndex === 3 }"
          id="toggleVisibility"
          @click="() => handleToolClick(3)"
        >
          <div
            class="icon"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/pngs/pipetoolbar/4.png"
              style="width: 28px; height: 28px"
            />
          </div>
        </div>
        <div v-if="activeToolIndex === 3" class="icon-extension">
          <div class="extension-content">
            <span class="extension-title" @click="handlePipeVisible">显示</span>
            <div class="extension-divider"></div>
            <div class="label-icon" @click="handlePipeHidden">
              <img
                src="@/assets/pngs/pipetoolbar/label3.png"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 图标5 -->
      <div
        class="icon-container"
        :class="{ 'icon-container-expanded': isPipeLabelexpand }"
      >
        <div
          class="icon-wrapper"
          :class="{ active: isPipeLabelVisible }"
          @click="() => handleToolClick(4)"
        >
          <div
            class="icon"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/pngs/pipetoolbar/5.png"
              style="width: 28px; height: 28px"
            />
          </div>
        </div>
        <div v-if="isPipeLabelexpand" class="icon-extension">
          <div class="extension-content">
            <span class="extension-title-no-click">标签</span>
            <div class="extension-divider"></div>
            <div class="label-icon" @click="handleResetPipeLabel">
              <img
                src="@/assets/pngs/pipetoolbar/label1.png"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 图标6 -->
      <div
        class="icon-container"
        :class="{ 'icon-container-expanded': activeToolIndex === 5 }"
      >
        <div
          class="icon-wrapper"
          :class="{ active: activeToolIndex === 5 }"
          @click="() => handleToolClick(5)"
        >
          <div
            class="icon"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/pngs/pipetoolbar/6.png"
              style="width: 28px; height: 28px"
            />
          </div>
        </div>
        <div v-if="activeToolIndex === 5" class="icon-extension">
          <div class="extension-content">
            <span class="extension-title" @click="handleLiquidLevel">液位</span>
            <div class="extension-divider"></div>
            <div class="label-icon" @click="handleResetLiquidLevel">
              <img
                src="@/assets/pngs/pipetoolbar/label2.png"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 图标7 -->
      <div
        class="icon-container"
        :class="{ 'icon-container-expanded': activeToolIndex === 6 }"
      >
        <div
          class="icon-wrapper"
          :class="{ active: activeToolIndex === 6 }"
          @click="() => handleToolClick(6)"
        >
          <div
            class="icon"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/pngs/pipetoolbar/7.png"
              style="width: 28px; height: 28px"
            />
          </div>
        </div>
        <div v-if="activeToolIndex === 6" class="icon-extension">
          <div class="extension-content">
            <span class="extension-title" @click="handleFlowDirection"
              >流向</span
            >
            <div class="extension-divider"></div>
            <div class="label-icon" @click="handleResetFlowDirection">
              <img
                src="@/assets/pngs/pipetoolbar/label2.png"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 图标8 -->
      <div
        class="icon-container"
        :class="{ 'icon-container-expanded': activeToolIndex === 7 }"
      >
        <div
          class="icon-wrapper"
          :class="{ active: activeToolIndex === 7 }"
          @click="() => handleToolClick(7)"
        >
          <div
            class="icon"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/pngs/pipetoolbar/8.png"
              style="width: 28px; height: 28px"
            />
          </div>
        </div>
        <div v-if="activeToolIndex === 7" class="icon-extension">
          <div class="extension-content">
            <span class="extension-title" @click="handleSpeEffect">冒溢</span>
            <div class="extension-divider"></div>
            <div class="label-icon" @click="handleResetSpeEffect">
              <img
                src="@/assets/pngs/pipetoolbar/label1.png"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 图标9 -->
      <div
        class="icon-container"
        :class="{ 'icon-container-expanded': showPipeUploadCardExpand }"
      >
        <div
          class="icon-wrapper"
          :class="{ active: props.showPipeUploadCard }"
          @click="handlePipeUpload"
        >
          <div
            class="icon"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/pngs/pipetoolbar/9.png"
              style="width: 28px; height: 28px"
            />
          </div>
        </div>
        <div v-if="showPipeUploadCardExpand" class="icon-extension">
          <div class="extension-content">
            <span class="extension-title-no-click">上传</span>
            <div class="extension-divider"></div>
            <div class="label-icon" @click="handleResetPipeUpload">
              <img
                src="@/assets/pngs/pipetoolbar/label2.png"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 图标10 -->
      <div
        class="icon-container"
        :class="{ 'icon-container-expanded': isPipeEditorExpand }"
      >
        <div
          class="icon-wrapper"
          :class="{ active: isPipeEditorEnable }"
          @click="() => handleToolClick(9)"
        >
          <div
            class="icon"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/pngs/pipetoolbar/10.png"
              style="width: 28px; height: 28px"
            />
          </div>
        </div>
        <div v-if="isPipeEditorExpand" class="icon-extension">
          <div class="extension-content">
            <span class="extension-title-no-click">编辑</span>
            <div class="extension-divider"></div>
            <div class="label-icon">
              <img
                src="@/assets/pngs/pipetoolbar/label4.png"
                style="width: 18px; height: 18px"
              />
            </div>
          </div>
        </div>
      </div>

      <transition name="fade-card">
        <div
          v-if="
            activeToolIndex === 1 ||
            activeToolIndex === 2 ||
            activeToolIndex === 3 ||
            activeToolIndex === 5 ||
            activeToolIndex === 6
          "
          class="pipe-toolbar-attri-card"
          :style="{ left: `${toolLeftOffset}px` }"
        >
          <!-- PNG 背景 -->
          <img
            class="pipe-toolbar-attri-card_bg"
            src="@/assets/pngs/pipetoolbar/pipe_attri_card.png"
            :style="{ height: activeToolIndex === 6 ? '151px' : '108px' }"
          />

          <!-- 卡片内容（叠加在 PNG 上） -->
          <div class="pipe-toolbar-attri-card_content">
            <div v-if="activeToolIndex === 1" class="elevation-box">
              <div class="light-row">
                <label class="light-label">管网类型：</label>
                <el-select
                  v-model="hightPieType"
                  placeholder="请选择管网类型"
                  class="light-select"
                  size="small"
                >
                  <el-option label="雨水管线" value="rain_line" />
                  <el-option label="污水管线" value="sewage_line" />
                  <el-option label="雨水管井" value="rain_node" />
                  <el-option label="污水管井" value="sewage_node" />
                </el-select>
              </div>

              <div class="light-row">
                <label class="light-label">高度：</label>
                <div class="custom-number">
                  <div
                    class="elevation-num-input-btn"
                    @click="
                      elevationValue = (
                        parseFloat(elevationValue) - 0.5
                      ).toString()
                    "
                  >
                    <img
                      src="@/assets/pngs/pipetoolbar/num_input_decrease.png"
                      style="width: 24px; height: 24px"
                    />
                  </div>

                  <el-input
                    v-model="elevationValue"
                    style="width: 100px; height: 24px"
                  />

                  <div
                    class="elevation-num-input-btn"
                    @click="
                      elevationValue = (
                        parseFloat(elevationValue) + 0.5
                      ).toString()
                    "
                  >
                    <img
                      src="@/assets/pngs/pipetoolbar/num_input_increase.png"
                      style="width: 24px; height: 24px"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeToolIndex === 2" class="light-box">
              <div class="light-row">
                <label class="light-label">管网类型：</label>
                <el-select
                  v-model="lightPieType"
                  placeholder="请选择管网类型"
                  class="light-select"
                  size="small"
                >
                  <el-option label="雨水管线" value="rain_line" />
                  <el-option label="污水管线" value="sewage_line" />
                  <el-option label="雨水管井" value="rain_node" />
                  <el-option label="污水管井" value="sewage_node" />
                </el-select>
              </div>

              <div class="light-row">
                <label class="light-label">亮度：</label>
                <el-slider
                  v-model="lightIntensity"
                  size="small"
                  :show-tooltip="false"
                />

                <el-color-picker
                  v-model="lightColor"
                  show-alpha
                  color-format="hex"
                  size="small"
                />
              </div>
            </div>

            <div v-if="activeToolIndex === 3" class="light-box">
              <div class="light-row">
                <label class="light-label">管网类型：</label>
                <el-select
                  v-model="visiblePieType"
                  placeholder="请选择管网类型"
                  class="light-select"
                  size="small"
                >
                  <el-option label="雨水管线" value="rain_line" />
                  <el-option label="污水管线" value="sewage_line" />
                  <el-option label="雨水管井" value="rain_node" />
                  <el-option label="污水管井" value="sewage_node" />
                </el-select>
              </div>

              <div class="light-row">
                <label class="light-label">特定管段：</label>
                <el-input-tag
                  v-model="visiblePipeIds"
                  collapse-tags
                  collapse-tags-tooltip
                  max-collapse-tags="1"
                  tag-type="info"
                  tag-effect="dark"
                  clearable
                  size="small"
                  placeholder="请输入指定管段的ID"
                  aria-label="Please click the Enter key after input"
                />
              </div>
            </div>

            <div v-if="activeToolIndex === 5" class="light-box">
              <div class="light-row">
                <label class="light-label">管网类型：</label>
                <el-select
                  v-model="liquidPipeType"
                  placeholder="请选择管网类型"
                  class="light-select"
                  size="small"
                >
                  <el-option label="雨水管线" value="rain_line" />
                  <el-option label="污水管线" value="sewage_line" />
                  <el-option label="雨水管井" value="rain_node" />
                  <el-option label="污水管井" value="sewage_node" />
                </el-select>
              </div>

              <div class="light-row">
                <label class="light-label">液位高度：</label>
                <div class="custom-number">
                  <div
                    class="elevation-num-input-btn"
                    @click="
                      liquidLevel = (
                        Math.round((parseFloat(liquidLevel) - 0.2) * 10) / 10
                      ).toFixed(1)
                    "
                  >
                    <img
                      src="@/assets/pngs/pipetoolbar/num_input_decrease.png"
                      style="width: 24px; height: 24px"
                    />
                  </div>

                  <el-input
                    v-model="liquidLevel"
                    style="width: 100px; height: 24px"
                  />

                  <div
                    class="elevation-num-input-btn"
                    @click="
                      liquidLevel = (
                        Math.round((parseFloat(liquidLevel) + 0.2) * 10) / 10
                      ).toFixed(1)
                    "
                  >
                    <img
                      src="@/assets/pngs/pipetoolbar/num_input_increase.png"
                      style="width: 24px; height: 24px"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeToolIndex === 6" class="light-box">
              <div class="light-row">
                <label class="light-label">管网类型：</label>
                <el-select
                  v-model="flowPieType"
                  placeholder="请选择管网类型"
                  class="light-select"
                  size="small"
                >
                  <el-option label="雨水管线" value="rain_line" />
                  <el-option label="污水管线" value="sewage_line" />
                </el-select>
              </div>

              <div class="light-row">
                <label class="light-label">流向样式：</label>
                <el-select
                  v-model="flowStyle"
                  placeholder="请选择流向样式"
                  class="light-select"
                  size="small"
                >
                  <el-option label="样式1" value="0" />
                  <el-option label="样式2" value="1" />
                  <el-option label="样式3" value="2" />
                </el-select>
              </div>

              <div class="light-row">
                <label class="light-label">流向方向：</label>
                <el-select
                  v-model="flowDirection"
                  placeholder="请选择流向方向"
                  class="light-select"
                  size="small"
                >
                  <el-option label="正向" value="1" />
                  <el-option label="反向" value="0" />
                </el-select>

                <el-color-picker
                  v-model="flowColor"
                  show-alpha
                  color-format="hex"
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <div class="bottom-icon-container">
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { ElMessage } from "element-plus";
import type { TagProps } from "element-plus";

const hightPieType = ref("rain_line");
const elevationValue = ref("15");
const lightPieType = ref("rain_line");
const lightIntensity = ref(50);
const lightColor = ref("");
const liquidPipeType = ref("rain_line");
const liquidLevel = ref("1.0");
const liquidColor = ref("#00BFFF");
const flowPieType = ref("rain_line");
const flowStyle = ref("0");
const flowDirection = ref("1");
const flowColor = ref("");
const visiblePieType = ref("rain_line");
const visiblePipeIds = ref<string[]>([]);

const toolLeftOffset = computed(() => {
  const itemWidth = 55; // 每个图标容器的宽度（包括gap）
  const offset = 20; // 工具栏左侧内边距
  return activeToolIndex.value !== null
    ? activeToolIndex.value * itemWidth + offset
    : 0;
});

const activeToolIndex = ref<number | null>(null);
const isVisibilityToolActive = ref(false); // 单独跟踪显示/隐藏图标的active状态

const props = defineProps({
  showPipeUploadCard: { type: Boolean, default: false },
});

const showPipeUploadCardExpand = ref(false);

// 监听props.showPipeUploadCard的变化
watch(
  () => props.showPipeUploadCard,
  (newValue) => {
    if (!newValue) {
      showPipeUploadCardExpand.value = false;
    }
  }
);

const toolActions = [
  // 对应第 0 个图标：显示“剖切”和“重置”
  [
    { label: "剖切", action: () => handleDigCut() },
    { label: "关闭", action: () => handleResetDigCut() },
  ],
  // 对应第 1 个图标：显示“抬升”和“重置”
  [
    { label: "抬升", action: () => handleLift() },
    { label: "重置", action: () => handleResetElevation() },
  ],
  // 第 2 个图标：不显示任何子按钮
  [
    { label: "高亮", action: () => handlePipeLight() },
    { label: "重置", action: () => handleResetPipeLight() },
  ],
  // 第 3 个图标：不显示任何子按钮
  [
    { label: "显示", action: () => handlePipeVisible() },
    { label: "隐藏", action: () => handlePipeHidden() },
  ],
  [
    { label: "液位", action: () => handleLiquidLevel() },
    { label: "重置", action: () => handleResetLiquidLevel() },
  ],
  [
    { label: "流向", action: () => handleFlowDirection() },
    { label: "重置", action: () => handleResetFlowDirection() },
  ],
  [
    { label: "冒溢", action: () => handleSpeEffect() },
    { label: "重置", action: () => handleResetSpeEffect() },
  ],
];

// 定义事件，用于更新父组件中的状态
const emit = defineEmits<{
  (e: "update:isDraCard2CloseButtonVisible", value: boolean): void;
  (e: "update:isDraCard3CloseButtonVisible", value: boolean): void;
  (e: "update:isDraCard4CloseButtonVisible", value: boolean): void;
  (e: "update:showPipeUploadCard", value: boolean): void;
  (e: "create-poi"): void;
  (e: "delete-poi"): void;
  (e: "create-shp-area"): void;
  (e: "delete-shp-area"): void;
  (e: "create-sewage-tp"): void;
  (e: "create-pipeline"): void;
  (e: "clear-pipeline"): void;
  (e: "digClicked"): void;
  (e: "digcutClicked"): void;
  (e: "resetdigcutClicked"): void;
  (e: "pipeliftClicked", type: string, height: string): void;
  (e: "resetpipeliftClicked"): void;
  (e: "pipelightClicked", type: string, intensity: number, color: string): void;
  (e: "resetpipelightClicked"): void;
  (e: "liquidlevelClicked", type: string, level: number, color: string): void;
  (e: "resetliquidlevelClicked"): void;
  (
    e: "pipevisibilityToggled",
    visible: boolean,
    pipeType: string,
    pipeIds: string[]
  ): void;
  (
    e: "flowdirectionClicked",
    type: string,
    direction: string,
    style: string,
    color: string
  ): void;
  (e: "resetflowdirectionClicked"): void;
  (e: "pipSpeEffectClicked"): void;
  (e: "resetSpeEffectClicked"): void;
  (e: "resetPipeUploadClicked"): void;
  (
    e: "dra-defect-row-click",
    defect: { id: string; location: string; name: string }
  ): void;
  (e: "pipeLabelToggled", visible: boolean): void;
  (e: "pipeEditorToggled", enabled: boolean): void;
}>();

const handleDigCut = () => {
  emit("digcutClicked");
};

const handleResetDigCut = () => {
  emit("resetdigcutClicked");
};

const handleLift = () => {
  const toggleBtn = document.getElementById("toggleVisibility");
  if (toggleBtn) {
    toggleBtn.classList.add("active");
  }
  emit("pipeliftClicked", hightPieType.value, elevationValue.value);
};

const handleResetElevation = () => {
  emit("resetpipeliftClicked");
};

const handlePipeLight = () => {
  emit(
    "pipelightClicked",
    lightPieType.value,
    lightIntensity.value,
    lightColor.value
  );
};

const handleResetPipeLight = () => {
  emit("resetpipelightClicked");
};

const handlePipeVisible = () => {
  // 确保图标保持active状态
  isVisibilityToolActive.value = true;
  emit(
    "pipevisibilityToggled",
    true,
    visiblePieType.value,
    visiblePipeIds.value
  );
};

const handlePipeHidden = () => {
  // 确保图标保持active状态
  isVisibilityToolActive.value = false;
  // 同时关闭右侧的弹窗
//   activeToolIndex.value = null;
  emit(
    "pipevisibilityToggled",
    false,
    visiblePieType.value,
    visiblePipeIds.value
  );
};

const handleLiquidLevel = () => {
  emit(
    "liquidlevelClicked",
    liquidPipeType.value,
    parseFloat(liquidLevel.value),
    liquidColor.value
  );
};

const handleResetLiquidLevel = () => {
  emit("resetliquidlevelClicked");
};

const handleFlowDirection = () => {
  emit(
    "flowdirectionClicked",
    flowPieType.value,
    flowDirection.value,
    flowStyle.value,
    flowColor.value
  );
};

const handleResetFlowDirection = () => {
  emit("resetflowdirectionClicked");
};

const handleSpeEffect = () => {
  emit("pipSpeEffectClicked");
};

const handleResetSpeEffect = () => {
  emit("resetSpeEffectClicked");
};

const handleResetPipeLabel = () => {
  isPipeLabelexpand.value = !isPipeLabelexpand.value;
  isPipeLabelVisible.value = false;
  emit("pipeLabelToggled", isPipeLabelVisible.value);
};

const handleResetPipeUpload = () => {
  emit("resetPipeUploadClicked");
};

const handleToolClick = (index: number) => {
  // 如果是第5个图标（索引为4），特殊处理管网标签切换
  if (index === 4) {
    activeToolIndex.value = null;
    isPipeLabelexpand.value = !isPipeLabelexpand.value;
    isPipeEditorExpand.value = false;
    isPipeLabelVisible.value = true;
    emit("pipeLabelToggled", isPipeLabelVisible.value);
    return;
  }

  if (index === 9) {
    activeToolIndex.value = null;
    isPipeLabelexpand.value = false;
    isPipeEditorExpand.value = !isPipeEditorExpand.value;
    isPipeEditorEnable.value = true;

    emit("pipeEditorToggled", isPipeEditorEnable.value);
    return;
  }else {
    // 其他图标按原有逻辑处理，但不影响显示/隐藏图标的active状态
    isPipeLabelexpand.value = false;
    isPipeEditorExpand.value = false;
    activeToolIndex.value = activeToolIndex.value === index ? null : index;
  }

//   // 如果是第3个图标（显示/隐藏切换图标），使用单独的状态管理
//   if (index === 3) {
//     isPipeLabelexpand.value = false;
//     isPipeEditorExpand.value = false;
//     // 设置显示/隐藏图标为active状态（不会切换为非active）
//     isVisibilityToolActive.value = true;
//     // 同时更新activeToolIndex以显示子菜单
//     activeToolIndex.value = activeToolIndex.value === index ? null : index;
//   } 
};

const handleFirstToolClick = () => {
  // 执行原有的工具点击处理逻辑
  handleToolClick(0);

  if (activeToolIndex.value === 0) {
    ElMessage.primary("请在场景中点击取点");
    // 通知父组件点击了开挖按钮
    emit("digClicked");
  }
};

const handlePipeUpload = () => {
  activeToolIndex.value = null;
  showPipeUploadCardExpand.value = !showPipeUploadCardExpand.value;
  emit("update:showPipeUploadCard", !props.showPipeUploadCard);
};

const position = ref({ x: 1200, y: 750 }); // 默认位置（可以调）
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
const cardRef = ref<HTMLElement | null>(null);

const startDrag = (e: MouseEvent) => {
  if (!cardRef.value) return;
  isDragging.value = true;
  offset.value.x = e.clientX - position.value.x;
  offset.value.y = e.clientY - position.value.y;
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;
  position.value.x = e.clientX - offset.value.x;
  position.value.y = e.clientY - offset.value.y;
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

// 管网标签显示状态
const isPipeLabelVisible = ref<boolean>(false);
const isPipeLabelexpand = ref<boolean>(false);
// 管网编辑状态
const isPipeEditorEnable = ref<boolean>(false);
const isPipeEditorExpand = ref<boolean>(false);

onMounted(() => {
  // 获取元素
  const toolbar = document.querySelector(".toolbar") as HTMLElement;
  const upButton = document.getElementById("upButton");
  const downButton = document.getElementById("downButton");

  // 向上按钮点击事件 - 隐藏工具条
  upButton?.addEventListener("click", () => {
    // 向上滑动隐藏，滑出页面
    toolbar.style.transform = "translateY(-90vh)";
    upButton.style.transform = "translateY(-90vh)";

    // 显示向下按钮 - 延迟显示
    if (downButton) {
      setTimeout(() => {
        downButton.classList.remove("hidden");
      }, 150);
    }
  });

  // 向下按钮点击事件 - 显示工具条
  downButton?.addEventListener("click", () => {
    // 向下滑动显示
    toolbar.style.transform = "translateY(-50%)";
    // 重置向上按钮的transform，让它回到CSS定义的位置
    if (upButton) {
      upButton.style.transform = "";
    }

    // 隐藏向下按钮
    if (downButton) {
      downButton.classList.add("hidden");
    }
  });
});
</script>


<style scoped>
.Header_mask_img {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1920px;
  height: 100px;
  opacity: 1;
}

.pipe-toolbar {
  position: fixed;
  top: 5.5%;
  left: 2%; /* 你想固定左侧位置 */
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  height: 60px;
  border-radius: 40px;
  background: rgba(17, 32, 53, 0.6);
  padding: 0 20px;
  box-sizing: border-box;
  border: none;
  pointer-events: auto;
  box-shadow: 0 2px 0 0 rgba(112, 185, 255, 0.6),
    0 2px 10px rgba(112, 185, 255, 0.6);
  transition: width 0.3s ease;
}

.toolbar-title {
  font-size: 16px;
  color: white;
  margin-right: 20px;
  user-select: none;
}

.divider {
  width: 2px;
  height: 30px;
  background: rgba(150, 215, 255, 0.4);
  margin-right: 20px;
}

.toolbar-icons {
  display: flex;
  gap: 15px;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s ease;
  background: rgba(47, 127, 191, 0.6);
  user-select: none;
  flex-shrink: 0;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 4px 0px #c1f5ff, 0 0 0 1px rgba(150, 215, 255, 0.8),
    0 0 8px rgba(150, 215, 255, 0.6);
}

.icon-wrapper:hover {
  background: linear-gradient(
      0deg,
      rgba(73, 106, 255, 0.8) 0%,
      rgba(57, 221, 197, 0.8) 100%
    ),
    linear-gradient(
      180deg,
      rgba(25, 240, 254, 0) 5%,
      rgba(25, 254, 246, 0.3) 99%
    ),
    linear-gradient(0deg, rgba(23, 50, 88, 0.2987) -11%, #22579f 100%),
    rgba(23, 50, 88, 0.1);

  box-sizing: border-box;
  box-shadow: inset 0px 0px 4px 0px #c1f5ff, 0 0 0 1px rgba(199, 234, 255, 0.8),
    0 0 12px rgba(199, 234, 255, 0.8);
  transform: scale(1.02);
}

.icon-wrapper:active {
  transform: scale(0.95);
}

.icon-wrapper.active {
  background: linear-gradient(
      0deg,
      rgba(73, 106, 255, 0.8) 0%,
      rgba(57, 221, 197, 0.8) 100%
    ),
    linear-gradient(
      180deg,
      rgba(25, 240, 254, 0) 5%,
      rgba(25, 254, 246, 0.3) 99%
    ),
    linear-gradient(0deg, rgba(23, 50, 88, 0.2987) -11%, #22579f 100%),
    rgba(23, 50, 88, 0.1);
  box-shadow: inset 0px 0px 4px 0px #c1f5ff, 0 0 12px rgba(199, 234, 255, 0.8);
  border: 1px solid rgba(199, 234, 255, 0.8);
}

/* 图标容器 */
.icon-container {
  display: flex;
  align-items: center;
  width: 40px;
  border-radius: 20px;
  background: rgba(23, 50, 88, 0.6);
  box-sizing: border-box;
  box-shadow: 0 0 0 1px rgba(150, 215, 255, 0.8),
    0 2px 0 0 rgba(112, 185, 255, 0.6), 0 2px 10px rgba(112, 185, 255, 0.6);
  transition: width 0.3s ease;
}

/* 图标容器展开状态 */
.icon-container.icon-container-expanded {
  width: 130px;
}

/* 图标容器显示状态 */
.icon-container.show {
  opacity: 1;
  transform: scale(1);
}

/* 扩展矩形 */
.icon-extension {
  display: flex;
  align-items: center;
}

.extension-content {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}

.extension-title {
  color: white;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  text-align: center;
}

.extension-title-no-click {
  color: white;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  cursor: default;
  user-select: none;
  transition: all 0.3s ease;
  text-align: center;
}

.extension-title:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.extension-title:active {
  transform: translateY(1px);
  transition: all 0.1s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.extension-divider {
  width: 1px;
  height: 20px;
  background: rgba(150, 215, 255, 0.4);
  margin: 0 10px;
}

.label-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.label-icon:hover {
  transform: scale(1.1);
}

.label-icon:active {
  transform: scale(0.95);
  transition: all 0.1s ease;
}

.pipe-toolbar-attri-card {
  position: fixed;
  left: calc(60px);
  transform: translateX(42%);
  transition: opacity 0.3s;
  z-index: 1001;
  top: 120%;
  border-radius: 16px;
  opacity: 1;
  transition: all 0.3s ease;
}

.pipe-toolbar-attri-card_bg {
  display: block;
  width: 290px; /* PNG 原始大小 */
  height: 108px;
  pointer-events: none; /* 让 PNG 不挡住内部交互 */
}

.pipe-toolbar-attri-card_content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 进入中、离开中的通用过渡 */
.fade-card-enter-active,
.fade-card-leave-active {
  transition: all 0.25s ease;
}

/* 初始状态：开始进入时 */
.fade-card-enter-from {
  opacity: 0;
  transform: translateX(42%) translateY(6px) scale(0.98);
}

/* 结束状态：进入完成时 */
.fade-card-enter-to {
  opacity: 1;
  transform: translateX(42%) translateY(0) scale(1);
}

/* 开始离开时 */
.fade-card-leave-from {
  opacity: 1;
  transform: translateX(42%) translateY(0) scale(1);
}

/* 离开结束时 */
.fade-card-leave-to {
  opacity: 0;
  transform: translateX(42%) translateY(6px) scale(0.98);
}

.elevation-box,
.light-box {
  display: flex;
  flex-direction: column;
  padding: 16px 0px;
  user-select: none;
}

.light-row {
  display: flex;
  align-items: stretch;
  gap: 18px;
  padding: 8px 25px;
  border-radius: 8px;
  backdrop-filter: blur(2px);
}

.light-label {
  color: white;
  font-size: 14px;
  min-width: 70px;
}

.light-row :deep(.el-select__wrapper) {
  background-color: rgba(28, 49, 77, 0.6) !important;
  border-top: 1px solid #1ebdd0 !important;
  border-bottom: 1px solid #1ebdd0 !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 6px !important;
  box-shadow: #b5bbda 0 0 3px !important;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
  height: 24px;
  max-width: 180px;
}

.light-row :deep(.el-select__wrapper:hover) {
  background-color: rgba(128, 136, 211, 0.8) !important;
}

.light-row :deep(.el-select__placeholder) {
  color: #ffffff !important;
  font-size: 12px !important;
}

.light-row :deep(.el-input__wrapper) {
  background-color: rgba(28, 49, 77, 0.6) !important;
  border-top: 1px solid #1ebdd0 !important;
  border-bottom: 1px solid #1ebdd0 !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 6px !important;
  box-shadow: #b5bbda 0 0 3px !important;
  text-align: center !important;
}

.light-row :deep(.el-input__inner) {
  text-align: center !important;
  font-size: 13px !important;
  color: #ffffff !important;
}

.custom-number {
  display: flex;
  align-items: stretch;
  gap: 10px;
  max-width: 152px;
}

.elevation-num-input-btn:hover {
  transform: scale(1.1);
  cursor: pointer;
  filter: brightness(1.2);
  transition: all 0.2s ease-in-out;
}

.elevation-num-input-btn:active {
  transform: scale(0.95);
  filter: brightness(0.8);
  transition: all 0.1s ease-in-out;
}

.light-row :deep(.el-slider__button) {
  width: 14px;
  height: 14px;
  background-image: url("@/assets/pngs/pipetoolbar/el-select-button.png");
  background-size: contain;
  border: none;
}

.light-row :deep(.el-slider__runway) {
  background: rgba(0, 16, 32, 0.2) !important;
  border-top: 1px solid #1ebdd0 !important;
  border-bottom: 1px solid #1ebdd0 !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 6px !important;
  box-shadow: #b5bbda 0 0 3px !important;
  height: 5px;
}

.light-row :deep(.el-slider__bar) {
  background: rgba(37, 35, 35, 0.25) !important;
}

.light-row :deep(.el-color-picker__trigger) {
  width: 24px;
  height: 24px;
  background-image: url("@/assets/pngs/pipetoolbar/el-color-select.png");
  background-size: contain;
  border: none;
}

.light-row :deep(.el-color-picker__trigger .el-color-picker__color svg) {
  display: none; /* 隐藏内部 SVG */
}

.light-row :deep(.el-color-picker__trigger .el-color-picker__color) {
  width: 12px;
  height: 12px;
  background-image: url("@/assets/pngs/pipetoolbar/el-color-svg1.png");
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
}

:deep(.el-input-tag__wrapper) {
  background-color: rgba(28, 49, 77, 0.6) !important;
  border-top: 1px solid #1ebdd0 !important;
  border-bottom: 1px solid #1ebdd0 !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 6px !important;
  box-shadow: #b5bbda 0 0 3px !important;
  text-align: center !important;
  max-height: 20px;
  padding: 0px 6px;
}

.light-row :deep(.el-tag__content) {
  font-size: 10px !important;
  color: #e9d9d9 !important;
}

.light-row :deep(.el-tag) {
  font-size: 10px !important;
  color: #a32d2d !important;
  background-color: rgba(47, 127, 191, 0.6) !important;
  height: 12px;
}
</style>