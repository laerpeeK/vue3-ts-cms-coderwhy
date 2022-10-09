<template>
  <div class="hy-table">
    <div class="hy-table__header">
      <div class="table-title">
        <slot name="tableTitle">{{ title }}</slot>
      </div>
      <div class="table-handler">
        <slot name="tableHandler"></slot>
      </div>
    </div>
    <div class="hy-table__content">
      <el-table
        :data="listData"
        border
        style="width: 100%"
        v-bind="childrenProps"
      >
        <el-table-column
          v-if="showSelectColumn"
          type="selection"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <template v-for="item in propList" :key="item.prop">
          <el-table-column
            v-bind="item"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template #default="scope">
              <slot :name="item.slotName" :row="scope.row">
                {{ scope.row[item.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="hy-table__footer" v-if="showPagination">
      <el-pagination
        v-bind="pageInfo"
        :page-sizes="[10, 20, 30, 40]"
        :total="listCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      requried: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<Record<string, any>[]>,
      required: true
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    pageInfo: {
      type: Object as PropType<{ currentPage: number; pageSize: number }>,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:pageInfo'],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: number) => {
      emit('update:pageInfo', { ...props.pageInfo, pageSize })
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    }
    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style lang="scss">
.hy-table {
  padding: 2rem;

  &__header {
    display: flex;
    height: 45px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 2rem;
      font-weight: 700;
    }
  }

  &__footer {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
  }
}

.el-table {
  &:deep(th.el-table__cell),
  :deep(td.el-table__cell) {
    position: static !important;
  }
}
</style>
