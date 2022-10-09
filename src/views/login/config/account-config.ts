import { FormRules } from 'element-plus'
export const rules: FormRules = {
  name: [
    {
      required: true,
      message: '用户名不能为空!',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9A-Z]{5,10}$/,
      message: '用户名必须满足5-10个字母或数字!',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空!',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9A-Z]{3,10}$/,
      message: '密码必须满足3-10个字母或数字!',
      trigger: 'blur'
    }
  ]
}
