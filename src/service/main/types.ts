export interface IUserList {
  id: number
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface IRoleList {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: Record<string, any>
}

export interface IGoodList {
  id: number
  name: string
  oldPrice: number
  newPrice: number
  desc: string
  status: number
  imgUrl: string
  inventoryCount: number
  saleCount: number
  favorCount: number
  address: string
  categoryId: number
  createAt: string
  updateAt: string
}

export interface IMenuList {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  createAt: string
  updateAt: string
  children: IMenuList[] | null
}

export interface IDeparmentList {
  id: number
  name: string | null
  parentId: number | null
  createAt: string
  updateAt: string
  leader: string | null
}

type TList = Partial<IUserList> & Partial<IRoleList> & Partial<IGoodList>

export interface IPageListQueryInfo extends TList {
  offset: number
  size: number
}

export interface IPageListData<
  T extends IUserList | IRoleList | IGoodList | IMenuList | IDeparmentList =
    | IUserList
    | IRoleList
    | IGoodList
    | IMenuList
    | IDeparmentList
> {
  list: T[]
  totalCount?: number
}

interface IGoodsCategoryData {
  id: number
  name: string
}

export interface IGoodsCategoryCount extends IGoodsCategoryData {
  goodsCount: number
}

export interface IGoodsCategorySale extends IGoodsCategoryData {
  goodsCount: number
}

export interface IGoodsCategoryFavor extends IGoodsCategoryData {
  goodsFavor: number
}

export interface IGoodsAddressSale {
  address: string
  count: number
}
