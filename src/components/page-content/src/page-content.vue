<template>
  <div class="page-content">
    <hy-table
      :listData="listData"
      :listCount="listCount"
      :propList="contentTableConfig.propList"
      :title="contentTableConfig.title"
      :showIndexColumn="contentTableConfig.showIndexColumn"
      :showSelectColumn="contentTableConfig.showSelectColumn"
      :childrenProps="contentTableConfig.childrenProps"
      :showPagination="contentTableConfig.showPagination"
      v-model:pageInfo="pageInfo"
    >
      <template #tableHandler v-if="contentTableConfig.tableHandlerText">
        <el-button
          v-if="isCreate"
          type="primary"
          size="default"
          @click="handleCreateClick"
          >{{ contentTableConfig.tableHandlerText }}</el-button
        >
        <el-button icon="refresh" @click="handleRefreshClick"></el-button>
      </template>
      <template #createAt="scope">
        <span v-date-format.formatRule="'YYYY-MM-DD HH:mm:ss'">
          {{ scope.row.createAt }}
        </span>
      </template>
      <template #updateAt="scope">
        <span v-date-format.formatRule="'YYYY-MM-DD HH:mm:ss'">
          {{ scope.row.updateAt }}
        </span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            icon="Edit"
            size="small"
            type="primary"
            text
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="delete"
            size="small"
            type="danger"
            text
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </hy-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import HyTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'
import { IUserList, IMenuList, IGoodList } from '@/service/main/types'
export default defineComponent({
  emits: ['createBtnClick', 'editBtnClick'],
  components: {
    HyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    const getPageData = (queryInfo?: Record<string, any>) => {
      if (!isQuery) return
      store.dispatch('main/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    watch(
      pageInfo,
      () => {
        getPageData()
      },
      { immediate: true }
    )

    // 表格填充数据
    const listData = computed(() => {
      return store.getters[`main/pageListData`](props.pageName)
    })

    const listCount = computed(() => {
      return store.getters['main/pageListCount'](props.pageName)
    })

    // 页面独立插槽
    const otherPropsSlots: Record<string, string>[] =
      props.contentTableConfig?.propList.filter(
        (item: Record<string, string>) => {
          return (
            item.slotName &&
            ['createAt', 'updateAt', 'handler'].includes(item.slotName) ===
              false
          )
        }
      )

    const handleRefreshClick = () => {
      getPageData()
    }

    const handleCreateClick = () => {
      emit('createBtnClick')
    }

    const handleEditClick = (item: IUserList | IMenuList | IGoodList) => {
      emit('editBtnClick', item)
    }

    const handleDeleteClick = (item: IUserList | IMenuList | IGoodList) => {
      store.dispatch('main/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    return {
      isCreate,
      isUpdate,
      isDelete,
      pageInfo,
      listData,
      listCount,
      otherPropsSlots,
      getPageData,
      handleRefreshClick,
      handleCreateClick,
      handleEditClick,
      handleDeleteClick
    }
  }
})
</script>
<style lan="scss" scoped>
.handle-btns {
  display: flex;
  justify-content: center;
}
</style>
