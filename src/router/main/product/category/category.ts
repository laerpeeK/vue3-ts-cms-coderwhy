const category = () =>
  import(
    /* webpackChunkName: "category" */ '@/views/main/product/category/category.vue'
  )

export default {
  path: '/main/product/category',
  name: 'category',
  component: category,
  children: []
}
