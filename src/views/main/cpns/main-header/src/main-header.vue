<template>
  <div class="nav-header">
    <div class="nav-header__icon">
      <el-icon class="nav-header__icon fold-icon" :size="28">
        <component :is="isFold ? 'Fold' : 'Expand'" @click="handleIconClick" />
      </el-icon>
    </div>
    <div class="nav-header__content">
      <el-breadcrumb separator="/">
        <template v-for="item in breadcrumbs" :key="item.name">
          <el-breadcrumb-item :to="item.path">{{
            item.name
          }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
      <el-dropdown>
        <span class="dropdown-tag">
          <strong>{{ userInfo.name }}</strong>
          <el-icon><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-item icon="CircleClose" @click="handleExitClick">
            退出登录
          </el-dropdown-item>
          <el-dropdown-item icon="Postcard">用户信息</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import localCache from '@/utils/cache'
import { pathMapBreadCrumbs } from '@/utils/map-menus'
import { IUserInfoData } from '@/service/login/type'
export default defineComponent({
  emits: ['foldChange'],
  setup(prop, { emit }) {
    const store = useStore()
    const userInfo = computed(() => {
      return store.state.login.userInfo
    }) as unknown as IUserInfoData

    const router = useRouter()
    const route = useRoute()

    const isFold = ref(false)

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return pathMapBreadCrumbs(userMenus, currentPath)
    })

    const handleIconClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }

    /**
     * @userInfo 当前登录用户信息
     * @isFold 是否折叠
     * @breadcrumbs 面包屑数据列表
     * @handleIconClick 点击折叠图标处理函数
     * @handleExitClick 点击退出登录处理函数
     */
    return {
      userInfo,
      isFold,
      breadcrumbs,
      handleIconClick,
      handleExitClick
    }
  }
})
</script>
<style lang="scss">
.nav-header {
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__icon {
    cursor: pointer;
  }

  &__content {
    width: 100%;
    display: flex;
    padding-left: 1rem;
    justify-content: space-between;
  }
}

.el-dropdown {
  cursor: pointer;
}
</style>
