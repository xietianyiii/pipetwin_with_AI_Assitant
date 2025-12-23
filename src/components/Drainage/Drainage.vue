<template>
  <div class="drainage-container">
    <!-- 半圆按钮 - 向下箭头（默认隐藏） -->
    <div class="semi-circle-button down-button hidden" id="downButton">
      <svg
        t="1760341987785"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="47832"
        width="20"
        height="20"
      >
        <path d="M325.456471 862.280661" fill="#2c2c2c" p-id="47833"></path>
        <path d="M882.057788 862.280661" fill="#2c2c2c" p-id="47834"></path>
        <path d="M236.028491 877.160382" fill="#2c2c2c" p-id="47835"></path>
        <path d="M960.132455 877.160382" fill="#2c2c2c" p-id="47836"></path>
        <path d="M63.683483 788.736998" fill="#2c2c2c" p-id="47837"></path>
        <path d="M958.469023 788.736998" fill="#2c2c2c" p-id="47838"></path>
        <path d="M64.77753 858.792098" fill="#2c2c2c" p-id="47839"></path>
        <path
          d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z"
          fill="#2c2c2c"
          p-id="47840"
        ></path>
        <path d="M959.523505 858.792098" fill="#2c2c2c" p-id="47841"></path>
      </svg>
    </div>

    <!-- 半圆按钮 - 向上箭头 -->
    <div class="semi-circle-button up-button" id="upButton">
      <svg
        t="1760341921115"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="46779"
        width="20"
        height="20"
      >
        <path d="M325.456471 862.280661" fill="#2c2c2c" p-id="46780"></path>
        <path d="M882.057788 862.280661" fill="#2c2c2c" p-id="46781"></path>
        <path d="M236.028491 877.160382" fill="#2c2c2c" p-id="46782"></path>
        <path d="M960.132455 877.160382" fill="#2c2c2c" p-id="46783"></path>
        <path d="M63.683483 788.736998" fill="#2c2c2c" p-id="46784"></path>
        <path d="M958.469023 788.736998" fill="#2c2c2c" p-id="46785"></path>
        <path d="M64.77753 858.792098" fill="#2c2c2c" p-id="46786"></path>
        <path
          d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z"
          fill="#2c2c2c"
          p-id="46787"
        ></path>
        <path d="M959.523505 858.792098" fill="#2c2c2c" p-id="46788"></path>
      </svg>
    </div>

    <div class="toolbar">
      <!-- 1 -->
      <div
        class="tool-item"
        :class="{ active: activeToolIndex === 0 }"
        @click="() => handleFirstToolClick()"
      >
        <svg
          t="1760151975295"
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M897.28 395.52c-1.28-12.8-8.96-23.04-19.2-30.72L527.36 125.44c-20.48-14.08-51.2-8.96-65.28 12.8l-11.52 16.64c-7.68 10.24-10.24 23.04-7.68 35.84 1.28 12.8 8.96 23.04 19.2 30.72l106.24 71.68-92.16 134.4-104.96-70.4c-21.76-15.36-52.48-8.96-67.84 12.8L202.24 518.4c-80.64 117.76-49.92 280.32 67.84 360.96 44.8 30.72 96 44.8 145.92 44.8 83.2 0 165.12-39.68 215.04-112.64l101.12-148.48c7.68-11.52 10.24-23.04 7.68-37.12-2.56-14.08-10.24-24.32-20.48-32l-106.24-72.96 92.16-134.4L812.8 460.8c8.96 5.12 17.92 7.68 26.88 7.68 14.08 0 29.44-7.68 38.4-20.48l11.52-16.64c7.68-10.24 10.24-23.04 7.68-35.84zM463.36 637.44l-52.48 76.8c-6.4 11.52-21.76 14.08-33.28 6.4s-14.08-23.04-6.4-33.28l52.48-76.8c7.68-11.52 23.04-14.08 33.28-6.4 11.52 7.68 14.08 23.04 6.4 33.28z"
          />
        </svg>
      </div>

      <!-- 2 -->
      <div
        class="tool-item"
        :class="{ active: activeToolIndex === 1 }"
        @click="() => handleToolClick(1)"
      >
        <svg
          t="1760153142367"
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M131.072 561.152V211.968c0-30.208-24.576-55.296-55.296-55.296C45.568 156.672 20.48 181.248 20.48 211.968v349.184c0 30.208 24.576 55.296 55.296 55.296 30.72 0 55.296-25.088 55.296-55.296zM1003.008 619.52V270.336c0-30.208-24.576-55.296-55.296-55.296-30.208 0-55.296 24.576-55.296 55.296V619.52c0 30.208 24.576 55.296 55.296 55.296 30.72 0 55.296-24.576 55.296-55.296zM261.12 956.928V716.8c0-30.208-24.576-55.296-55.296-55.296-30.208 0-55.296 24.576-55.296 55.296v240.128c0 30.208 24.576 55.296 55.296 55.296 30.72-0.512 55.296-25.088 55.296-55.296zM843.776 860.672v-131.072c0-30.208-24.576-55.296-55.296-55.296-30.208 0-55.296 24.576-55.296 55.296v131.072c0 30.208 24.576 55.296 55.296 55.296 30.72 0 55.296-25.088 55.296-55.296zM574.464 757.248H449.536c-18.944 0-34.816-15.36-34.816-34.816V350.208h194.56v372.224c0 18.944-15.36 34.816-34.816 34.816zM574.464 976.384H449.536c-18.944 0-34.816-15.36-34.816-34.816v-70.144c0-18.944 15.36-34.816 34.816-34.816h124.928c18.944 0 34.816 15.36 34.816 34.816v70.144c0 19.456-15.36 34.816-34.816 34.816z"
          />
          <path
            d="M483.84 22.528l-199.68 295.936c-15.36 22.528 1.024 53.248 28.16 53.248h399.36c27.136 0 43.52-30.72 28.16-53.248l-199.68-295.936c-13.312-19.968-43.008-19.968-56.32 0z"
          />
        </svg>
      </div>

      <!-- 3 -->
      <div
        class="tool-item"
        :class="{ active: activeToolIndex === 2 }"
        @click="() => handleToolClick(2)"
      >
        <svg
          t="1760153580583"
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M236.3 512c0-152.3 123.4-275.7 275.7-275.7S787.7 359.7 787.7 512 664.3 787.7 512 787.7 236.3 664.3 236.3 512z m630.2 0c0-43.5 35.3-78.8 78.8-78.8s78.7 35.3 78.7 78.8-35.3 78.8-78.8 78.8-78.7-35.3-78.7-78.8zM0 512c0-43.5 35.3-78.8 78.8-78.8s78.8 35.3 78.8 78.8-35.3 78.8-78.8 78.8S0 555.5 0 512z m433.2 433.2c0-43.5 35.3-78.8 78.8-78.8s78.8 35.3 78.8 78.8-35.3 78.8-78.8 78.8-78.8-35.3-78.8-78.8z m0-866.4C433.2 35.3 468.5 0 512 0s78.8 35.3 78.8 78.8-35.3 78.8-78.8 78.8-78.8-35.3-78.8-78.8zM150 762.6c30.8-30.8 80.6-30.8 111.4 0 30.8 30.8 30.8 80.6 0 111.4-30.8 30.8-80.6 30.8-111.4 0-30.8-30.7-30.8-80.6 0-111.4zM762.6 150c30.8-30.8 80.6-30.8 111.4 0s30.8 80.6 0 111.4-80.6 30.8-111.4 0-30.7-80.7 0-111.4zM150 261.4c-30.8-30.8-30.8-80.6 0-111.4 30.8-30.8 80.6-30.8 111.4 0s30.8 80.6 0 111.4-80.7 30.7-111.4 0zM762.6 874c-30.8-30.8-30.8-80.6 0-111.4 30.8-30.8 80.6-30.8 111.4 0 30.8 30.8 30.8 80.6 0 111.4-30.7 30.8-80.6 30.8-111.4 0z"
          />
        </svg>
      </div>

      <!-- 4: 显示/隐藏切换 -->
      <div
        class="tool-item show-toggle"
        id="toggleVisibility"
        :class="{ active: isVisibilityToolActive }"
        @click="() => handleToolClick(3)"
      >
        <!-- 默认图标 -->
        <svg
          t="1760155198404"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="31868"
          width="200"
          height="200"
        >
          <path
            d="M762.965333 823.338667A467.2 467.2 0 0 1 512 896c-230.058667 0-421.461333-165.546667-461.653333-384a468.565333 468.565333 0 0 1 142.506666-258.816L59.434667 119.808l60.373333-60.373333 844.757333 844.8-60.373333 60.330666-141.226667-141.226666zM253.226667 313.6A382.506667 382.506667 0 0 0 137.514667 512a384.256 384.256 0 0 0 563.2 249.088l-86.485334-86.528A192 192 0 0 1 349.44 409.770667L253.226667 313.6z m297.770666 297.728l-138.325333-138.325333a106.666667 106.666667 0 0 0 138.24 138.282666l0.085333 0.042667z m336.768 96.597333l-61.056-61.013333a381.269333 381.269333 0 0 0 59.733334-134.912A384.256 384.256 0 0 0 407.594667 227.754667L340.224 160.426667A468.906667 468.906667 0 0 1 512 128c230.058667 0 421.461333 165.546667 461.610667 384a467.2 467.2 0 0 1-85.845334 195.925333z m-387.584-387.584a192 192 0 0 1 203.477334 203.52l-203.52-203.52z"
            p-id="31869"
          ></path>
        </svg>
        <!-- 点击后显示的图标 -->
        <svg
          t="1760155210458"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="32077"
          width="200"
          height="200"
        >
          <path
            d="M942.208 486.208c-94.784-199.68-238.08-300.16-430.208-300.16-192.192 0-335.36 100.48-430.208 300.224a60.288 60.288 0 0 0 0 51.52c94.784 199.68 238.08 300.16 430.208 300.16 192.192 0 335.36-100.48 430.208-300.224a60.288 60.288 0 0 0 0-51.52zM512 766.016c-161.28 0-279.424-81.792-362.688-254.016C232.576 339.84 350.72 257.984 512 257.984S791.424 339.84 874.688 512c-83.2 172.16-201.28 254.016-362.688 254.016zM507.968 336a176 176 0 1 0 0 352 176 176 0 0 0 0-352z m0 288a112 112 0 1 1 0-224 112 112 0 1 1 0 224z"
            p-id="32078"
          ></path>
        </svg>
      </div>

      <!-- 8: 管网标签切换 -->
      <div
        class="tool-item"
        :class="{ active: isPipeLabelVisible }"
        @click="() => handleToolClick(7)"
      >
        <svg
          t="1763973191594"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2489"
          width="200"
          height="200"
        >
          <path
            d="M920.528912 444.49616l-340.111125-340.114737a135.932464 135.932464 0 0 0-96.155899-39.758503L200.418112 64.662657h-0.018063C125.275769 64.662657 64.301413 125.40943 64.301413 200.548159v283.673992a136.091412 136.091412 0 0 0 39.881326 96.199248l340.230335 340.241173a136.022775 136.022775 0 0 0 192.369598 0l283.74624-283.76069c53.128139-53.131752 53.128139-139.277583 0-192.405722z m-45.209673 147.192436l-283.746241 283.760691a72.064544 72.064544 0 0 1-101.924964 0l-340.212273-340.241173A72.187367 72.187367 0 0 1 128.241582 484.218538V200.548159A72.021195 72.021195 0 0 1 200.396437 128.602826l283.843776-0.039737a71.887535 71.887535 0 0 1 50.935389 21.053294l340.114737 340.1039a72.104281 72.104281 0 0 1 0.0289 101.968313z"
            fill=""
            p-id="2490"
          ></path>
          <path
            d="M384.002258 255.999097c-70.69543 0-128.003161 57.307731-128.003161 128.003161S313.306828 511.998194 384.002258 511.998194s127.999548-57.307731 127.999548-127.999549S454.690463 255.999097 384.002258 255.999097z m45.296371 173.29592a64.059379 64.059379 0 1 1 18.759396-45.292759 63.640337 63.640337 0 0 1-18.763008 45.292759z"
            fill=""
            p-id="2491"
          ></path>
        </svg>
      </div>

      <!-- 5 -->
      <div
        class="tool-item"
        :class="{ active: activeToolIndex === 4 }"
        @click="() => handleToolClick(4)"
      >
        <svg
          t="1760319081129"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="35743"
          width="200"
          height="200"
        >
          <path
            d="M513.48 64.22C265.55 63.7 64.35 263.97 64.22 511.38c-0.13 248.07 200.01 448.47 447.68 448.6 247.14 0.13 447.68-199.22 448.07-445.97 0.66-248.2-198.95-449.26-446.49-449.79zM124.92 488.07c0.66-12.25 2.11-24.36 3.95-36.34h766.58c1.85 12.05 3.17 24.18 3.95 36.34H124.92zM511.51 124c139.31-0.26 262.68 74.53 331.28 185.79-35.16-9.35-72.68 2.24-102.04 34.76-28.57 33.05-70.44 33.05-98.88 0-45.69-50.69-111-50.69-156.69 0-28.57 33.05-70.44 33.05-98.88 0-45.69-50.69-111-50.69-156.69 0-13.56 16.59-30.68 26.33-48.72 25.28-8.95-0.53-16.72-4.21-23.7-13.56 60.17-136.02 196.71-232 354.32-232.27z"
            p-id="35744"
          ></path>
        </svg>
      </div>

      <!-- 6 -->
      <div
        class="tool-item"
        :class="{ active: activeToolIndex === 5 }"
        @click="() => handleToolClick(5)"
      >
        <svg
          t="1760319497918"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="37667"
          width="200"
          height="200"
        >
          <path
            d="M51.2 262.4c16 9.6 44.8 9.6 57.6 0h3.2v-3.2c3.2-6.4 51.2-51.2 128-51.2 54.4 0 124.8 16 214.4 44.8 89.6 25.6 179.2 51.2 265.6 51.2 48 0 92.8-9.6 121.6-16V342.4l16-12.8 128-96-144-108.8v80c-28.8 9.6-70.4 19.2-121.6 19.2-76.8 0-160-25.6-243.2-51.2l-38.4-9.6C374.4 147.2 304 128 240 128 150.4 128 86.4 176 60.8 192l-6.4 6.4h-3.2l-3.2 3.2c-6.4 16-6.4 44.8 3.2 60.8zM182.4 726.4v-57.6l-144 108.8 144 108.8v-80c28.8-9.6 70.4-22.4 121.6-22.4 22.4 0 41.6 3.2 64 6.4 0-22.4 3.2-48 6.4-70.4-25.6-3.2-51.2-6.4-76.8-6.4-38.4-3.2-76.8 3.2-115.2 12.8zM476.8 460.8l-38.4-9.6c-64-16-134.4-35.2-198.4-35.2-108.8 0-185.6 70.4-188.8 73.6v3.2c-6.4 12.8-9.6 41.6 6.4 57.6s38.4 16 54.4 0h3.2v-3.2c3.2-6.4 51.2-51.2 128-51.2 54.4 0 118.4 12.8 204.8 41.6 16-22.4 35.2-44.8 54.4-67.2-9.6-3.2-16-6.4-25.6-9.6zM886.4 518.4c3.2 3.2 9.6 3.2 12.8 0l41.6-41.6c3.2-3.2 3.2-9.6 0-12.8l-70.4-70.4c-3.2-3.2-9.6-3.2-12.8 0l-41.6 41.6c-3.2 3.2-3.2 9.6 0 12.8l70.4 70.4zM857.6 560c3.2-3.2 3.2-9.6 0-12.8l-70.4-70.4c-3.2-3.2-9.6-3.2-12.8 0L544 704l-32 118.4 118.4-35.2 227.2-227.2zM432 860.8h550.4v38.4H432z"
            p-id="37668"
          ></path>
        </svg>
      </div>

      <!-- 7 -->
      <div
        class="tool-item"
        :class="{ active: activeToolIndex === 6 }"
        @click="() => handleToolClick(6)"
      >
        <svg
          t="1760319833728"
          class="icon"
          viewBox="0 0 1025 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="45735"
          width="200"
          height="200"
        >
          <path
            d="M512 134.4c20.8 28.8 40 57.6 59.2 86.4 28.8 40 57.6 80 83.2 123.2 28.8 48 44.8 99.2 43.2 156.8 0 92.8-73.6 174.4-169.6 185.6-80 11.2-169.6-54.4-193.6-140.8-16-59.2-4.8-116.8 20.8-171.2 30.4-67.2 78.4-123.2 120-184 12.8-17.6 24-36.8 36.8-56z m-46.4 129.6l-11.2 11.2c-17.6 28.8-35.2 59.2-49.6 89.6-12.8 28.8-22.4 59.2-20.8 91.2 1.6 36.8 24 60.8 51.2 57.6 27.2-4.8 40-32 35.2-67.2-6.4-38.4-11.2-76.8-12.8-113.6-1.6-22.4 3.2-44.8 8-68.8z"
            p-id="45736"
          ></path>
          <path
            d="M729.6 536c-1.6-25.6 0-27.2 24-22.4 78.4 16 153.6 38.4 219.2 88 33.6 25.6 57.6 56 51.2 100.8-4.8 38.4-30.4 62.4-59.2 81.6-60.8 43.2-129.6 64-201.6 80-96 20.8-193.6 30.4-291.2 25.6-123.2-6.4-244.8-20.8-358.4-75.2-33.6-16-65.6-33.6-88-64-35.2-46.4-32-96 12.8-132.8 27.2-22.4 59.2-44.8 92.8-59.2 48-19.2 99.2-32 150.4-46.4 4.8-1.6 14.4 3.2 16 8 3.2 9.6 1.6 17.6-11.2 20.8-28.8 8-59.2 12.8-86.4 24-33.6 14.4-67.2 28.8-94.4 49.6-49.6 36.8-46.4 86.4 3.2 123.2 43.2 32 94.4 49.6 145.6 62.4 164.8 38.4 332.8 40 497.6 4.8 54.4-11.2 108.8-28.8 156.8-60.8 64-43.2 65.6-94.4 3.2-140.8-46.4-33.6-99.2-48-153.6-60.8-11.2-1.6-20.8-4.8-28.8-6.4z"
            p-id="45737"
          ></path>
          <path
            d="M518.4 787.2c-81.6 0-155.2-9.6-225.6-38.4-24-9.6-46.4-25.6-64-43.2-22.4-20.8-22.4-51.2 0-72 20.8-19.2 48-32 72-46.4 3.2-1.6 11.2 1.6 16 3.2-3.2 4.8-6.4 9.6-9.6 12.8-11.2 8-25.6 12.8-35.2 22.4-25.6 20.8-27.2 51.2 0 70.4 20.8 16 46.4 28.8 72 35.2 116.8 32 233.6 32 348.8-3.2 22.4-6.4 44.8-19.2 62.4-32 27.2-20.8 25.6-49.6-1.6-70.4-11.2-9.6-25.6-14.4-36.8-22.4-3.2-1.6-4.8-6.4-8-9.6 4.8-1.6 9.6-6.4 11.2-4.8 30.4 9.6 59.2 24 80 49.6 20.8 25.6 16 52.8-9.6 76.8-30.4 27.2-65.6 41.6-104 51.2-57.6 14.4-115.2 22.4-168 20.8z"
            p-id="45738"
          ></path>
        </svg>
      </div>

      <!-- 9 管网编辑 -->
      <div
        class="tool-item"
        :class="{ active: isPipeEditorEnable }"
        @click="() => handleToolClick(8)"
      >
        <svg
          t="1764661287895"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7638"
          width="20"
          height="20"
        >
          <path
            d="M947.2 179.2c-30.72-30.72-76.8-30.72-107.52 0l-343.04 343.04c-10.24 10.24-15.36 20.48-20.48 30.72l-30.72 97.28v15.36c5.12 15.36 20.48 20.48 30.72 15.36l97.28-30.72c10.24-5.12 20.48-10.24 30.72-20.48l343.04-343.04c30.72-30.72 30.72-76.8 0-107.52z"
            fill="#8a8a8a"
            p-id="7639"
          ></path>
          <path
            d="M921.6 512c0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6v332.8c0 71.68-56.32 128-128 128h-665.6C107.52 972.8 51.2 916.48 51.2 844.8v-665.6C51.2 107.52 107.52 51.2 179.2 51.2H512c15.36 0 25.6 10.24 25.6 25.6s-10.24 25.6-25.6 25.6H179.2C138.24 102.4 102.4 138.24 102.4 179.2v665.6c0 40.96 35.84 76.8 76.8 76.8h665.6c40.96 0 76.8-35.84 76.8-76.8V512z m-25.6-384c-30.72-30.72-76.8-30.72-107.52 0L440.32 471.04l-15.36 30.72-30.72 97.28v15.36c5.12 15.36 20.48 20.48 30.72 15.36l97.28-30.72c10.24-5.12 20.48-10.24 30.72-20.48l343.04-343.04c30.72-30.72 30.72-76.8 0-107.52z m35.84-35.84c51.2 51.2 51.2 133.12 0 179.2L588.8 614.4c-15.36 15.36-30.72 25.6-51.2 30.72l-97.28 30.72c-40.96 15.36-81.92-10.24-97.28-46.08-5.12-15.36-5.12-30.72 0-46.08l30.72-97.28c5.12-20.48 15.36-35.84 30.72-51.2l343.04-343.04c56.32-51.2 133.12-51.2 184.32 0z"
            fill=""
            p-id="7640"
          ></path>
        </svg>
      </div>

      <!-- 10 管网上传 -->
      <div class="tool-item" @click="() => handlePipeUpload">
        <svg
          t="1764750392157"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="29305"
          width="200"
          height="200"
        >
          <path
            d="M512 204.8c95.744 0 176.128 65.6896 198.5536 154.4192A230.4 230.4 0 0 1 691.2 819.2H563.2v-153.6h102.4l-153.6-204.8-153.6 204.8h102.4v153.6H332.8a230.4 230.4 0 0 1-19.3536-459.9808A204.8 204.8 0 0 1 512 204.8z"
            fill="#303133"
            p-id="29306"
          ></path>
        </svg>
      </div>

      <div
        v-if="activeToolIndex !== null"
        class="tool-actions-wrapper"
        :style="{ top: `${toolTopOffset}px` }"
      >
        <div class="tool-actions">
          <button
            v-for="(btn, idx) in toolActions[activeToolIndex]"
            :key="idx"
            class="tool-action-btn"
            @click="btn.action"
          >
            {{ btn.label }}
          </button>
        </div>

        <div v-if="activeToolIndex === 1" class="elevation-box">
          <div class="light-row">
            <label class="light-label">管网类型：</label>
            <el-select
              v-model="hightPieType"
              placeholder="请选择管网类型"
              class="light-select"
              size="small"
            >
              <el-option label="雨水管" value="rain" />
              <el-option label="污水管" value="sewage" />
            </el-select>
          </div>

          <div class="light-row">
            <label class="light-label">高度：</label>
            <el-input-number
              class="elevation-input"
              v-model="elevationValue"
              :precision="2"
              :step="1"
              size="small"
            />
          </div>
        </div>

        <div v-if="activeToolIndex === 2" class="light-box">
          <!-- 第1行：模式选择器 -->
          <div class="light-row">
            <label class="light-label">管网类型：</label>
            <el-select
              v-model="lightPieType"
              placeholder="请选择管网类型"
              class="light-select"
              size="small"
            >
              <el-option label="雨水管" value="rain" />
              <el-option label="污水管" value="sewage" />
            </el-select>
          </div>

          <!-- 第2行：亮度输入 -->
          <div class="light-row">
            <label class="light-label">调节亮度：</label>
            <el-slider
              v-model="lightIntensity"
              size="small"
              :show-tooltip="false"
            />
            <!-- <el-input-number
              v-model="lightIntensity"
              :min="0"
              :max="100"
              :step="1"
              class="light-input"
              size="small"
            /> -->
            <el-color-picker
              v-model="lightColor"
              show-alpha
              color-format="hex"
              size="small"
            />
          </div>
        </div>

        <div v-if="activeToolIndex === 3" class="light-box">
          <!-- 第1行：模式选择器 -->
          <div class="light-row">
            <label class="light-label">管网类型：</label>
            <el-select
              v-model="visiblePieType"
              placeholder="请选择管网类型"
              class="light-select"
              size="small"
            >
              <el-option label="雨水管" value="rain" />
              <el-option label="污水管" value="sewage" />
            </el-select>
          </div>

          <!-- 第2行：亮度输入 -->
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
            <!-- <el-input-number
              v-model="lightIntensity"
              :min="0"
              :max="100"
              :step="1"
              class="light-input"
              size="small"
            /> -->
          </div>
        </div>

        <div v-if="activeToolIndex === 4" class="light-box">
          <!-- 第1行：模式选择器 -->
          <div class="light-row">
            <label class="light-label">管网类型：</label>
            <el-select
              v-model="liquidPipeType"
              placeholder="请选择管网类型"
              class="light-select"
              size="small"
            >
              <el-option label="雨水管" value="rain" />
              <el-option label="污水管" value="sewage" />
            </el-select>
          </div>

          <!-- 第2行：亮度输入 -->
          <div class="light-row">
            <label class="light-label">液位高度：</label>
            <el-input-number
              v-model="liquidLevel"
              :min="0"
              :max="2"
              :step="0.2"
              class="light-input"
              size="small"
            />
            <el-color-picker
              v-model="liquidColor"
              show-alpha
              color-format="hex"
              size="small"
            />
          </div>
        </div>

        <div v-if="activeToolIndex === 5" class="light-box">
          <!-- 第0行：类型选择器 -->
          <div class="light-row">
            <label class="light-label">管网类型：</label>
            <el-select
              v-model="flowPieType"
              placeholder="请选择管网类型"
              class="light-select"
              size="small"
            >
              <el-option label="雨水管" value="rain" />
              <el-option label="污水管" value="sewage" />
            </el-select>
          </div>
          <!-- 第1行：模式选择器 -->
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

          <!-- 第2行：亮度输入 -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
