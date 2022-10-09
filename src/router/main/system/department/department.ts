const department = () =>
  import(
    /* webpackChunkName: "department" */ '@/views/main/system/department/department.vue'
  )

export default {
  path: '/main/system/department',
  name: 'department',
  component: department,
  children: []
}
