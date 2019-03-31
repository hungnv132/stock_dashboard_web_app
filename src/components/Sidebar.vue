<template>
    <div class="sidebar">
      <nav class="sidebar-nav">
        <ul class="nav">
          <li class="nav-item">
              <router-link to="/dashboard" class="nav-link" ><i class="nav-icon icon-speedometer"></i> Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <button class="sidebar-minimizer brand-minimizer" type="button"></button>
    </div>
</template>

<script>
export default {
  name: 'MainSidebar',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