import type { TagProps } from "element-plus";

const hightPieType = ref("rain");
const elevationValue = ref("8");
const lightPieType = ref("rain");
const lightIntensity = ref(50);
const lightColor = ref("");
const liquidPipeType = ref("rain");
const liquidLevel = ref(1);
const liquidColor = ref("#00BFFF");
const flowPieType = ref("rain");
const flowStyle = ref("0");
const flowDirection = ref("1");
const flowColor = ref("");
const visiblePieType = ref("rain");
const visiblePipeIds = ref<string[]>([]);

const activeToolIndex = ref<number | null>(null);
const isVisibilityToolActive = ref(false); // 单独跟踪显示/隐藏图标的active状态

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
  activeToolIndex.value = null;
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
    liquidLevel.value,
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

const handleToolClick = (index: number) => {
  // 如果是第7个图标（索引为7），特殊处理管网标签切换
  if (index === 7) {
    isPipeLabelVisible.value = !isPipeLabelVisible.value;
    emit("pipeLabelToggled", isPipeLabelVisible.value);
    return;
  }

  if (index === 8) {
    isPipeEditorEnable.value = !isPipeEditorEnable.value;
    emit("pipeEditorToggled", isPipeEditorEnable.value);
    return;
  }

  // 如果是第3个图标（显示/隐藏切换图标），使用单独的状态管理
  if (index === 3) {
    // 设置显示/隐藏图标为active状态（不会切换为非active）
    isVisibilityToolActive.value = true;
    // 同时更新activeToolIndex以显示子菜单
    activeToolIndex.value = activeToolIndex.value === index ? null : index;
  } else {
    // 其他图标按原有逻辑处理，但不影响显示/隐藏图标的active状态
    activeToolIndex.value = activeToolIndex.value === index ? null : index;
  }
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
  // emit("pipeUploadClicked");
};

