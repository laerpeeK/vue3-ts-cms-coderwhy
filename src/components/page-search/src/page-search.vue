<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="search" @click="handleSearchClick">
            搜索
          </el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import HyForm from '@/base-ui/form'
import { IForm } from '@/base-ui/form'
export default defineComponent({
  components: {
    HyForm
  },
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  emits: ['resetBtnClick', 'selectBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []

    const formOriginData: Record<string, any> = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)

    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData.key
      }
      emit('resetBtnClick')
    }

    const handleSearchClick = () => {
      const formDataNotNull: Record<string, any> = {}
      for (const key in formData.value) {
        if (formData.value[`${key}`]) {
          formDataNotNull[`${key}`] = formData.value[`${key}`]
        }
      }
      emit('selectBtnClick', formDataNotNull)
    }
    return {
      formData,
      handleResetClick,
      handleSearchClick
    }
  }
})
</script>
<style lang="scss" scoped>
.page-search {
  padding-top: 2.2rem;
}

.handle-btns {
  text-align: right;
  padding: 0 5rem 2rem 0;
}
</style>
