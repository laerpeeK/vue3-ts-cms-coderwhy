const dashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */ '@/views/main/analysis/dashboard/dashboard.vue'
  )
export default {
  path: '/main/analysis/dashboard',
  name: 'dashboard',
  component: dashboard,
  children: []
}
