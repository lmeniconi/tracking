export default async function ({ store }) {
  await store.dispatch('auth/fetchUser', {
    redirect: true,
  })
}
