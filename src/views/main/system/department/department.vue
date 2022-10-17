<template>
  <div class="department-container">
    <div class="department-search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @selectBtnClick="handleSelectClick"
      ></page-search>
    </div>
    <div class="department-list">
      <page-content
        :contentTableConfig="contentTableConfig"
        catalog="system"
        pageName="department"
        ref="pageContentRef"
        @createBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></page-content>
    </div>
    <page-modal
      :modalConfig="modalConfigRef"
      pageName="department"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      catalog="system"
    ></page-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleSelectClick] =
      usePageSearch()

    const store = useStore()
    const modalConfigRef = computed(() => {
      let departmentItem: any = modalConfig.formItems.find(
        (item) => item.field === 'parentId'
      )

      departmentItem.options = store.state.system.departmentList.map((item) => {
        return { label: item.name, value: item.id }
      })
      departmentItem.options.push({ label: '无', value: null })

      return modalConfig
    })

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    return {
      contentTableConfig,
      searchFormConfig,
      modalConfigRef,
      pageContentRef,
      handleResetClick,
      handleSelectClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>
<style lang="scss">
.department-list {
  border-top: 2rem solid #f5f5f5;
}
</style>
