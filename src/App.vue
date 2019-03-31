<template>
  <div class="app">
    <MainHeader/>
    <div class="app-body">
      <MainSidebar/>
      <main class="main">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Home</li>
          <li class="breadcrumb-item"><a href="#">Admin</a></li>
          <li class="breadcrumb-item active">Dashboard</li>
          <li class="breadcrumb-menu d-md-down-none">
            <div class="btn-group" role="group" aria-label="Button group">
            <a class="btn" href="#">
            <i class="icon-speech"></i>
            </a>
            <a class="btn" href="./">
            <i class="icon-graph"></i> &nbsp;Dashboard</a>
            <a class="btn" href="#">
            <i class="icon-settings"></i> &nbsp;Settings</a>
            </div>
          </li>
        </ol>
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
