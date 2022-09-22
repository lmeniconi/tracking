export function startLoader(comp) {
  const loader = comp.$vs.loading({
    type: 'points',
  })

  return loader
}
