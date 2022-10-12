<template>
  <el-card class="hy-card">
    <template #header>
      <div class="hy-card__title">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="hy-card__item">
      <slot></slot>
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.hy-card {
  &:deep(.el-card__header) {
    padding: 1rem 2rem !important;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
  }

  &__item {
    margin-bottom: 1rem;
  }
}
</style>
