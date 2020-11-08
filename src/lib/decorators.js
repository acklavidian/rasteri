export function cache() {
  return (target, key) => {
    console.log('cache', target, key,)
  }
}