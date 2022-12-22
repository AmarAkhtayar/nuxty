<template>
<section class="container">
  <h2>Welcome to my very first NuxtJs application  <span>&#x1F609;</span></h2>
  <p class="subheading">This is a basic nuxtjs app</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <!-- <Tutorial /> -->
</section>
  <!-- <Tutorial /> -->
</template>

<script>
export default {
  name: 'IndexPage',
   head(){
    return{
        title: 'Home Page',
        meta: [
            {name:'description', content: 'This is my home page'}
        ],
    }
  }
}
</script>
