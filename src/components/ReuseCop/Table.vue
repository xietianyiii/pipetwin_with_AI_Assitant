<template>
  <div class="base-table" :style="{ '--col-count': columns.length }">
    <!-- 表头 -->
    <div class="base-table-header base-table-grid">
      <span v-for="col in columns" :key="col.key" class="cell header">
        {{ col.label }}
      </span>
    </div>

    <!-- 表体 -->
    <div class="base-table-row-container">
      <div class="base-table-row base-table-grid" v-for="(row, idx) in data" :key="idx">
        <span
          v-for="col in columns"
          :key="col.key"
          class="cell"
          :class="`${col.key}-cell`"
        >
          {{ row[col.key] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: {
    key: string
    label: string
  }[]
  data: Record<string, any>[]
}>()
</script>

<style scoped>
.base-table-grid {
  display: grid;
  grid-template-columns: repeat(var(--col-count), minmax(0, 1fr));
  align-items: center;
  column-gap: 12px; /* 可按需调整 */
  justify-items: center;
}

.base-table-header {
  background: url("@/assets/pngs/BG/sidebar/card/card6-svg/table-header.png")
    no-repeat center / contain;
  height: 32px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 0 30px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  font-family: "AlimamaAgileVF", sans-serif;
}

.base-table-row-container {
  width: 100%; 
  margin: 0 auto;
  padding: 0 30px; 
  box-sizing: border-box;
}

.base-table-row {
  padding: 8px 0;
  font-size: 12px;
  border-radius: 5px;
  font-family: "AlimamaAgileVF", sans-serif;
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
}

.base-table-row:nth-of-type(even) {
  background: rgba(79, 111, 120, 0.2);
}

.base-table-row:hover {
  background: rgba(16, 93, 117, 0.8);
}

.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
