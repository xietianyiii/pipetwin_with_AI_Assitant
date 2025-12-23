<template>
  <!-- 顶部菜单 -->
  <div class="top-menu-container">
    <div class="top-menu-icon-container">
      <div class="top-menu-icon-item-container">
        <div
          class="top-menu-icon-item"
          @click="$router.push('/twin?panel=drainage&action=drainage')"
        >
          <svg
            t="1760610281201"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="100788"
            width="30"
            height="30"
          >
            <path
              d="M436.096 64h-84.48a25.6 25.6 0 0 0-25.344 25.984v73.536H61.568a29.44 29.44 0 0 0-29.568 29.568v344.704c0 15.872 13.376 28.8 29.568 28.8h264.704v75.072c0 6.848 2.56 13.44 7.36 18.304 4.736 4.928 11.264 7.68 17.984 7.68h84.48a25.6 25.6 0 0 0 25.344-25.984v-551.68A25.984 25.984 0 0 0 436.096 64z m25.6 209.408S576 284.16 688.512 382.848c85.056 68.48 177.664 197.376 200.32 439.552a220.16 220.16 0 0 0 103.232-70.976v114.688s-59.52 93.76-238.08 93.76a333.12 333.12 0 0 1-178.752-46.912 332.864 332.864 0 0 0-178.688-46.848c-178.56 0-238.208 93.76-238.208 93.76v-114.688a457.792 457.792 0 0 1 238.208-93.76 331.136 331.136 0 0 1 177.536 46.4c0.128-86.848-26.944-197.504-77.312-267.84-33.92-41.152-34.56-40.832-34.944-40.832V273.408z m-194.56-16.128c7.744 0 14.08 6.464 14.08 14.4v187.52a14.272 14.272 0 0 1-14.08 14.4H257.28a14.272 14.272 0 0 1-14.08-14.4v-187.52c0-7.936 6.4-14.4 14.08-14.4h9.856z"
              p-id="100789"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div class="top-menu-icon-label">排水设施</div>
      </div>

      <div class="top-menu-icon-item-container">
        <div
          class="top-menu-icon-item"
          @click="$router.push('/twin?panel=moni&action=moni')"
        >
          <svg
            t="1760610746390"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="101861"
            width="30"
            height="30"
          >
            <path
              d="M705.8 844.3c-19.3 0-34.9-15.6-34.9-34.9V510.5c0-87.6-71.3-158.9-158.9-158.9-87.6 0-158.9 71.3-158.9 158.9v298.9c0 19.3-15.6 34.9-34.9 34.9s-34.9-15.6-34.9-34.9V510.5c0-126.1 102.6-228.6 228.6-228.6s228.6 102.6 228.6 228.6v298.9c0.1 19.3-15.5 34.9-34.7 34.9z"
              fill="#ffffff"
              p-id="101862"
            ></path>
            <path
              d="M832.8 844.3H191.2c-19.3 0-34.9-15.6-34.9-34.9s15.6-34.9 34.9-34.9h641.5c19.3 0 34.9 15.6 34.9 34.9s-15.6 34.9-34.8 34.9z"
              fill="#ffffff"
              p-id="101863"
            ></path>
            <path
              d="M469.4 766.4c-6.2 0-12.5-1.7-18.2-5.1-16.4-10.1-21.6-31.5-11.5-48l73.8-120.6h-65.3c-12.6 0-24.3-6.8-30.5-17.9-6.2-11-5.9-24.6 0.8-35.3l80.9-131.1c10.1-16.4 31.6-21.5 48-11.4s21.5 31.6 11.4 48l-48.1 77.9h65.1c12.6 0 24.3 6.8 30.4 17.8 6.2 11 5.9 24.5-0.7 35.3L499.2 749.7c-6.6 10.7-18 16.7-29.8 16.7z"
              fill="#5AC0F9"
              p-id="101864"
            ></path>
            <path
              d="M515 240.4c-19.3 0-34.9-15.6-34.9-34.9v-88.6c0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9v88.6c0 19.3-15.6 34.9-34.9 34.9zM329.4 288.5c-12.1 0-23.8-6.3-30.2-17.4l-44.3-76.7c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.6 12.8l44.3 76.7c9.6 16.7 3.9 38-12.8 47.7-5.5 3.1-11.5 4.6-17.4 4.6zM192.6 423c-5.9 0-11.9-1.5-17.4-4.7L98.5 374c-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.6-12.8l76.7 44.3c16.7 9.6 31-22.4 47.6 12.8l44.3 76.7c16.7 9.6 31 31 12.8 47.7-6.4 11.2-18.1 17.5-30.2 17.5zM141.5 607.8H52.9C33.6 607.8 18 592.2 18 573s15.6-34.9 34.9-34.9h88.6c19.3 0 34.9 15.6 34.9 34.9s-15.7 34.8-34.9 34.8zM971.1 613.9h-88.6c-19.3 0-34.9-15.6-34.9-34.9s15.6-34.9 34.9-34.9h88.6c19.3 0 34.9 15.6 34.9 34.9s-15.6 34.9-34.9 34.9zM834.4 428.3c-12.1 0-23.8-6.3-30.2-17.4-9.6-16.7-3.9-38 12.8-47.6l76.7-44.3c16.7-9.7 38-3.9 47.6 12.8 9.6 16.7 3.9 38-12.8 47.6l-76.7 44.3c-5.5 3.1-11.4 4.6-17.4 4.6zM699.9 291.5c-5.9 0-11.9-1.5-17.4-4.7-16.7-9.6-22.4-31-12.8-47.7l44.3-76.7c9.6-16.7 31-22.4 47.6-12.8 16.7 9.6 22.4 31 12.8 47.7L730.1 274c-6.5 11.3-18.2 17.5-30.2 17.5z"
              fill="#ffffff"
              p-id="101865"
            ></path>
          </svg>
        </div>
        <div class="top-menu-icon-label">监测预警</div>
      </div>

      <div class="top-menu-icon-item-container">
        <div
          class="top-menu-icon-item"
          @click="$router.push('/twin?panel=sim&action=sim')"
        >
          <svg
            t="1760610812010"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="103906"
            width="30"
            height="30"
          >
            <path
              d="M938.667 352v448c0 17.707-14.294 32-32 32H194.56l52.053 52.053a32 32 0 0 1 0 45.227c-6.186 6.293-14.4 9.387-22.613 9.387s-16.427-3.094-22.613-9.387L94.72 822.613c-0.853-0.746-1.6-1.6-2.133-2.453a31.043 31.043 0 0 1-3.414-4.907 33.405 33.405 0 0 1-2.56-6.4c-0.32-0.96-0.533-1.813-0.64-2.773-0.106-0.427-0.213-0.853-0.213-1.28-0.32-1.6-0.427-3.2-0.427-4.8s0.107-3.2 0.427-4.8c0-0.427 0.107-0.853 0.213-1.28 0.107-0.96 0.32-1.813 0.64-2.773 0.534-2.134 1.387-4.16 2.454-6.08 0.426-0.854 0.96-1.814 1.6-2.667a11.483 11.483 0 0 1 1.92-2.56 23.357 23.357 0 0 1 4.586-4.587c0.747-0.746 1.6-1.386 2.56-1.92 0.854-0.64 1.814-1.173 2.667-1.6 1.92-1.066 3.947-1.92 6.08-2.453 0.96-0.32 1.813-0.533 2.773-0.64 0.427-0.107 0.854-0.213 1.28-0.213 1.6-0.32 3.2-0.427 4.8-0.427h757.334V352c0-17.707 14.293-32 32-32s32 14.293 32 32z m0-128c0 1.6-0.107 3.2-0.427 4.8 0 0.427-0.107 0.853-0.213 1.28-0.107 0.96-0.32 1.813-0.64 2.773a33.405 33.405 0 0 1-2.56 6.4 31.043 31.043 0 0 1-3.414 4.907c-3.2 4.16-7.68 7.467-12.693 9.493-1.813 0.747-3.627 1.28-5.547 1.707-0.213 0-0.32 0-0.426 0.107-2.027 0.32-4.054 0.533-6.08 0.533H149.333v416c0 17.707-14.293 32-32 32s-32-14.293-32-32V224c0-17.707 14.294-32 32-32H829.44l-52.053-52.053a32 32 0 0 1 0-45.227 32 32 0 0 1 45.226 0L929.28 201.387c0.853 0.746 1.6 1.6 2.133 2.453 0.747 0.747 1.387 1.6 1.92 2.56 0.64 0.853 1.174 1.813 1.6 2.667 1.067 1.92 1.92 3.946 2.454 6.08 0.32 0.96 0.533 1.813 0.64 2.773 0.106 0.427 0.213 0.853 0.213 1.28 0.32 1.6 0.427 3.2 0.427 4.8z"
              p-id="103907"
              fill="#ffffff"
            ></path>
            <path
              d="M810.667 650.667c0 17.706-14.294 32-32 32H245.333c-17.706 0-32-14.294-32-32s14.294-32 32-32h53.334V373.333c0-17.706 14.293-32 32-32s32 14.294 32 32v245.334h106.666V373.333c0-17.706 14.294-32 32-32s32 14.294 32 32v245.334h128V373.333c0-17.706 14.294-32 32-32s32 14.294 32 32v245.334h53.334c17.706 0 32 14.293 32 32z"
              p-id="103908"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div class="top-menu-icon-label">模拟调度</div>
      </div>
    </div>

    <!-- 独立的圆形按钮 -->
    <div class="floating-button-container">
      <div class="top-menu-icon-item" @click="handleNewButtonClick">
        <svg
          t="1763455784284"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="24294"
          width="26"
          height="26"
        >
          <path
            d="M639.419733 415.9488l101.1712 32.6656 26.282667-62.429867-101.1712-32.6656-26.282667 62.429867z m-222.993066 31.675733l101.1712 32.6656 26.282666-62.395733-101.205333-32.6656-26.248533 62.395733zM375.7056 68.266667l-182.272 475.4432c27.409067-21.128533 59.1872-37.341867 95.914667-38.229334l131.584-343.2448L891.904 328.9088l-67.822933 177.083733a119.364267 119.364267 0 0 1 71.236266 25.873067L989.866667 285.4912 375.7056 68.266667zM607.573333 511.044267l101.1712 32.6656 26.282667-62.464-101.205333-32.631467-26.248534 62.429867zM448.273067 320.853333l101.1712 32.6656 26.282666-62.429866-101.1712-32.6656-26.282666 62.464zM108.4416 754.005333c35.498667 3.003733 72.3968-12.151467 101.922133-41.506133 3.310933-3.413333 6.8608-7.133867 10.683734-10.9568 9.045333-9.386667 27.989333-29.013333 44.032-41.7792 1.672533 26.487467 12.458667 49.698133 20.992 61.883733a96.085333 96.085333 0 0 0 72.021333 41.130667c37.1712 3.140267 79.1552-14.062933 109.943467-44.7488 3.1744-3.242667 6.7584-6.8608 10.4448-10.717867 10.308267-10.581333 32.085333-33.109333 50.107733-47.172266 1.809067 26.350933 12.4928 49.322667 21.026133 61.371733a96.119467 96.119467 0 0 0 72.123734 41.1648c37.307733 3.003733 79.394133-14.097067 110.216533-44.782933 3.1744-3.106133 6.485333-6.621867 10.0352-10.24 9.4208-9.728 32.085333-33.109333 50.7904-47.5136 1.774933 26.350933 12.458667 49.322667 20.992 61.371733 18.056533 25.770667 44.6464 41.301333 74.820267 43.690667 2.901333 0.238933 5.8368 0.341333 8.635733 0.341333 32.5632 0 65.911467-14.779733 92.637867-41.3696l-55.364267-49.732267c-12.322133 12.3904-27.613867 19.7632-39.3216 18.773334-4.3008-0.341333-10.786133-1.911467-17.681067-11.776-4.7104-6.621867-12.834133-28.398933-5.2224-42.734934l11.605334-21.538133-16.6912-18.295467a68.9152 68.9152 0 0 0-51.268267-23.108266h-1.160533c-44.6464 0-84.855467 37.649067-128.750934 83.1488-3.310933 3.515733-6.485333 6.7584-9.284266 9.5232-14.404267 14.336-33.860267 23.3472-48.128 22.254933-4.573867-0.341333-9.898667-1.809067-15.121067-9.250133-4.7104-6.7584-12.868267-28.398933-5.2224-42.734934l11.195733-21.2992-16.7936-18.295466a68.9152 68.9152 0 0 0-51.268266-23.108267h-1.024c-48.2304 0-92.501333 45.841067-128.273067 82.807467-3.413333 3.618133-6.724267 6.9632-9.659733 9.864533-14.267733 14.336-33.860267 23.210667-47.854934 22.254933-4.437333-0.341333-9.796267-1.809067-15.018666-9.250133-4.7104-6.621867-12.834133-28.398933-5.188267-42.734933l11.5712-21.538134-16.6912-18.295466a70.314667 70.314667 0 0 0-52.155733-23.722667h-1.024c-46.557867 0-88.064 42.973867-121.378134 77.653333-3.584 3.584-6.894933 7.099733-9.796266 10.103467-12.629333 12.4928-28.2624 20.104533-39.697067 19.012267-4.334933-0.341333-10.683733-1.9456-17.442133-11.5712L34.133333 710.5536c17.954133 25.634133 44.407467 41.0624 74.308267 43.451733z m786.602667 129.6384c-4.3008-0.341333-10.820267-1.9456-17.681067-11.810133-4.7104-6.621867-12.834133-28.398933-5.2224-42.734933l11.605333-21.504-16.6912-18.3296a68.9152 68.9152 0 0 0-51.268266-23.108267h-1.160534c-44.680533 0-84.8896 37.6832-128.9216 83.182933-3.310933 3.4816-6.485333 6.724267-9.284266 9.489067-14.370133 14.336-34.133333 23.3472-48.128 22.289067-4.539733-0.341333-9.898667-1.809067-15.121067-9.284267-4.7104-6.724267-12.868267-28.398933-5.2224-42.734933l11.605333-21.504-16.827733-18.3296a68.9152 68.9152 0 0 0-51.268267-23.108267h-1.024c-44.544 0-84.514133 37.546667-128.273066 82.807467-3.413333 3.618133-6.7584 6.997333-9.557334 9.898666-14.2336 14.165333-33.860267 23.313067-47.854933 22.254934-4.437333-0.341333-9.796267-1.809067-15.018667-9.284267-4.7104-6.621867-12.834133-28.398933-5.2224-42.734933l11.605334-21.504-16.6912-18.3296a70.314667 70.314667 0 0 0-52.155734-23.688534h-1.024c-46.592 0-88.064 42.939733-121.412266 77.6192l-9.796267 10.103467c-12.629333 12.526933-28.2624 19.8656-39.697067 19.012267-4.437333-0.341333-10.820267-1.911467-17.578666-11.537067L34.133333 900.7104c17.954133 25.668267 44.407467 41.0624 74.308267 43.451733 35.259733 2.798933 72.430933-12.151467 101.956267-41.506133 3.310933-3.3792 6.8608-7.099733 10.683733-10.922667 9.045333-9.4208 27.989333-29.013333 44.032-41.813333a128 128 0 0 0 20.992 61.883733 96.085333 96.085333 0 0 0 72.021333 41.1648c37.034667 3.003733 79.189333-14.097067 109.9776-44.782933 3.1744-3.242667 6.724267-6.826667 10.308267-10.581333 10.308267-10.581333 32.085333-33.109333 50.141867-47.172267 1.774933 26.350933 12.458667 49.322667 20.992 61.371733 18.090667 25.770667 44.680533 41.301333 74.820266 43.690667 2.935467 0.238933 5.870933 0.375467 8.669867 0.375466 32.5632 0 65.911467-14.813867 92.637867-41.403733l-55.5008-49.493333c-12.322133 12.424533-27.477333 19.626667-39.3216 18.773333z"
            fill="#ffffff"
            p-id="24295"
          ></path>
        </svg>
      </div>
    </div>

    <div class="top-menu-scalebar-container">
      <!-- 生成50个刻度条 -->
      <div
        v-for="i in 50"
        :key="i"
        :class="['scalebar-item', i % 10 === 0 || i === 1 ? 'tall' : 'short']"
      ></div>
    </div>

    <!-- 可拖动弹窗 -->
    <div
      v-if="isPopupVisible"
      class="draggable-popup"
      :style="{ top: position.y + 'px', left: position.x + 'px' }"
      @mousedown="startDrag"
      ref="popupRef"
    >
      <div class="popup-header">
        内涝模拟
        <button class="close-btn" @click="closePopup">✕</button>
      </div>

      <div class="popup-body">
        <!-- 第一行：方案选择 -->
        <div class="plan-row">
          <label class="plan-label">预设方案：</label>
          <el-select
            v-model="selectedPlan"
            placeholder="请选择预设方案"
            class="plan-select"
            size="small"
          >
            <el-option label="方案1" value="1" />
            <el-option label="方案2" value="2" />
          </el-select>
        </div>

        <!-- 第二行：操作按钮 -->
        <div class="button-row">
          <el-button
            type="primary"
            size="small"
            @click="executePlan"
            class="action-button"
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
          <el-button
            type="warning"
            size="small"
            @click="resetPlan"
            class="action-button"
          >
            <svg
              t="1763461177116"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="27116"
              width="15"
              height="15"
            >
              <path
                d="M944.5 376.6c3.6-8.7 5.7-18.1 6.1-27.9 0-1.1 0-2.1 0.1-3.2v-1l-1.7-184c-0.4-45.3-37.3-81.8-82.5-81.8h-0.8c-41 0.4-74.7 30.5-80.8 69.8-9.8-7.1-19.9-13.8-30.3-20.1-102.5-62.1-223.1-80.6-339.5-52C298.8 104.8 200.5 177 138.4 279.5S57.8 502.6 86.4 619s100.7 214.7 203.2 276.8c71 43 150.7 65.1 231.7 65.1 35.9 0 72-4.3 107.8-13.1C745.5 919.2 843.8 847 905.9 744.5c23.6-39 11.2-89.8-27.8-113.4-39-23.6-89.8-11.2-113.4 27.8-81 133.7-255.7 176.6-389.5 95.6-64.8-39.2-110.4-101.4-128.5-174.9-18.1-73.6-6.4-149.7 32.9-214.5 80.1-132.1 251.6-175.6 384.7-98.4-36.3 9-63.1 41.9-62.7 80.9 0.4 45.3 37.3 81.8 82.5 81.8h0.8l184-1.7c31.3-0.3 58.5-18 72.2-43.9 1.2-2.2 2.2-4.5 3.2-6.8 0.1-0.1 0.2-0.3 0.2-0.4z"
                fill="#ffffff"
                p-id="27117"
              ></path>
            </svg>
          </el-button>
          <el-radio-group v-model="radio" size="small" fill="#8088d3cc">
            <el-radio-button label="热力" value="heat" />
            <el-radio-button label="水体" value="water" />
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 定义事件，用于向父组件发送方案执行和重置事件
const emit = defineEmits<{
  (e: 'menu-inundation-execute-plan', plan: string, radio: string): void;
  (e: 'menu-inundation-reset-plan'): void;
}>();

