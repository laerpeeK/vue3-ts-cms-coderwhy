<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/LoginPanel.vue'
export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/img/login-bg.svg');

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
