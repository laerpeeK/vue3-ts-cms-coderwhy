import { IDepartment } from '@/service/system/type'

export interface IDepartmentState {
  departmentList: IDepartment[]
  departmentCount: number
}

export type TSystemState = IDepartmentState
