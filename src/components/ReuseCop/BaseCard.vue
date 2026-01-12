<template>
  <div class="base-card" :class="titleType">
    <!-- 标题 -->
    <div class="base-card-title" :class="titleType">
      <span class="title-text">{{ title }}</span>
    </div>

    <!-- 内容 -->
    <div class="base-card-content" :class="contentClass" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  titleType: "left" | "right";
  contentBg: string;
  width?: string;
  height?: string;
  contentClass?: string;
}>();

const contentStyle = computed(() => ({
  background: `url(${props.contentBg}) no-repeat center`,
  backgroundSize: "100% 100%",
  width: props.width,
  height: props.height,
}));
</script>

<style scoped>
.base-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.base-card-title {
  width: 220px;
  height: 40px;
  display: flex;
  align-items: center;
}

.base-card-title.left {
  background: url("@/assets/pngs/BG/sidebar/card/background/L_Title.png") no-repeat center / contain;
}

.base-card-title.right {
  align-self: flex-end;
  background: url("@/assets/pngs/BG/sidebar/card/background/R_Title.png") no-repeat center / contain;
}

.title-text {
  margin-left: 38px;
  font-size: 22px;
  color: #fff;
  font-family: "YouSheBiaoTiHei", sans-serif;
}

.base-card-title.right {
  justify-content: flex-end;
}

.base-card-title.right .title-text {
  margin-right: 38px;
}

.base-card-content {
  margin-left: 8.5%;
  padding: 16px;
  box-sizing: border-box;
}

.base-card.right .base-card-content {
  margin-left: -2px;
  margin-right: 35px;
}

</style>
