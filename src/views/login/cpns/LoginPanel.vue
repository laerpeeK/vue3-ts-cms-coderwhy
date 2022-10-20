<template>
  <div class="login-panel">
    <h1 class="login-panel__title">后台管理系统</h1>
    <div class="login-panel__form">
      <el-tabs
        type="border-card"
        stretch
        v-model="currentTab"
        @tab-click="handleTabClick"
      >
        <el-tab-pane name="account">
          <template #label>
            <span>
              <el-icon><User /></el-icon>
              账号登录
            </span>
          </template>
          <login-account ref="accountRef" v-model:account="account" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span>
              <el-icon><Iphone /></el-icon>
              手机登录
            </span>
          </template>
          <div class="login-phone">Hello phone</div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="login-panel__control">
      <el-checkbox v-model="isRemember">记住{{ rememberKey }}</el-checkbox>
    </div>
    <div class="login-panel__btn">
      <el-button
        type="primary"
        class="login-panel__btn--only"
        @click="handleLoginClick(accountRef)"
      >
        立即登录
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { TabsPaneContext } from 'element-plus'
import { defineComponent, ref, computed } from 'vue'
import LoginAccount from './LoginAccount.vue'
import type { FormInstance } from 'element-plus'
import type { IAccountForm } from '../types'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    LoginAccount
  },
  setup() {
    const store = useStore()
    let currentTab = ref<string>('account')
    let isRemember = ref<boolean>(true)
    let rememberKey = computed<string>(() => {
      return currentTab.value === 'account' ? '账号密码' : '手机号'
    })

    const handleTabClick = (pane: TabsPaneContext) => {
      if (pane.paneName !== currentTab.value) {
        currentTab.value = pane.paneName as string
      }
    }

    // 账号密码相关
    let account = ref<IAccountForm>({
      name: localCache.getCache('name') ?? 'coderwhy',
      password: localCache.getCache('password') ?? '123456'
    })

    const accountRef = ref<InstanceType<typeof LoginAccount>>()

    /**
     * 登录处理
     * @param accountRef 账号密码表单组件
     */
    const handleLoginClick = (
      accountRef: InstanceType<typeof LoginAccount> | undefined
    ) => {
      if (!accountRef) return
      const formRef = accountRef.$refs.formRef as FormInstance
      if (currentTab.value === 'account') {
        formRef.validate((valid) => {
          // 1.满足校验规则
          if (valid) {
            // 2.持久化缓存处理
            const accountCache = [
              { key: 'name', value: account.value.name },
              { key: 'password', value: account.value.password }
            ]
            if (isRemember.value) {
              localCache.setCache(accountCache)
            } else {
              localCache.deleteCache(
                accountCache.map((item) => {
                  return item.key
                })
              )
            }
            // 3.调用登录服务
            store.dispatch('login/accountLoginAction', { ...account.value })
          }
        })
      }
    }

    /**
     * currentTab: 当前选中选项卡的name
     * isRemember: 记住选项是否选中
     * rememberKey: 忘记xx 对应的关键字
     * account: 账号密码
     * accountRef: login-account组件实例
     * handleTabClick: 切换选项卡处理逻辑
     * handleLoginClick: 登录处理逻辑
     */
    return {
      currentTab,
      isRemember,
      rememberKey,
      account,
      accountRef,
      handleTabClick,
      handleLoginClick
    }
  }
})
</script>

<style lang="scss">
.login-panel {
  width: 32rem;
  margin-bottom: 12rem;

  &__title {
    text-align: center;
    font-size: 2.4rem;
    margin-bottom: 1.2rem;
  }

  &__control {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }

  &__btn {
    width: 100%;
    margin-top: 1rem;

    &--only {
      width: 100%;
    }
  }
}
</style>
