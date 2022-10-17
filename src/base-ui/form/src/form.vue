<template>
  <div class="hy-form">
    <div class="hy-form__header">
      <slot name="header"></slot>
    </div>
    <div class="hy-form__content">
      <el-form :label-width="formLabelWidth">
        <el-row>
          <template v-for="item in formItems" :key="item.label">
            <el-col v-bind="layoutCol">
              <el-form-item
                :label="item.label"
                :rules="item.rules"
                :style="formItemStyle"
                v-if="!item.isHidden"
              >
                <template
                  v-if="item.type === 'input' || item.type === 'password'"
                >
                  <el-input
                    :placeholder="item.placeholder"
                    v-bind="item.otherAttrs"
                    :show-password="item.type === 'password'"
                    v-model="formData[`${item.field}`]"
                  />
                </template>
                <template v-else-if="item.type === 'select'">
                  <el-select
                    :placeholder="item.placeholder"
                    v-bind="item.otherAttrs"
                    style="width: 100%"
                    v-model="formData[`${item.field}`]"
                  >
                    <el-option
                      v-for="option in item.options"
                      :key="option.label"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </template>
                <template v-else-if="item.type === 'datepicker'">
                  <el-date-picker
                    v-bind="item.otherAttrs"
                    style="width: 100%"
                    v-model="formData[`${item.field}`]"
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <div class="hy-form__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    formLabelWidth: {
      type: String,
      default: '100px'
    },
    formItemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    layoutCol: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )
    return {
      formData
    }
  }
})
</script>
<style lang="scss">
.hy-form__header {
  margin-bottom: 2rem;
  h1 {
    font-size: 2rem;
  }
}
</style>
