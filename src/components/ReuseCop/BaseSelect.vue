<template>
  <div class="base-select" ref="root">
    <!-- 触发器：74*16 容器 -->
    <div class="trigger" :class="{ open: isOpen, disabled: disabled }" @click="toggle">
      <!-- 左侧：文本 + 折叠tag -->
      <div class="left">
        <!-- 单选 -->
        <template v-if="!isMultiple">
          <span class="text" :class="{ placeholder: !selectedLabel }">
            {{ selectedLabel || placeholder }}
          </span>
        </template>

        <!-- 多选：第一个正常显示，剩余折叠成 +N -->
        <template v-else>
          <span class="text" :class="{ placeholder: selectedAllLabels.length === 0 }">
            {{ selectedAllLabels.length ? selectedAllLabels[0] : placeholder }}
          </span>

          <span v-if="extraCount > 0" class="tag-wrapper">
            <span class="tag">+{{ extraCount }}</span>

            <!-- hover 查看具体 -->
            <div class="tooltip" v-if="collapseTagsTooltip">
              <div class="tooltip-item" v-for="(t, i) in selectedAllLabels" :key="i">
                {{ t }}
              </div>
            </div>
          </span>
        </template>
      </div>

      <!-- 倒三角 -->
      <svg
        class="arrow"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width="9.024999618530273"
        height="5.300000190734863"
        viewBox="0 0 9.024999618530273 5.300000190734863"
      >
        <path
          d="M8.8249998,0.19999981C8.6750002,0.049999714,8.4749994,0,8.2749996,0L0.77499986,0.050000191C0.57500005,0.050000191,0.37499976,0.10000038,0.2249999,0.25C-0.075000048,0.55000019,-0.075000048,1,0.2249999,1.3000002L3.9749997,5.0500002C4.0249996,5.1000004,4.125,5.1500006,4.1749992,5.1999998C4.1749992,5.1999998,4.2249994,5.25,4.2249994,5.25C4.4749994,5.3500004,4.8249998,5.3000002,5.0249996,5.1000004L8.7749996,1.3000002C9.125,0.94999981,9.0749998,0.5,8.8249998,0.19999981Z"
          fill="#ADCBE7"
          fill-opacity="1"
        />
      </svg>
    </div>

    <!-- 下拉选项 -->
    <Transition name="fade">
      <div v-if="isOpen" class="dropdown">
        <div
          v-for="opt in options"
          :key="opt.value"
          class="option"
          :class="{ active: isSelected(opt.value) }"
          @click="select(opt)"
        >
          {{ opt.label }}
        </div>

        <div v-if="!options.length" class="empty">暂无选项</div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue"

type Value = string | number
type Option = { label: string; value: Value }

const props = defineProps<{
  modelValue: Value | Value[] | null
  options: Option[]
  placeholder?: string
  disabled?: boolean
  /** 你要求：添加后开启多选，并支持折叠 + tooltip */
  collapseTagsTooltip?: boolean
}>()

const emit = defineEmits<{
  (e: "update:modelValue", v: Value | Value[] | null): void
  (e: "change", v: Value | Value[] | null): void
}>()

const placeholder = computed(() => props.placeholder ?? "请选择")
const disabled = computed(() => !!props.disabled)
const collapseTagsTooltip = computed(() => !!props.collapseTagsTooltip)

/** 你定义：加了 collapse-tags-tooltip 就开启多选 */
const isMultiple = computed(() => collapseTagsTooltip.value)

const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)

/** 多选值数组 */
const selectedValues = computed<Value[]>(() => {
  if (!isMultiple.value) return []
  return Array.isArray(props.modelValue) ? props.modelValue : []
})

/** 单选 label */
const selectedLabel = computed(() => {
  if (isMultiple.value) return ""
  const mv = props.modelValue
  const hit = props.options.find((o) => o.value === mv)
  return hit?.label ?? ""
})

/** 多选：按当前选中值顺序映射 label（找不到就用 value 字符串） */
const selectedAllLabels = computed(() => {
  const map = new Map<Value, string>()
  props.options.forEach((o) => map.set(o.value, o.label))
  return selectedValues.value.map((v) => map.get(v) ?? String(v))
})

/** 多选：折叠计数 = 总数 - 1 */
const extraCount = computed(() => Math.max(0, selectedAllLabels.value.length - 1))

function toggle() {
  if (disabled.value) return
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function isSelected(v: Value) {
  if (isMultiple.value) return selectedValues.value.includes(v)
  return props.modelValue === v
}

function select(opt: Option) {
  if (disabled.value) return

  if (!isMultiple.value) {
    emit("update:modelValue", opt.value)
    emit("change", opt.value)
    close()
    return
  }

  // 多选：toggle
  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const idx = current.indexOf(opt.value)
  if (idx >= 0) current.splice(idx, 1)
  else current.push(opt.value)

  emit("update:modelValue", current)
  emit("change", current)

  // 多选默认不关闭；如果你希望每次点完就关，加 close()
}

// 点击组件外关闭
function onDocClick(e: MouseEvent) {
  if (!root.value) return
  const target = e.target as Node
  if (!root.value.contains(target)) close()
}

onMounted(() => document.addEventListener("click", onDocClick))
onBeforeUnmount(() => document.removeEventListener("click", onDocClick))
</script>

<style scoped>
.base-select {
  position: relative;
  display: inline-block;
}

/* 74px * 16px 容器 */
.trigger {
  width: 74px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  padding: 0 1px;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.trigger.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 左侧容器：文本 + +N */
.left {
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
  margin-right: 5px;
}

.text {
  font-size: 12px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.85);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.text.placeholder {
  opacity: 0.6;
}

/* +N 小块 + tooltip */
.tag-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

.tag {
  height: 14px;
  line-height: 14px;
  padding: 0 4px;
  border-radius: 3px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(47, 127, 191, 0.6);
}

.tooltip {
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  min-width: 52px;
  padding: 6px 8px;
  border-radius: 6px;
  background: rgba(16, 93, 117, 0.95);
  backdrop-filter: blur(6px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  z-index: 30;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: all 0.15s ease;
  pointer-events: none;
}

.tag-wrapper:hover .tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.tooltip-item {
  font-size: 12px;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 箭头 */
.arrow {
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
  transition: transform 0.2s ease;
}

.trigger.open .arrow {
  transform: rotate(180deg);
}

/* 下拉框 */
.dropdown {
  position: absolute;
  left: 0;
  top: calc(100% + 6px);
  min-width: 74px;
  max-height: 160px;
  overflow: auto;
  border-radius: 6px;
  backdrop-filter: blur(6px);
  z-index: 20;
  background: url("@/assets/pngs/BG/select/background.png") no-repeat center center;
  
  transition: all 0.2s ease;
}

.option {
  font-size: 12px;
  line-height: 28px;
  height: 28px;
  padding: 0 8px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.option:hover {
  background: rgba(47, 127, 191, 0.25);
}

.option.active {
  background: rgba(47, 127, 191, 0.5);
}

.empty {
  font-size: 12px;
  padding: 8px;
  color: rgba(255, 255, 255, 0.65);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
