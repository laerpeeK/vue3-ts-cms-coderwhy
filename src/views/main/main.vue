<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '60px' : '210px'" class="main-aside">
        <main-menu :isCollapse="isCollapse"></main-menu>
      </el-aside>
      <el-container class="main-content">
        <el-header class="main-content__header">
          <main-header @foldChange="handleFoldChange"></main-header>
        </el-header>
        <el-main class="main-content__context">
          <div class="main-content__info">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import MainMenu from './cpns/main-menu'
import MainHeader from './cpns/main-header'
export default defineComponent({
  components: {
    MainMenu,
    MainHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    /**
     * @ref isCollapse 是否水平折叠收起菜单
     */
    return {
      isCollapse,
      handleFoldChange
    }
  }
})
</script>
<style lang="scss" scoped>
.main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  & > * {
    height: 100%;
  }
}

.main-aside {
  overflow-x: hidden;
  overflow-y: auto;
  // line-height: 20rem;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.main-content__header {
  height: 4.8rem;
  color: #333;
}

.main-content__context {
  height: calc(100% - 4.8rem);
  background-color: #f0f2f5;
  color: #333;
  text-align: center;
}

.main-content__info {
  border-radius: 0.2rem;
  background-color: #fff;
  font-size: 1.6rem;
}
</style>
