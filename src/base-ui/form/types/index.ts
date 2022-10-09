import { FormRules } from 'element-plus'
type TFormType = 'input' | 'password' | 'select' | 'datepicker'
type TSelectOption = 'label' | 'value'

export interface IFormItem {
  field: string
  type: TFormType
  label: string
  rules?: FormRules
  placeholder?: string
  // 针对select
  options?: Record<TSelectOption, string>[]
  otherAttrs?: Record<string, any>
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  formLabelWidth?: string
  layoutCol?: Record<string, number>
  formItemStyle?: Record<string, string>
}
