<template>
  <div class="login-account">
    <el-form :rules="rules" :model="formData" label-width="6rem" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue'
import { rules } from '../config/account-config'
import type { FormInstance } from 'element-plus'
import type { IAccountForm } from '../types'
export default defineComponent({
  emits: ['update:account'],
  props: {
    account: {
      type: Object as PropType<IAccountForm>,
      required: true
    }
  },
  setup(props, { emit }) {
    const formData = ref({ ...props.account })
    const formRef = ref<FormInstance>()

    watch(
      formData,
      (newValue) => {
        emit('update:account', newValue)
      },
      { deep: true }
    )

    /**
     * account: 账号密码
     * rules: 账号密码登录校验规则
     * formRef: el-form实例
     */
    return {
      rules,
      formData,
      formRef
    }
  }
})
</script>

<style></style>