const toolTopOffset = computed(() => {
  const itemHeight = 46;
  const offset = 15;
  return activeToolIndex.value !== null
    ? activeToolIndex.value * itemHeight + offset
    : 0;
});

const toolActionsGap = computed(() => {
  // 当 activeToolIndex 为 1 时，.elevation-box 会显示
  if (activeToolIndex.value === 2 || activeToolIndex.value === 4) {
    return "16px";
  }
  return "10px";
});

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
// 管网编辑状态
const isPipeEditorEnable = ref<boolean>(false);

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
/* 如果需要覆盖或添加特定样式，可以在下面添加 */
.drainage-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  pointer-events: none;
}

.toolbar {
  pointer-events: auto;
}

/* 工具条容器 */
.toolbar {
  position: fixed;
  left: 1vw;
  top: 28%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-left: 0.5px solid rgba(49, 141, 169, 0.9);
  border-right: 0.5px solid rgba(49, 141, 169, 0.9);
  border-bottom: 0.5px solid rgba(49, 141, 169, 0.9);
  border-top: none;
  background: linear-gradient(
    to bottom,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  border-radius: 9px;
  padding: 15px 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: transform 0.8s;
}

/* 半圆按钮样式 */
.semi-circle-button {
  position: fixed;
  left: 1vw;
  width: 60px;
  height: 30px;
  background: linear-gradient(
    to right,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  border-left: 0.5px solid rgba(49, 141, 169, 0.9);
  border-right: 0.5px solid rgba(49, 141, 169, 0.9);
  border-bottom: none;
  border-top: 0.5px solid rgba(49, 141, 169, 0.9);
  border-radius: 30px 30px 0 0;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.9s;
  pointer-events: auto;
}

.up-button {
  top: 5.9%;
  transform: translateY(calc(-50%));
  z-index: 1000;
}

.down-button {
  top: -8px;
  border-radius: 0 0 30px 30px;
}

.arrow-icon {
  width: 30px;
  height: 30px;
}

.hidden {
  display: none;
}

/* 工具块样式 */
.tool-item {
  width: 38px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(198, 175, 204, 0.7);
  transition: all 0.3s;
}

.tool-item svg {
  width: 28px;
  height: 28px;
  fill: black;
  transition: fill 0.3s;
}

.tool-item:hover {
  background-color: #0077b6;
  transform: scale(1.05);
}

.tool-item:hover svg {
  fill: rgb(179, 182, 214);
}

.tool-item.active {
  background-color: #1886c2;
  border-color: #426779;
}

.tool-item.active svg {
  fill: rgb(174, 178, 230);
}

/* 显示/隐藏按钮的双图标控制 */
.show-toggle svg:nth-child(2) {
  display: none;
}

.show-toggle.active svg:nth-child(1) {
  display: none;
}

.show-toggle.active svg:nth-child(2) {
  display: block;
}

.top-image {
  width: 100%;
  height: 7vh;
  display: block;
}

.sidebar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 90vh;
  box-sizing: border-box;
}

/* 右侧边栏 */
.sidebar-right {
  width: 18.5vw;
  height: 90vh;
  padding: 12px;
  display: flex;
  flex-direction: column;
  transform: translateY(-1vh);
}

/* 左侧边栏 */
.sidebar-left {
  width: 18.5vw;
  height: 90vh;
  padding: 12px;
  display: flex;
  flex-direction: column;
  transform: translateY(-1vh);
}

/* 右侧卡片容器 */
.cards-right-wrapper {
  height: 92vh;
  display: flex;
  flex-direction: column;
}

/* 包裹卡片的容器 */
.cards-left-wrapper {
  height: 92vh;
  display: flex;
  flex-direction: column;
}

/* 卡片 */
.card {
  width: 100%;
  flex: 1;
  /* 平分高度 */
  display: flex;
  flex-direction: column;
  border-radius: 11px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 12px;
  /* 半透明整体效果 */
  /* 毛玻璃效果，可选 */
  user-select: none;
  pointer-events: auto;
}

.card:last-child {
  margin-bottom: 0;
}

/* 标题栏（半透明深色） */
.card-header {
  background: linear-gradient(
    to right,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  /* 渐变背景 */
  color: #fff;
  font-weight: 600;
  padding: 10px;
  text-align: left;
  font-family: "SimHei", Arial, sans-serif;
  text-shadow: 0 0 6px #00bfff;
  /* 海蓝色光效 */
  border: none;
  backdrop-filter: blur(1px);
  position: relative;
  user-select: none;
}

.card5-header-label {
  font-size: 13px;
}

.card-header-icon {
  margin-right: 3px;
  margin-left: 3px;
  filter: drop-shadow(0 0 6px #00bfff);
}

/* 内容栏（浅色半透明） */
.card1-content,
.card2-content,
.card3-content,
.card4-content,
.card5-content,
.card6-content {
  flex: 1;
  padding: 12px;
  font-size: 14px;
  color: #000;
  background-color: rgba(79, 99, 113, 0.7);
  backdrop-filter: blur(3px);
}

.card1-content-row {
  display: flex;
  align-items: center;
  margin-top: 6px;
  gap: 12px;
}

.card1-content-left {
  margin-left: -5px;
}

.card1-content-left,
.card1-content-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.card1-content-right {
  margin-left: 7px;
}

.card1-content-left .card1-text-top {
  font-size: 15px;
  font-weight: 600;
  font-family: "SimHei", Arial, sans-serif;
  color: #faf4f4;
  text-shadow: #58f0f0 0 0 1px;
}

.card1-content-left .card1-tn-wrapper-number {
  font-size: 23px;
  font-family: "YSBTHeiTi", sans-serif;
  color: #ffffff;
  text-shadow: #566fff 0 0 8px;
}

.card1-content-left .card1-tn-wrapper-text {
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: #566fff 0 0 8px;
}

.card-1-text-number-wrapper {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.card1-content-divider {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  height: 1.5px;
  background: linear-gradient(
    to right,
    rgba(97, 94, 94, 0.7),
    /* 左侧颜色 */ rgba(58, 166, 199, 0.95),
    rgba(97, 94, 94, 0.7) /* 右侧颜色（与左侧一致） */
  );
  /* 渐变线条 */
  /* margin: 0 10px; */
}

.card-1 {
  height: 22.2vh;
  /* 第一个卡片的高度 */
  flex: none;
}

.card-2 {
  height: 22vh;
  /* 第二个卡片的高度 */
  flex: none;
}

.card-3 {
  height: 14.2vh;
  /* 第三个卡片的高度 */
  flex: none;
}

.card-4 {
  height: 15vh;
}

.card-6 {
  height: 72.5vh;
  /* 第三个卡片的高度 */
  flex: none;
}

.card1-icon-text-wrapper {
  display: flex;
  align-items: center;
}

.icon-wrapper-card1 {
  display: flex;
  flex-direction: column;
  /* 设置为上下排列 */
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

/* 对比条容器 */
.card1-comparison-bar {
  display: flex;
  width: 8vw;
  height: 8px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 雨水管网部分 */
.card1-rainwater-bar {
  background-color: #00bfff;
  /* 海蓝色 */
}

/* 污水管网部分 */
.card1-sewage-bar {
  background-color: #e64444;
  /* 粉红色 */
}

/* 对比条上方文字 */
.card1-comparison-bar-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 4px;
}

.card1-content-right .card1-tn-wrapper-number1 {
  font-size: 16px;
  font-weight: bold;
  font-family: Microsoft Yahei;
  color: #ffffff;
  text-shadow: #566fff 0 0 8px;
  font-family: "YRDZST";
}

.card1-content-right .card1-tn-wrapper-text1 {
  font-size: 11px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: #566fff 0 0 8px;
}

.card1-content-right .card1-tn-wrapper-number2 {
  font-size: 16px;
  font-weight: bold;
  font-family: Microsoft Yahei;
  color: #ffffff;
  text-shadow: #566fff 0 0 8px;
  font-family: "YRDZST";
}

.card1-content-right .card1-tn-wrapper-text2 {
  font-size: 11px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: #566fff 0 0 8px;
}

/* 对比条下方文字 */
.card1-comparison-bar-labels {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-top: 4px;
  font-size: 12px;
  color: #333;
}

.card1-rainwater-label {
  font-size: 15px;
  font-weight: 600;
  color: #faf4f4;
  text-align: left;
  font-family: "SHJGSK";
}

.card1-sewage-label {
  font-size: 15px;
  font-weight: 600;
  color: #faf4f4;
  text-align: right;
  font-family: "SHJGSK";
}

.card1-row2-multi-wrapper {
  display: flex;
  justify-content: space-between;
  /* 等间距排列 */
  align-items: center;
  /* 垂直居中对齐 */
  width: 100%;
  /* 确保占满容器宽度 */
}

.card1-row2-single-wrapper {
  display: flex;
  flex-direction: column;
  /* 保持内部内容上下排列 */
  align-items: center;
  /* 居中对齐 */
  flex: 1;
  /* 让每个子项占据相等的空间 */
}

.card1-icon3 {
  z-index: -1;
  margin-top: -10px;
  width: 70px;
  height: 30px;
}

.card1-row2-label {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: #8d92d1 0 0 3px;
  margin-bottom: 4px;
  font-family: "SimHei";
}

.card1-row2-single-wrapper .card1-tn-wrapper-number2 {
  font-size: 18px;
  font-weight: bold;
  font-family: Microsoft Yahei;
  color: #ffffff;
  text-shadow: #9ba9f7 0 0 8px;
  font-family: "YRDZST";
}

.card1-row2-single-wrapper .card1-tn-wrapper-text2 {
  font-size: 11px;
  font-weight: bold;
  color: #e9eff7;
  text-shadow: #566fff 0 0 8px;
  font-family: "SHJGSK";
}

/* card2-left 和 card2-right 左右排列 */
.card2-content {
  display: flex;
  justify-content: space-between;
  /* 左右排列 */
  align-items: flex-start;
  /* 顶部对齐 */
  flex: 1;
  padding: 15px;
  font-size: 14px;
  color: #000;
  background-color: rgba(79, 99, 113, 0.7);
  backdrop-filter: blur(3px);
  padding-top: 20px;
}

/* card2-left-content 内部的三个元素垂直排列，等间距 */
.card2-left-content,
.card2-right-content {
  display: flex;
  flex-direction: column;
  /* 垂直排列 */
  justify-content: space-between;
  /* 等间距 */
  height: 100%;
  /* 确保占满父容器高度 */
}

.card2-title-button,
.card3-title-button,
.card4-title-button {
  background: linear-gradient(
    to right,
    rgba(49, 141, 169, 0.7) 0%,
    rgba(79, 99, 113, 0.7) 33%,
    rgba(45, 198, 245, 0.7) 66%,
    rgba(39, 77, 104, 0.7) 100%
  );
  background-size: 200% 100%;
  background-position: 0% 0%;
  color: #dcd9ff;
  font-weight: 600;
  font-family: "SimHei", Arial, sans-serif;
  text-shadow: 0 0 6px #00bfff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  backdrop-filter: blur(1px);
  font-size: 15px;
  transition: all 0.3s ease;
}

.card.card-2 .card-header,
.card.card-3 .card-header,
.card.card-4 .card-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.card2-close-button,
.card3-close-button,
.card4-close-button {
  background: linear-gradient(
    to right,
    rgba(169, 49, 49, 0.7) 0%,
    rgba(113, 79, 79, 0.7) 33%,
    rgba(245, 45, 45, 0.7) 66%,
    rgba(104, 39, 39, 0.7) 100%
  );
  background-size: 200% 100%;
  background-position: 0% 0%;
  color: #ffd9dc;
  font-weight: 600;
  font-family: "SimHei", Arial, sans-serif;
  text-shadow: 0 0 6px #ff4d4d;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  backdrop-filter: blur(1px);
  font-size: 15px;
  transition: all 0.3s ease;
  margin-left: auto;
}

.card2-title-button:hover,
.card3-title-button:hover,
.card4-title-button:hover {
  background-position: -100% 0%;
  transform: scale(1.01);
}

.card2-close-button:hover,
.card3-close-button:hover,
.card4-close-button:hover {
  background-position: -100% 0%;
  transform: scale(1.01);
}

/* card2-left-label-wrapper 内部的 text 和 number 水平排列 */
.card2-left-label-wrapper,
.card2-right-label-wrapper {
  display: flex;
  justify-content: flex-start;
  /* 左对齐 */
  align-items: center;
  /* 垂直居中 */
  gap: 10px;
  /* 控制 text 和 number 之间的间距 */
  width: 100%;
  /* 占满父容器宽度 */
  padding-left: 30px;
  padding-top: 5px;
  margin-bottom: 12px;
}

.card2-left-label-text1,
.card2-right-label-text1 {
  font-size: 16px;
  font-weight: 600;
  color: #faf4f4;
  font-family: SimHei;
}

.card2-left-label-number1,
.card2-right-label-number1 {
  font-size: 18px;
  font-weight: 600;
  color: #faf4f4;
  font-family: SimHei;
}

.card2-left-label-text2,
.card2-right-label-text2 {
  font-size: 15px;
  font-weight: 600;
  color: #faf4f4;
  font-family: SimHei;
}

.card2-left-label-number2,
.card2-right-label-number2 {
  font-size: 15px;
  font-weight: 600;
  color: #faf4f4;
  font-family: SimHei;
}

.card2-right-chart,
.card2-left-chart {
  margin-top: -20px;
  margin-bottom: -60px;
  width: 100%;
  height: 100%;
}

.card3-content {
  display: flex;
  justify-content: space-between;
  /* 左右排列 */
  height: 5vh;
}

.card3-left-content,
.card3-right-content {
  display: flex;
  flex-direction: column;
  /* 垂直排列子元素 */
}

.card3-left-content {
  margin-left: 25px;
  margin-top: 5px;
}

.card3-right-content {
  margin-right: 15px;
  margin-top: 5px;
}

.card3-number-container {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 3px;
}

.card3-number-text1 {
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: #9ba9f7 0 0 8px;
}

.card3-number-text2 {
  font-size: 16px;
  font-weight: bold;
  color: #d3c9c9;
  text-shadow: #6177f3 0 0 8px;
}

.card3-label-container {
  position: relative;
  display: inline-block;
  /* 让文字和背景条重叠 */
}

.card3-title-text1 {
  position: relative;
  font-size: 16px;
  font-family: SimHei;
  font-weight: bold;
  color: #ffffff;
  z-index: 2;
}

.card3-title-text-background {
  position: absolute;
  top: 90%;
  right: 10%;
  transform: translateY(-50%);
  /* 垂直居中 */
  background: linear-gradient(
    to right,
    rgba(62, 202, 185, 0.9),
    rgba(55, 93, 96, 0.3)
  );
  width: 100%;
  height: 10px;
  z-index: 1;
  /* 确保背景条在文字下方 */
}

.card4-top-content {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
  margin-top: 5px;
  margin-left: 5px;
}

.card4-top-svg-container {
  background-color: #7dbcdf;
  /* 圆形背景颜色 */
  border-radius: 50%;
  /* 圆形 */
  padding: 0px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  z-index: 999;
}

.card4-top-svg-container svg {
  width: 25px;
  height: 25px;
}

.card4-top-text-background {
  flex: 1;
  background: linear-gradient(
    to right,
    rgba(62, 202, 185, 0.9),
    rgba(55, 93, 96, 0.3)
  );
  /* 渐变背景 */
  border-radius: 8px;
  padding: 6px 15px;
  display: flex;
  justify-content: space-between;
  /* 左右两端对齐 */
  align-items: center;
  margin-left: -40px;
  padding-left: 33px;
  width: calc(100% + 30px);
  height: 20px;
}

.card4-top-text1 {
  font-size: 18px;
  font-family: "YSBTHeiTi", sans-serif;
  color: #ffffff;
  text-shadow: #9257f0 0 0 5px;
}

.card4-top-text2 {
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: #566fff 0 0 8px;
  margin-left: 90px;
}

.card4-top-text3 {
  font-size: 15px;
  font-weight: bold;
  color: #7eb2ee;
  text-shadow: #566fff 0 0 8px;
  margin-left: 5px;
}

.card4-item-title-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 12px;
}

.card4-item-title-container img {
  width: 20px;
  height: auto;
}

.card4-item-title-container span {
  font-size: 18px;
  font-family: "YSBTHeiTi", sans-serif;
  color: #ffffff;
}

@font-face {
  font-family: "YSBTHeiTi";
  src: url("@/assets/fonts/YouSheBiaoTiHei-2.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.card4-item-text-background {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: linear-gradient(
    to right,
    rgba(200, 196, 250, 0.3),
    rgba(175, 166, 223, 0.4)
  );
  border-radius: 6px;
  position: relative;
  /* 为左侧矩形定位 */
  gap: 5px;
}

.card4-item-text-background::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0%;
  bottom: 0%;
  width: 6px;
  background-color: #00ffff;
}

.card4-item-content-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 12px;
  margin-right: 12px;
}

.card4-item-content-text1 {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  font-family: "SHJGSK";
}
@font-face {
  font-family: "SHJGSK";
  src: url("@/assets/fonts/ShanHaiJiGuSongKe-JianFan-2.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "ALMMAVF";
  src: url("@/assets/fonts/AlimamaAgileVF-Thin.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "YRDZST";
  src: url("@/assets/fonts/杨任东竹石体.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.card4-item-content-text2 {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-left: 8px;
  font-family: "YRDZST";
}

.card4-item-content-text3 {
  font-size: 14px;
  margin-left: 4px;
  font-family: "YRDZST";
  color: #fff;
}

.card-5 {
  height: 18vh;
  /* 第一个卡片的高度 */
  flex: none;
}

.card5-content {
  display: flex;
  flex-direction: column;
}

.card5-item-top,
.card5-item-middle,
.card5-item-bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
}

.card5-item-top-number {
  font-size: 26px;
  font-weight: bold;
  font-family: "number-font", sans-serif;
  color: #ffffff;
  text-shadow: #566fff 0 0 8px;
}

.card5-item-bottom-text {
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  font-family: "YSBTHeiTi", sans-serif;
}

@font-face {
  font-family: "number-font";
  src: url("@/assets/fonts/number.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.card6-content {
  display: flex;
  flex-direction: column;
}

.card6-item-top-btn-container {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}

.card6-item-top-btn {
  background-color: rgba(79, 99, 113, 0.7);
  color: white;
  border: 1px solid #1ebdd0;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 20px;
  font-family: "YSBTHeiTi", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(3px);
  width: 120px;
  height: 45px;
}

.card6-item-top-btn:hover {
  background-color: rgba(30, 189, 208, 0.7);
  box-shadow: 0 0 8px rgba(30, 189, 208, 0.8);
}

.card6-item-top-btn:focus {
  outline: none;
}

.card6-item-top-btn.active {
  background-color: rgba(30, 189, 208, 0.9);
  box-shadow: 0 0 12px rgba(30, 189, 208, 1);
  border-color: #00bfff;
  color: #ffffff;
}

.card6-item-middle-chart-container {
  flex: 1;
  margin: 5px 0;
  background-color: rgba(79, 99, 113, 0.3);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chart-wrapper {
  flex: 8;
  position: relative;
  overflow: hidden;
}

.legend-wrapper {
  flex: 2;
  padding: 10px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  width: 45%;
  margin: 4px 2.5%;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: center;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 8px;
}

.legend-text {
  font-size: 13px;
  color: #ffffff;
  white-space: nowrap;
  font-family: "SimHei";
  font-weight: bold;
}

.chart-iframe {
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
}

.card6-item-bottom-excel-container {
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 8px;
}

.excel-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 191, 255, 0.3);
}

.excel-table thead {
  background: rgba(0, 180, 200, 0.5);
  /* 表头蓝绿色渐变 */
}

.excel-table th,
.excel-table td {
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-family: "SHJGSK";
}

.excel-table tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.15);
  /* 隔行变色 */
}

.excel-table tbody tr:hover {
  background: rgba(4, 209, 231, 0.8);
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 0 10px rgba(99, 55, 202, 0.5);
}

.header {
  position: relative;
  text-align: center;
  height: 7vh;
}

.header-text {
  position: absolute;
  top: 37%;
  left: 50.3%;
  transform: translate(-50%, -50%);
  font-size: 39px;
  color: white;
  text-align: center;
  z-index: 10;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  font-family: "YSBTHeiTi", sans-serif;
  white-space: nowrap;
  letter-spacing: 5px;
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

.top-menu-icon-item:hover {
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

.defect-detail-card {
  position: absolute;
  transform: translateY(-100%);
  background-color: rgba(79, 99, 113, 0.7);
  border: 2px solid rgba(248, 248, 248, 0.8);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
  padding: 16px 20px;
  width: 280px;
  font-size: 14px;
  z-index: 999;
  backdrop-filter: blur(6px);
  transition: transform 0.3s ease;
  pointer-events: auto;
  user-select: none;
  cursor: grab;
}

.defect-image img {
  user-select: none; /* 禁止选中 */
  -webkit-user-drag: none; /* 禁止拖动（Safari/Chrome） */
}

.defect-detail-card:active {
  cursor: grabbing;
}

.defect-detail-card:hover {
  transform: translateY(-101%);
}

.defect-detail-header {
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

.defect-detail-body p {
  margin: 6px 0;
  font-family: "SHJGSK";
  color: #ffffff;
}

.defect-image img {
  width: 100%;
  border-radius: 8px;
  margin-top: 8px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tool-actions-wrapper {
  position: fixed;
  left: calc(4vw);
  transition: opacity 0.3s;
  z-index: 1001;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.tool-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: v-bind(toolActionsGap);
  background: linear-gradient(
    to bottom,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #4aadce;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  max-height: 82px;
}

.light-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 12px;
  border-radius: 8px;
  backdrop-filter: blur(2px);
}

/* 标签 */
.light-label {
  font-size: 14px;
  color: #ffffff;
  white-space: nowrap;
}

.elevation-box,
.light-box {
  background: linear-gradient(
    to bottom,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #4aadce;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.tool-action-btn {
  padding: 6px 12px;
  background: linear-gradient(
    to bottom,
    rgba(49, 141, 169, 0.5),
    rgba(79, 99, 113, 0.5)
  );
  color: white;
  border: 1px solid #2d687c;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  backdrop-filter: blur(2px);
}

.tool-action-btn:hover {
  background: linear-gradient(
    to bottom,
    rgba(150, 180, 209, 0.7),
    rgba(121, 151, 161, 0.7)
  );
  box-shadow: 0 0 8px rgba(0, 191, 255, 0.6);
}

:deep(.elevation-input .el-input__inner) {
  color: white;
}

:deep(.elevation-input) {
  width: 150px;
  height: 32px;
}

:deep(.elevation-input .el-input-number__increase),
:deep(.elevation-input .el-input-number__decrease) {
  width: 22px;
  background: linear-gradient(
    to bottom,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  color: white;
  border: 1px solid #aaa4a4;
}

:deep(.elevation-input .el-input-number__increase:hover),
:deep(.elevation-input .el-input-number__decrease:hover) {
  background-color: #005f8a;
}

:deep(.elevation-input .el-input__wrapper) {
  background: linear-gradient(
    to bottom,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  border: 1px solid #2d687c;
}

.light-row {
  --el-select-border-color: #1ebdd0;
  --el-select-hover-border-color: #40c4d6;
  --el-select-focus-border-color: #00ffff;
}

.light-row :deep(.el-select__wrapper) {
  background-color: rgba(91, 140, 173, 0.6) !important;
  border: 1px solid #1ebdd0 !important;
  border-radius: 6px !important;
  box-shadow: #b5bbda 0 0 3px !important;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
  height: 28px;
  min-width: 150px;
}

.light-row :deep(.el-select__wrapper:hover) {
  background-color: rgba(128, 136, 211, 0.8) !important;
}

.light-row :deep(.el-select__placeholder) {
  color: #ffffff !important;
  font-family: "YRDZST", sans-serif !important;
  font-size: 15px !important;
}

.light-row :deep(.el-input-tag) {
  background-color: rgba(91, 140, 173, 0.6) !important;
}

.light-row :deep(.el-input-tag__wrapper) {
  background-color: #5b8cad99 !important;
  border: 1px solid #1ebdd0 !important;
  border-radius: 6px !important;
  box-shadow: #b5bbda 0 0 3px !important;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
  min-height: 28px;
  min-width: 150px;
}

.light-row :deep(.el-input-tag input::placeholder) {
  color: #c9b4b4 !important;
  font-family: "SHJGSK", sans-serif !important;
  font-size: 12px !important;
}

.light-row :deep(.el-input-tag .el-tag) {
  background-color: #1ebdd0 !important; /* 自定义颜色 */
  border-color: #5b8cad !important;
}

.light-row :deep(.el-select__selected-item) {
  color: #ffffff !important;
  font-family: "YRDZST", sans-serif !important;
  font-size: 13px !important;
  font-weight: 600;
}

:deep(.light-row .el-input__inner) {
  color: white;
}

:deep(.light-row) {
  height: 32px;
}

:deep(.light-row .el-input-number__increase),
:deep(.light-row .el-input-number__decrease) {
  width: 22px;
  background: linear-gradient(
    to bottom,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  color: white;
  border: 1px solid #aaa4a4;
}

:deep(.light-row .el-input-number__increase:hover),
:deep(.light-row .el-input-number__decrease:hover) {
  background-color: #005f8a;
}

:deep(.light-row .el-input__wrapper) {
  background: linear-gradient(
    to bottom,
    rgba(49, 141, 169, 0.7),
    rgba(79, 99, 113, 0.7)
  );
  border: 1px solid #2d687c;
  height: 28px;
}
</style>