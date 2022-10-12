import axRequest from '../index'
import { IDataType } from '../types'
import { IPageListData, IPageListQueryInfo } from './types'
import {
  IGoodsCategoryCount,
  IGoodsCategorySale,
  IGoodsCategoryFavor,
  IGoodsAddressSale
} from './types'
enum DashboardAPI {
  goodsCategoryCount = 'category/count',
  goodsCategorySale = 'category/sale',
  goodsCategoryFavor = 'category/favor',
  goodsAddressSale = 'address/sale'
}
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

export function getGoodsCategoryCount() {
  return axRequest.get<IDataType<IGoodsCategoryCount>>({
    url: '/goods/' + DashboardAPI.goodsCategoryCount
  })
}

export function getGoodsCategorySale() {
  return axRequest.get<IDataType<IGoodsCategorySale>>({
    url: '/goods/' + DashboardAPI.goodsCategorySale
  })
}

export function getGoodsCategoryFavor() {
  return axRequest.get<IDataType<IGoodsCategoryFavor>>({
    url: '/goods/' + DashboardAPI.goodsCategoryFavor
  })
}

export function getGoodsAddressSale() {
  return axRequest.get<IDataType<IGoodsAddressSale>>({
    url: '/goods/' + DashboardAPI.goodsAddressSale
  })
}
