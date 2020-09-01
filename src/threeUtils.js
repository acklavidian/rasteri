import { Vector3 } from 'three'

export function threeCursorPosition(camera, mouseEvent) {
  const vec = new Vector3() // create once and reuse
  const pos = new Vector3() // create once and reuse

  vec.set(
    (mouseEvent.clientX / window.innerWidth) * 2 - 2,
    -(mouseEvent.clientY / window.innerHeight) * 2 + 2,
    0.5
  )

  vec.unproject(camera)

  vec.sub(camera.position).normalize()

  const distance = -camera.position.z / vec.z
  pos.copy(camera.position).add(vec.multiplyScalar(distance))
  return pos
}

export function getOffset(el) {
  let x = 0
  let y = 0

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft
    y += el.offsetTop - el.scrollTop
    el = el.offsetParent
  }

  return { y, x }
}
