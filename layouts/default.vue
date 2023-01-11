<template>
  <!-- change the look and feel of your Nuxt app,  include a sidebar or have distinct layouts for mobile and desktop-->
  <div>
    <Nav />
    <Nuxt style="margin-top:50px"/>
  </div>

</template>
<script>
import Nav from './partials/nav.vue'
export default {
  name: 'default',
  components: {
    Nav,
  },
}
</script>
