<template>
  <div class="role-container">
    <div class="role-search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @selectBtnClick="handleSelectClick"
      ></page-search>
    </div>
    <div class="role-list">
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="role"
        ref="pageContentRef"
        @createBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></page-content>
    </div>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="role"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
    >
      <div class="role-menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        ></el-tree>
      </div>
    </page-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { ElTree } from 'element-plus'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menus'
export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleSelectClick] =
      usePageSearch()

    const editCallback = (item?: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      handleResetClick,
      handleSelectClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      elTreeRef,
      menus,
      handleCheckChange,
      otherInfo
    }
  }
})
</script>
<style lang="scss">
.role-list {
  border-top: 2rem solid #f5f5f5;
}

.role-menu-tree {
  margin-left: 2.5rem;
}
</style>
