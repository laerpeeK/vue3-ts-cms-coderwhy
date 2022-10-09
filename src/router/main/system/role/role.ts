const role = () =>
  import(/* webpackChunkName: "role" */ '@/views/main/system/role/role.vue')

export default {
  path: '/main/system/role',
  name: 'role',
  component: role,
  children: []
}
