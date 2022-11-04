export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async fetchUser({ commit, state }, { redirect = false, refresh = false }) {
    if (!refresh && state.user) return

    try {
      const user = await this.$axios.$get('/me')
      commit('setUser', user)
    } catch {
      if (redirect) {
        localStorage.setItem('redirectUri', this.$router.history.current.path)
        this.$router.push('/auth/auth0')
      }
    }
  },
}
