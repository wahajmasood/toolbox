import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function ModelInspector() {
  const { scene } = useGLTF('/toolbox.glb')

  useEffect(() => {
    console.log('=== 3D MODEL STRUCTURE ===')
    console.log('Scene:', scene)

    let index = 0
    scene.traverse((child) => {
      const depth = getDepth(child)
      const indent = depth > 0 ? '  '.repeat(depth) : ''
      const type = child.type
      const name = child.name || '(unnamed)'

      console.log(`${indent}[${index}] ${type}: "${name}"`)

      if (child.isMesh) {
        console.log(`${indent}    → Mesh with geometry and material`)
      }

      index++
    })

    console.log('=== END STRUCTURE ===')
  }, [scene])

  function getDepth(object) {
    let depth = 0
    let current = object.parent
    while (current) {
      depth++
      current = current.parent
    }
    return depth
  }

  return null
}

useGLTF.preload('/toolbox.glb')