const radio = ref('heat')
const isPopupVisible = ref(false);
const position = ref({ x: 800, y: -50 }); // 默认位置
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
const popupRef = ref<HTMLElement | null>(null);
const velocity = ref({ x: 0, y: 0 }); // 用于跟踪拖动速度
const lastPosition = ref({ x: 0, y: 0 }); // 用于计算速度
const lastTime = ref(0); // 用于计算时间差

// 方案选择相关数据
const selectedPlan = ref("1"); // 默认选择方案1

// 手动边界配置（可以根据需要自定义这些值）
// 这些值定义了弹窗可以拖动的范围
const BOUNDARIES = {
  minX: -540, // 弹窗左边缘的最小X坐标
  maxX: 1000, // 弹窗右边缘的最大X坐标
  minY: -700, // 弹窗上边缘的最小Y坐标
  maxY: 0, // 弹窗下边缘的最大Y坐标
};

// 使用说明：
// 1. minX和minY通常设置为0或更大的正值
// 2. maxX应该设置为弹窗最大X坐标位置（例如窗口宽度减去弹窗宽度）
// 3. maxY应该设置为弹窗最大Y坐标位置（例如窗口高度减去弹窗高度）
// 4. 可以根据具体需求调整这些值来限制弹窗的移动范围

const handleNewButtonClick = () => {
  console.log("内涝模拟按钮被点击了");
  isPopupVisible.value = true;
};

