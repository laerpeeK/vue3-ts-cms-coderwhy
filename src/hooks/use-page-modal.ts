import { ref } from 'vue'
import PageModal from '@/components/page-modal'
type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleNewData: any = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.showDialog = true
      pageModalRef.value.handleName = 'create'
    }
    newCb && newCb()
  }

  const handleEditData: any = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.showDialog = true
      pageModalRef.value.handleName = 'edit'
    }
    editCb && editCb(item)
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
