import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  formLabelWidth: '90px',
  formItemStyle: {
    padding: '10px 40px'
  },
  layoutCol: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门领导',
      placeholder: '请输入部门领导'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherAttrs: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
