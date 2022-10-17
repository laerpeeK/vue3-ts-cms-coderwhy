import { IForm } from '@/base-ui/form'
export const modalConfig: IForm = {
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
      field: 'parentId',
      type: 'select',
      label: '隶属部门',
      options: []
    }
  ],
  layoutCol: {
    span: 24
  }
}
