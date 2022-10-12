import {
  IUserList,
  IRoleList,
  IGoodList,
  IMenuList,
  IGoodsAddressSale,
  IGoodsCategoryCount,
  IGoodsCategoryFavor,
  IGoodsCategorySale
} from '@/service/main/types'

export interface IMainState {
  usersList: IUserList[]
  usersCount: number
  roleList: IRoleList[]
  roleCount: number
  goodsList: IGoodList[]
  goodsCount: number
  menuList: IMenuList[]
  menuCount: number
  goodsCategoryCount: IGoodsCategoryCount[]
  goodsCategorySale: IGoodsCategorySale[]
  goodsCategoryFavor: IGoodsCategoryFavor[]
  goodsAddressSale: IGoodsAddressSale[]
}
