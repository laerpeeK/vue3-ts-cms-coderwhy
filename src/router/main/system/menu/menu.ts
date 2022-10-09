const menu = () =>
  import(/* webpackChunkName: "menu" */ '@/views/main/system/menu/menu.vue')

export default {
  path: '/main/system/menu',
  name: 'menu',
  component: menu,
  children: []
}
