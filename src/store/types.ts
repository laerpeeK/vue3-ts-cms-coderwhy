import { ILoginState } from './login/types'
import { IMainState } from './main/types'
import { IDeparmentList, IRoleList, IMenuList } from '@/service/main/types'
export interface IRootState {
  entireDepartment: IDeparmentList[]
  entireRole: IRoleList[]
  entireMenu: IMenuList[]
}

export interface IRootWithModule {
  login: ILoginState
  main: IMainState
}

export type IStoreType = IRootState & IRootWithModule
