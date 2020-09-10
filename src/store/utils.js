import store from './'

export function createAccessors(namespace = '') {
  return (names = []) => {
    const nameList = Array.isArray(names) ? names : [names]
    return nameList.reduce((acc, name) => {
      return {
        ...acc,
        [name]: {
          get() {
            return store.state[namespace][name]
          },

          set(value) {
            store.dispatch(namespace + '/' + name, value)
          }
        }
      }
    }, {})
  }
}
