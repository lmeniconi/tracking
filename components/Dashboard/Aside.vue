<template>
  <aside>
    <vs-sidebar v-model="active" absolute hover-expand reduce open>
      <template #logo> <BoxIcon /> </template>

      <vs-sidebar-item id="home">
        <template #icon>
          <HomeIcon />
        </template>
        Inicio
      </vs-sidebar-item>
      <vs-sidebar-item id="users">
        <template #icon> <UserIcon /> </template>
        Usuarios
      </vs-sidebar-item>
      <vs-sidebar-item id="projects">
        <template #icon>
          <GeometryIcon />
        </template>
        Proyectos
      </vs-sidebar-item>
      <vs-sidebar-item id="posts">
        <template #icon>
          <BrandDisqusIcon />
        </template>
        Posts
      </vs-sidebar-item>

      <template #footer>
        <vs-row>
          <vs-avatar>
            <img v-if="user && user.picture" :src="user.picture" />
            <UserIcon v-else />
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>
  </aside>
</template>

<script>
export default {
  data() {
    let active = this.$route.name.split('-')[1]
    if (!active) active = 'home'
    return {
      active,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  watch: {
    active() {
      const path = this.active === 'home' ? '/' : `/${this.active}`
      this.$router.push('/admin' + path)
    },
    $route() {
      let active = this.$route.name.split('-')[1]
      if (!active) active = 'home'
      this.active = active
    },
  },
}
</script>
