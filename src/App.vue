<template>
  <div class="app">
    <MainHeader/>
    <div class="app-body">
      <MainSidebar/>
      <main class="main">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-view/>
      </main>
    </div>
    <MainFooter/>
  </div>
</template>

<script>
import MainHeader from '@/components/Header.vue'
import MainFooter from '@/components/Footer.vue'
import MainSidebar from '@/components/Sidebar.vue'

export default {
  components: {
    MainHeader,
    MainFooter,
    MainSidebar
  }
}
</script>


<style lang="scss">
// @import 'assets/css/style.min.css';
@import 'assets/css/app.scss';
</style>
