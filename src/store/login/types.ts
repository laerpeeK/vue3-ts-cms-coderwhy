import type { IUserInfoData, TUserMenusData } from '@/service/login/type'
export interface ILoginState {
  token: string
  userInfo: IUserInfoData | unknown
  userMenus: TUserMenusData
  permissions: string[]
}
