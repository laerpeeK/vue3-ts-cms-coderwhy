const overview = () =>
  import(
    /* webpackChunkName: "overview" */ '@/views/main/analysis/overview/overview.vue'
  )

export default {
  path: '/main/analysis/overview',
  name: 'overview',
  component: overview,
  children: []
}
