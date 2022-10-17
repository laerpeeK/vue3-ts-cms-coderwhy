export interface IListQuery {
  offset: number
  size: number
}

export interface IDepartment {
  id: number
  name: string
  parentId: number | null
  creatAt: string
  updateAt: string
  leader: string
}

export type TListData<T> = {
  [P in keyof T]: T[P]
}

export interface IPageList<T> {
  list: TListData<T>[]
  totalCount: number
}
