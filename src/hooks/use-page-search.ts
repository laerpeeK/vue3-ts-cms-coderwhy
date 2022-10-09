import { ref, Ref } from 'vue'
import PageContent from '@/components/page-content'

type TUsePageSearch = [
  Ref<any>,
  () => void,
  (queryInfo?: Record<string, any>) => void
]

export function usePageSearch(): TUsePageSearch {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleResetClick = () => {
    const pageInfo = pageContentRef.value!.pageInfo!
    pageInfo.currentPage = 1
    pageInfo.pageSize = 10
    pageContentRef.value?.getPageData()
  }

  const handleSelectClick = (queryInfo?: Record<string, any>) => {
    const pageInfo = pageContentRef.value!.pageInfo
    pageInfo.currentPage = 1
    pageInfo.pageSize = 10
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleSelectClick]
}