const startDrag = (e: MouseEvent) => {
  if (!popupRef.value) return;
  isDragging.value = true;
  offset.value.x = e.clientX - position.value.x;
  offset.value.y = e.clientY - position.value.y;

  // 添加拖动样式
  if (popupRef.value) {
    popupRef.value.classList.add("dragging");
  }

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

  // 计算当前位置
  let newX = e.clientX - offset.value.x;
  let newY = e.clientY - offset.value.y;

  // 使用手动边界配置
  newX = Math.max(BOUNDARIES.minX, Math.min(newX, BOUNDARIES.maxX));
  newY = Math.max(BOUNDARIES.minY, Math.min(newY, BOUNDARIES.maxY));

  // 计算时间差
  const now = Date.now();
  const deltaTime = now - lastTime.value;

  if (deltaTime > 0) {
    // 计算速度 (像素/毫秒)
    velocity.value.x = (newX - lastPosition.value.x) / deltaTime;
    velocity.value.y = (newY - lastPosition.value.y) / deltaTime;
  }

  // 更新位置和时间
  position.value.x = newX;
  position.value.y = newY;
  lastPosition.value.x = newX;
  lastPosition.value.y = newY;
  lastTime.value = now;
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);

  // 移除拖动样式并添加惯性样式
  if (popupRef.value) {
    popupRef.value.classList.remove("dragging");
    popupRef.value.classList.add("inertia");

    // 在动画结束后移除惯性样式
    setTimeout(() => {
      if (popupRef.value) {
        popupRef.value.classList.remove("inertia");
      }
    }, 300);
  }

  // 启动惯性动画
  inertiaAnimation();
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
    newX = Math.max(BOUNDARIES.minX, Math.min(newX, BOUNDARIES.maxX));
    newY = Math.max(BOUNDARIES.minY, Math.min(newY, BOUNDARIES.maxY));

    // 如果碰到边界，反转速度方向以产生反弹效果
    if (newX <= BOUNDARIES.minX || newX >= BOUNDARIES.maxX) {
      vx = -vx * 0.3; // 反弹并减少速度
    }
    if (newY <= BOUNDARIES.minY || newY >= BOUNDARIES.maxY) {
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

// 方案执行方法
const executePlan = () => {
  console.log("执行方案:", selectedPlan.value);
  emit('menu-inundation-execute-plan', selectedPlan.value, radio.value);
};

// 方案重置方法
const resetPlan = () => {
  console.log("重置方案");
  selectedPlan.value = "1"; // 重置为默认方案
  emit('menu-inundation-reset-plan');
};

function closePopup() {
  isPopupVisible.value = false;
}
</script>

<style scoped>
/* 头部样式 */
.header {
  width: 100%;
  height: 7vh;
  position: relative;
}

.top-image {
  width: 100%;
  height: 7vh;
  display: block;
}

.header-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.2vw;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  white-space: nowrap;
}
.top-menu-container {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 800px;
  z-index: 100;
}

