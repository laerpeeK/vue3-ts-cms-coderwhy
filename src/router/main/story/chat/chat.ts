const chat = () =>
  import(/* webpackChunkName: "chat" */ '@/views/main/story/chat/chat.vue')

export default {
  path: '/main/story/chat',
  name: 'chat',
  component: chat,
  children: []
}
