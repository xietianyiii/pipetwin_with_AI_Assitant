<template>
  <div class="number-unit">
    <span class="number" :style="{ fontSize: numberSize }">{{ value }}</span>
    <span class="unit" :style="{ fontSize: unitSize }">{{ unit }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string | number;
  unit: string;
  numberSize?: string;
  unitSize?: string;
}>();
</script>

<style scoped>
.number-unit {
  display: flex;
  align-items: baseline;
  gap: 6px;
  background: linear-gradient(180deg, #FFFFFF 0%, #62F1FA 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.number {
  font-size: 18px;
  font-family: "AlimamaShuHeiTi", sans-serif;
}

.unit {
  font-size: 12px;
  font-family: "AlimamaShuHeiTi", sans-serif;
}
</style>
