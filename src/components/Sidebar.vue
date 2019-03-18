<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
          <ul class="nav">
            <li class="nav-item">
                <router-link to="/dashboard" class="nav-link" ><i class="nav-icon icon-speedometer"></i> Dashboard</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="nav-icon icon-speedometer"></i> Companies
              </a>
            </li>
            <li class="nav-title">Stock</li>
            <li class="nav-item nav-dropdown">
              <a class="nav-link" href="#">
                <i class="nav-icon icon-puzzle"></i> Foreign Trade</a>
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
