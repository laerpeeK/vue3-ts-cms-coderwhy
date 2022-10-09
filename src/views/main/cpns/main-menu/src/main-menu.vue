<template>
  <div class="logo">
    <img src="@/assets/img/logo.svg" class="logo__img" />
    <span class="logo__title" v-if="!isCollapse">Vue3 Admin</span>
  </div>
  <el-menu
    :default-active="defaultActive"
    text-color="#b7bdc3"
    active-text-color="#0a60bd"
    class="el-menu-vertical"
    :collapse="isCollapse"
    background-color="#0C2135"
  >
    <template v-for="item in userMenus" :key="item.id">
      <!-- 情况1：两层目录 -->
      <template v-if="item.type === 1">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon.replace('el-icon', '')"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item
              :index="subItem.id + ''"
              @click="handleMenuItemClick(subItem)"
            >
              <el-icon v-if="subItem.icon">
                <component
                  :is="subItem.icon.replace('el-icon', '')"
                ></component>
              </el-icon>
              <span>{{ subItem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <!-- 情况2: 一层目录 -->
      <template v-if="item.type === 2">
        <el-menu-item :index="item.id + ''">
          <el-icon v-if="item.icon">
            <component
              :is="item.icon.replace('el-icon', '')"
              @click="handleMenuItemClick(item)"
            ></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'
import type { IMenu } from '@/service/login/type'
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const userMenus = store.state.login.userMenus
    const router = useRouter()
    const route = useRoute()
    const currentPath = ref<string>(route.path)
    const menu = pathMapToMenu(userMenus, currentPath.value)
    const defaultActive = ref(menu?.id + '')

    const handleMenuItemClick = (item: IMenu) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    /**
     * @userMenus 菜单数据列表
     * @defaultActive 选中菜单项index
     * @handleMenuItemClick 选中菜单项处理函数
     */
    return {
      userMenus,
      defaultActive,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  height: 4.8rem;
  padding: 1.2rem 1rem 0.8rem 1rem;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  &__img {
    height: 100%;
    margin: 0 1rem;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
}

// // 目录
.el-sub-menu {
  background-color: #001529 !important;
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 5rem !important;
    background-color: #0c2135 !important;
  }
}

::v-deep .el-sub-menu__title {
  background-color: #001529 !important;
}

// hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 4.8rem);
}
</style>
