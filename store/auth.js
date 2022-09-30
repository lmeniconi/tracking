export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async fetchUser({ commit }, redirect = false) {
    console.log(process.env.API_URL)

    try {
      const user = await this.$axios.$get('/me')
      commit('setUser', user)
    } catch {
      if (redirect) {
        localStorage.setItem('redirectUri', this.$router.history.current.path)
        this.$router.push('auth/auth0')
      }
    }
  },
}
