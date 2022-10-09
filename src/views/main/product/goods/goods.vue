<template>
  <div class="goods-container">
    <div class="goods-list">
      <page-content :contentTableConfig="contentTableConfig" pageName="goods">
        <template #status="scope">
          <el-button
            plain
            :type="scope.row.status ? 'success' : 'danger'"
            size="small"
            >{{ scope.row.status ? '有货' : '缺货' }}</el-button
          >
        </template>
        <template #oldPrice="scope">
          <span>{{ `￥${scope.row.oldPrice}` }}</span>
        </template>
        <template #newPrice="scope">
          <span>{{ `￥${scope.row.newPrice}` }}</span>
        </template>
        <template #image="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
            :preview-teleported="true"
          ></el-image>
        </template>
      </page-content>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>
<style lang="scss"></style>