.top-menu-icon-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-radius: 10px 10px 0 0;
}

.top-menu-icon-item-container {
  position: relative;
  display: flex;
  align-items: center;
}

.top-menu-icon-item {
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at 30% 30%, #053242, #00d4ff);

  border: 2px solid rgba(248, 248, 248, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.5s ease;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.top-menu-icon-item:hover,
.floating-button-container .top-menu-icon-item:hover {
  background: radial-gradient(
    circle at 0% 60%,
    #1a918b 0%,
    #0099c8 60%,
    #00e5ff 100%
  );
  border: 2px solid rgba(248, 248, 248, 0.6);
  box-shadow: inset 3px 3px 8px rgba(255, 255, 255, 0.4),
    inset -4px -4px 10px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 255, 255, 0.4);
  transform: scale(1.15);
  animation: pulseGlow 1s ease-in-out infinite alternate;
}

@keyframes pulseGlow {
  from {
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
  to {
    box-shadow: 0 0 25px rgba(0, 255, 255, 1);
  }
}

.top-menu-scalebar-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 10px;
  border-radius: 0 0 10px 10px;
}

.scalebar-item {
  width: 4px;
  background-color: rgba(7, 74, 97, 0.7);
  border-radius: 2px;
}

.scalebar-item.short {
  height: 10px;
}

.scalebar-item.tall {
  height: 20px;
  background-color: rgba(7, 74, 97, 0.7);
}

.top-menu-icon-label {
  height: 40px;
  border-radius: 0 20px 20px 0;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(5, 50, 66, 0.5),
    rgba(0, 212, 255, 0.5)
  );
  border: 1px solid rgba(248, 248, 248, 0.8);
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  color: #ffffff;
  font-size: 18px;
  font-family: "SHJGSK";
  font-weight: bold;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  left: 90%;
  top: 50%;
  transform: translateY(-50%);
}

