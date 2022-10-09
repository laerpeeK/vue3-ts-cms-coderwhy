export interface IAccountRequest {
  name: string
  password: string
}

export interface ILoginData {
  id: number
  name: string
  token: string
}

export interface IDeparment {
  createAt: string
  id: number
  leader: string
  name: string
  parentId: number | null
  updateAt: string
}

export interface IRole {
  createAt: string
  id: number
  intro: string
  name: string
  updateAt: string
}

export interface IUserInfoData {
  cellPhone: number
  createAt: string
  department: IDeparment
  enable: boolean
  id: number
  name: string
  realname: string
  role: IRole
  updateAt: string
}

export interface IMenu {
  children: IMenu[] | []
  icon: string
  id: number
  name: string
  sort: number
  type: number
  url: string
  permission?: string
}

export type TUserMenusData = IMenu[] | []
