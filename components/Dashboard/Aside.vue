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
        <div class="flex w-full justify-center space-y-2">
          <button @click="toggleMenu">
            <vs-avatar>
              <img v-if="user?.picture" :src="user.picture" />
              <UserIcon v-else />
            </vs-avatar>
          </button>
        </div>
      </template>
    </vs-sidebar>

    <transition name="fade">
      <section
        v-if="menu"
        class="absolute top-0 left-0 z-[9002] h-screen w-full bg-black bg-opacity-50 p-20"
        @click.self="toggleMenu"
      >
        <div class="h-full w-fit bg-white"><button>xd</button></div>
      </section>
    </transition>
  </aside>
</template>
<script>
export default {
  data() {
    let active = this.$route.name.split('-')[1]
    if (!active) active = 'home'
    return {
      active,
      menu: false,
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
  methods: {
    toggleMenu() {
      this.menu = !this.menu
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
