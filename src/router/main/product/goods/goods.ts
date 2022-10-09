const goods = () =>
  import(/* webpackChunkName: "goods" */ '@/views/main/product/goods/goods.vue')

export default {
  path: '/main/product/goods',
  name: 'goods',
  component: goods,
  children: []
}
