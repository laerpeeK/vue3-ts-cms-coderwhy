import {
  IUserList,
  IRoleList,
  IGoodList,
  IMenuList
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
}
