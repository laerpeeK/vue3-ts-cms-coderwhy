import axRequest from '..'
import { IListQuery, IDepartment, IPageList } from './type'
import { IDataType } from '../type'

export function getDepartMentList(url: string, queryInfo: IListQuery) {
  return axRequest.post<IDataType<IPageList<IDepartment>>>({
    url: url,
    data: queryInfo
  })
}

// url: /${pageName}/${id}
export function deleteSystemData(url: string) {
  return axRequest.delete<IDataType<string>>({
    url: url
  })
}

// url: /${pageName}
export function createSystemData(
  url: string,
  newData: Record<string, string | number>
) {
  return axRequest.post<IDataType<string>>({
    url: url,
    data: newData
  })
}

// url: /${pageName}/${id}
export function editSystemData(
  url: string,
  editData: Record<string, string | number>
) {
  return axRequest.patch<IDataType<string>>({
    url: url,
    data: editData
  })
}
