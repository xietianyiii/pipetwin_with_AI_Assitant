<template>
  <div class="header-container">
    <div class="header">
      <!-- 标题 -->
      <div class="header-title">51-WIM排水防涝管理平台</div>

      <!-- 顶部背景 -->
      <div class="header_background">
        <img class="header_mask_img" src="@/assets/pngs/BG/header/header.png" />
        <img class="header_mask_img" src="@/assets/pngs/BG/header/background.png" />
      </div>

      <!-- 菜单 -->
      <div class="header-menu">
        <div v-for="item in menuList" :key="item.panel" class="menu-item"
          :class="{ active: activePanel === item.panel }" @click="setActive(item)">
          <span class="menu-text">{{ item.label }}</span>
          <img class="header_menu-mask_img" src="@/assets/pngs/BG/header/menu-hover.png" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 菜单与 panel 的映射关系
const menuList = [
  { label: "排水设施", panel: "drainage" },
  { label: "监测预警", panel: "monitor" },
  { label: "模拟调度", panel: "sim" },
] as const;

type Panel = (typeof menuList)[number]["panel"];

const activePanel = computed<Panel>(() => {
  const p = route.query.panel;
  const panel = (Array.isArray(p) ? p[0] : p) as Panel | undefined;
  return panel || "drainage";
});

const activeMenu = computed(() => {
  return menuList.find(m => m.panel === activePanel.value)?.label || "排水设施";
});

const setActive = (item: (typeof menuList)[number]) => {
  router.push({
    query: {
      ...route.query,
      panel: item.panel,
      // 如果你不需要 action，可以不写；或者切换面板时清掉 action：
      action: undefined,
    },
  });
};
</script>

<style scoped>
.header-container {
  pointer-events: auto;
}

.header {
  position: relative;
  width: 100%;
  height: 100px;
  user-select: none;
}

/* 顶部背景 */
.header_mask_img {
  position: absolute;
  left: 0;
  top: 0px;
  width: 100%;
  pointer-events: none;
}

/* 标题 */
.header-title {
  position: absolute;
  left: 1.5%;
  top: 35%;
  transform: translateY(-50%);
  font-family: "YouSheBiaoTiHei", sans-serif;
  font-size: 35px;
  letter-spacing: 0.5px;
  color: #ffffff;
  z-index: 100;
}

/* 菜单容器 */
.header-menu {
  position: absolute;
  right: 2%;
  transform: translateY(40%);
  display: flex;
  align-items: center;
  gap: 60px;
  z-index: 999;
}

/* 单个菜单 */
.menu-item {
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  font-family: "YouSheBiaoTiHei", sans-serif;
  font-size: 26px;
  letter-spacing: 1.5px;
  color: #ffffff;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

/* hover 文字 */
.menu-item:hover {
  opacity: 1;
}

/* active 文字 */
.menu-item.active {
  opacity: 1;
}

/* 菜单文字 */
.menu-text {
  position: relative;
  z-index: 2;
}

/* hover / active 背景条 */
.header_menu-mask_img {
  position: absolute;
  left: 42%;
  top: 0%;
  transform: translateX(-50%);
  margin-top: 12px;
  width: 180px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  pointer-events: none;
}

/* active 常显 */
.menu-item.active .header_menu-mask_img {
  opacity: 1;
}
</style>
