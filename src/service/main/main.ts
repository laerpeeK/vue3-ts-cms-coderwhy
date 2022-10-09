import axRequest from '../index'
import { IDataType } from '../types'
import { IPageListData, IPageListQueryInfo } from './types'
export function getPageListData(url: string, queryInfo: IPageListQueryInfo) {
  return axRequest.post<IDataType<IPageListData>>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return axRequest.delete<IDataType<string>>({
    url: url
  })
}

// url: /users
export function createPageData(
  url: string,
  newData: Record<string, string | number>
) {
  return axRequest.post<IDataType<string>>({
    url: url,
    data: newData
  })
}

// url: /users/id
export function editPageData(
  url: string,
  editData: Record<string, string | number>
) {
  return axRequest.patch<IDataType<string>>({
    url: url,
    data: editData
  })
}
