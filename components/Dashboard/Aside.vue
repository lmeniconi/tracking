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
      <vs-sidebar-item id="applications">
        <template #icon> <AppsIcon /> </template>
        Aplicaciones
      </vs-sidebar-item>

      <template #footer>
        <div class="flex w-full justify-center">
          <vs-avatar>
            <img v-if="user?.picture" :src="user.picture" />
            <UserIcon v-else />
          </vs-avatar>
        </div>
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
      this.$router.push('/dashboard' + path)
    },
    $route() {
      let active = this.$route.name.split('-')[1]
      if (!active) active = 'home'
      this.active = active
    },
  },
}
</script>