.top-menu-icon-item:hover + .top-menu-icon-label {
  opacity: 1;
}

@keyframes pulseGlow {
  from {
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
  to {
    box-shadow: 0 0 25px rgba(0, 255, 255, 1);
  }
}

.floating-button-container {
  position: absolute;
  top: 110%;
  left: 162%;
  display: flex;
  align-items: center;
  z-index: 100;
}

.floating-button-container .top-menu-icon-item {
  width: 46px;
  height: 45px;
  background: radial-gradient(circle at 30% 30%, #053242, #00d4ff);
  border: 2px solid rgba(248, 248, 248, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.5s ease;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.floating-button-container .top-menu-icon-item:hover {
  background: radial-gradient(
    circle at 0% 60%,
    #1a918b 0%,
    #0099c8 60%,
    #00e5ff 100%
  );
  border: 2px solid rgba(248, 248, 248, 0.6);
  box-shadow: inset 3px 3px 8px rgba(255, 255, 255, 0.4),
    inset -4px -4px 10px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 255, 255, 0.4);
  transform: scale(1.15);
  animation: pulseGlow 1s ease-in-out infinite alternate;
}

.floating-button-container .top-menu-icon-label {
  height: 40px;
  border-radius: 0 20px 20px 0;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(5, 50, 66, 0.5),
    rgba(0, 212, 255, 0.5)
  );
  border: 1px solid rgba(248, 248, 248, 0.8);
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  color: #ffffff;
  font-size: 18px;
  font-family: "SHJGSK";
  font-weight: bold;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  left: 90%;
  top: 50%;
  transform: translateY(-50%);
}

.floating-button-container .top-menu-icon-item:hover + .top-menu-icon-label {
  opacity: 1;
}

.draggable-popup {
  position: absolute;
  background-color: rgba(79, 99, 113, 0.7);
  border: 2px solid rgba(248, 248, 248, 0.8);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
  padding: 16px 20px;
  width: 250px;
  font-size: 14px;
  z-index: 999;
  backdrop-filter: blur(6px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  pointer-events: auto;
  user-select: none;
  cursor: grab;
  animation: popupAppear 0.3s ease-out;
}

.draggable-popup:hover {
  box-shadow: 0 5px 20px rgba(0, 191, 255, 1);
}

.draggable-popup:active {
  cursor: grabbing;
}

/* 惯性动画期间的样式 */
.draggable-popup.inertia {
  transition: transform 0.2s ease, box-shadow 0.22s ease;
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

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  font-family: "SHJGSK";
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(248, 248, 248, 0.5);
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

.popup-body {
  font-family: "YRDZST";
  font-weight: 600;
  color: #ffffff;
  animation: contentFadeIn 0.3s ease-out 0.2s both;
}

/* 方案选择行样式 */
.plan-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  animation: rowFadeIn 0.3s ease-out 0.3s both;
}

.plan-label {
  font-size: 14px;
  margin-right: 10px;
  white-space: nowrap;
  flex-shrink: 0;
  color: #ffffff;
}

.plan-select {
  flex-grow: 1;
}

.plan-select::v-deep(.el-select__wrapper) {
  background: rgba(5, 50, 66, 0.5);
  border: 1px solid rgba(204, 166, 166, 0.8);
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(94, 164, 187, 0.5);
}

.plan-select::v-deep(.el-select__placeholder) {
  color: rgba(255, 255, 255, 0.7);
}

.plan-select::v-deep(.el-select__selected-item) {
  color: #ffffff;
}

.button-row {
  display: flex;
  gap: 10px;
  animation: rowFadeIn 0.3s ease-out 0.4s both;
  align-items: center;
}

.action-button {
  flex: 1;
  font-family: "SHJGSK";
  background-color: rgba(36, 74, 85, 0.7);
  border: 1px solid rgba(170, 151, 151, 0.8);
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0, 191, 255, 0.5);
  transition: all 0.3s ease;
}

.action-button:hover {
  background: radial-gradient(circle at 0% 60%, #509e9a 0%, #2f8ba7 60%, #26757e 100%);
  box-shadow: 0 0 10px rgba(0, 255, 255, 1);
}

.action-button:active {
  transform: scale(0.95);
}

/* 单选按钮组样式 */
.button-row ::v-deep(.el-radio-group) {
  display: flex;
  border: 1px solid rgba(179, 154, 154, 0.8);
  border-radius: 6px;
  overflow: hidden;
  background: rgba(5, 50, 66, 0.5);
  box-shadow: 0 0 5px rgba(0, 191, 255, 0.5);
}

.button-row ::v-deep(.el-radio-button) {
  flex: 1;
}

.button-row ::v-deep(.el-radio-button__inner) {
  width: 100%;
  background-color: rgb(65 74 79);
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-family: "SHJGSK";
  transition: all 0.3s ease;
}

.button-row ::v-deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: rgba(0, 212, 255, 0.7);
  color: #ffffff;
  box-shadow: 0 0 8px rgba(0, 191, 255, 0.8);
}

.button-row ::v-deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-radius: 5px 0 0 5px;
}

.button-row ::v-deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-radius: 0 5px 5px 0;
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

@keyframes rowFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>