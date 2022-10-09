<template>
  <div class="menu-list">
    <page-content
      :content-table-config="contentTableConfig"
      pageName="menu"
    ></page-content>
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
