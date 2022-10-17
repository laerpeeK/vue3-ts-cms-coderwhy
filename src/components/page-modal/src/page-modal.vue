<template>
  <div class="page-modal">
    <el-dialog
      v-model="showDialog"
      center
      destroy-on-close
      width="30%"
      :title="title"
    >
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import HyForm from '@/base-ui/form'
import en2zhMap from '@/utils/map-en2zh'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    HyForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    catalog: {
      type: String,
      default: 'main'
    }
  },
  setup(props) {
    const store = useStore()
    const showDialog = ref(false)
    const handleName = ref<string>('')
    const formData = ref<any>({})
    const title = computed(
      () => `${en2zhMap.get(handleName.value!)}${en2zhMap.get(props.pageName)}`
    )

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const handleConfirmClick = () => {
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch(`${props.catalog}/editPageDataAction`, {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        store.dispatch(`${props.catalog}/createPageDataAction`, {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
      showDialog.value = false
    }

    return {
      showDialog,
      title,
      formData,
      handleName,
      handleConfirmClick
    }
  }
})
</script>
