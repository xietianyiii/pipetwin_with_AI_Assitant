<template>
  <div class="legend-card">
    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <el-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
      class="checkbox-group-vertical"
    >
      <el-checkbox v-for="city in cities" :key="city" :label="city" :value="city">
        <span class="checkbox-label">{{ city }}</span>
        <img 
          src="@/assets/pngs/markerNormal.png" 
          class="checkbox-icon" 
          alt="marker"
        />
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

import type { CheckboxValueType } from 'element-plus'

// 定义 props
const props = defineProps<{
  legendType?: 'pump' | 'rain' | 'waterlog' | 'pipe' | null;
}>();

// 定义 emits
const emit = defineEmits<{
  (e: 'selection-change', selected: string[]): void
}>()

// 定义不同类型面板的选项
const pumpOptions = ['雨水泵站', '污水泵站']
const rainOptions = ['>50mm', '<50mm'];
const waterlogOptions = ['0mm', '1-15mm', '16-30mm', '30-50mm'];
const pipeOptions = ['<50%', '50%-100%', '100%', '液位异常', '离线'];

// 根据面板类型计算当前选项
const cities = computed(() => {
  switch (props.legendType) {
    case 'rain': return rainOptions;
    case 'waterlog': return waterlogOptions;
    case 'pump': return pumpOptions;
    case 'pipe': return pipeOptions;
    default: return [];
  }
});

// 计算初始选中项
const checkAll = ref(true)
const isIndeterminate = ref(false)
const checkedCities = ref<string[]>([]);

watch(() => props.legendType, (newVal) => {
  checkedCities.value = cities.value;
  checkAll.value = true;
  isIndeterminate.value = false;
  if (newVal) emit("selection-change", checkedCities.value);
});

const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedCities.value = val ? cities.value : []
  isIndeterminate.value = false
  // Emit 选中状态变化
  emit('selection-change', checkedCities.value)
}

const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.value.length
  // Emit 选中状态变化
  emit('selection-change', value as string[])
}
</script>

<style scoped>
.legend-card {
  position: absolute;
  bottom: 1.8vh;
  left: 20vw;
  width: 6.5vw;
  background: linear-gradient(
    to right,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  z-index: 100;
  font-family: "SimHei", Arial, sans-serif;
  text-shadow: 0 0 6px #00bfff;
}

.checkbox-group-vertical {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.checkbox-group-vertical :deep(.el-checkbox) {
  display: flex;
  align-items: center;
  margin-right: 0;
}

.checkbox-label {
  margin-right: 15px;
  font-family: "SHJGSK", Arial, sans-serif;
}

.checkbox-icon {
  height: 25px;
  vertical-align: middle;
}

:deep(.el-checkbox__label) {
  color: #d0d0d0; /* 白灰色 */
}

:deep(.el-checkbox.is-checked .el-checkbox__label) {
  color: #ffffff;
}

:deep(.el-checkbox__inner) {
  border-color: #d0d0d0;
  background-color: transparent;
}

:deep(.el-checkbox__inner:hover) {
  border-color: #ffffff;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  border-color: #ffffff;
  background-color: transparent;
}

:deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  border-color: #ffffff;
  background-color: transparent;
}

</style>
