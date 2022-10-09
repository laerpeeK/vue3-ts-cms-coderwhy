<template>
  <div class="user-container">
    <div class="user-search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @selectBtnClick="handleSelectClick"
      ></page-search>
    </div>
    <div class="user-list">
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="users"
        ref="pageContentRef"
        @createBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
        <template #enable="scope">
          <el-button
            plain
            :type="scope.row.enable ? 'success' : 'danger'"
            size="small"
            >{{ scope.row.enable ? '正常' : '禁用' }}</el-button
          >
        </template>
      </page-content>
    </div>
    <page-modal
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      pageName="users"
      handleName="edit"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { modalConfig } from './config/modal.config'
import { useStore } from '@/store'
import PageModal from '@/components/page-modal'
export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleSelectClick] =
      usePageSearch()

    const store = useStore()
    const modalConfigRef = computed(() => {
      let departmentItem: any = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id }
      })
      let roleItem: any = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { label: item.name, value: item.id }
      })

      return modalConfig
    })

    const createCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }

    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(createCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleSelectClick,
      modalConfigRef,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>
<style lang="scss">
.user-list {
  border-top: 2rem solid #f5f5f5;
}
</style>
