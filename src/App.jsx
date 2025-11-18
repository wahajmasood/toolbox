import { useState, useRef, useEffect } from 'react'
import * as React from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import ToolboxModel from './components/ToolboxModel'
import Controls from './components/Controls'
import InfoPanel from './components/InfoPanel'
import ModelInspector from './components/ModelInspector'
import './App.css'

function CameraLogger({ onCameraMove }) {
  const { camera } = useThree()
  const controlsRef = useRef()

  const logCameraPosition = () => {
    console.log('📷 Camera State:', {
      position: { x: camera.position.x.toFixed(3), y: camera.position.y.toFixed(3), z: camera.position.z.toFixed(3) },
      rotation: { x: camera.rotation.x.toFixed(3), y: camera.rotation.y.toFixed(3), z: camera.rotation.z.toFixed(3) },
      target: controlsRef.current ? {
        x: controlsRef.current.target.x.toFixed(3),
        y: controlsRef.current.target.y.toFixed(3),
        z: controlsRef.current.target.z.toFixed(3)
      } : 'N/A'
    })
  }

  // Expose controls and camera to parent after mount
  React.useEffect(() => {
    if (onCameraMove && controlsRef.current) {
      onCameraMove({ camera, controls: controlsRef.current })
    }
  }, [camera, onCameraMove])

  return (
    <OrbitControls
      ref={controlsRef}
      onChange={logCameraPosition}
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={30}
      maxPolarAngle={Math.PI / 2}
    />
  )
}

function App() {
  const [wireframe, setWireframe] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  const [selectedPart, setSelectedPart] = useState(null)
  const cameraRef = useRef({ camera: null, controls: null })

  const handleCameraMove = ({ camera, controls }) => {
    cameraRef.current = { camera, controls }
  }

  const handlePartClick = (partName, isOpening) => {
    setSelectedPart(partName)

    console.log('🎯 Part clicked:', partName, 'isOpening:', isOpening)
    console.log('📦 Camera ref:', cameraRef.current)

    // Camera animation helper function
    const animateCamera = (targetPosition, targetTarget) => {
      if (!cameraRef.current.camera || !cameraRef.current.controls) {
        console.error('❌ Camera or controls not available!')
        return
      }

      const { camera, controls } = cameraRef.current
      console.log('✅ Camera and controls found, starting animation...')

      const startPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
      const startTarget = { x: controls.target.x, y: controls.target.y, z: controls.target.z }

      console.log('📍 Start position:', startPosition)
      console.log('🎯 Target position:', targetPosition)

      const duration = 1000
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Smooth easing
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2

        // Interpolate camera position
        camera.position.x = startPosition.x + (targetPosition.x - startPosition.x) * eased
        camera.position.y = startPosition.y + (targetPosition.y - startPosition.y) * eased
        camera.position.z = startPosition.z + (targetPosition.z - startPosition.z) * eased

        // Interpolate controls target
        controls.target.x = startTarget.x + (targetTarget.x - startTarget.x) * eased
        controls.target.y = startTarget.y + (targetTarget.y - startTarget.y) * eased
        controls.target.z = startTarget.z + (targetTarget.z - startTarget.z) * eased

        controls.update()

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          console.log('✅ Camera animation complete!')
          console.log('📷 Final position:', { x: camera.position.x, y: camera.position.y, z: camera.position.z })
        }
      }

      animate()
    }

    // If Cube010_1 is clicked, move camera to specific position
    if (partName === 'Cube010_1') {
      console.log('🔍 Cube010_1 clicked, checking camera ref...')
      animateCamera(
        { x: 0.162, y: 2.847, z: 9.490 },
        { x: 0, y: 0, z: 0 }
      )
    } else if (partName === 'Curve001_1') {
      console.log('🔍 Curve001_1 clicked, moving camera...')
      animateCamera(
        { x: -0.328, y: 1.367, z: 6.776 },
        { x: 0, y: 0, z: 0 }
      )
    } else if (partName === 'Cube034' || partName === 'Cube034_1') {
      console.log('🔍 Cube034/Cube034_1 clicked, moving camera...', 'isOpening:', isOpening)
      if (isOpening) {
        // Opening - move to top view
        animateCamera(
          { x: 0.048, y: 7.626, z: 3.445 },
          { x: 0, y: 0, z: 0 }
        )
      } else {
        // Closing - move to side view
        animateCamera(
          { x: -0.328, y: 1.367, z: 6.776 },
          { x: 0, y: 0, z: 0 }
        )
      }
    } else if (partName === 'Cube010_2') {
      console.log('🔍 Cube010_2 clicked, moving camera to default position...')
      animateCamera(
        { x: -0.066, y: 4.303, z: 8.925 },
        { x: 0, y: 0, z: 0 }
      )
    }
  }

  return (
    <div className="app-container">
      <InfoPanel selectedPart={selectedPart} />

      <Canvas
        camera={{ position: [-0.066, 4.303, 8.925], fov: 50 }}
        shadows
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.3} />

        {/* Environment for realistic reflections */}
        <Environment preset="city" />

        {/* Model Inspector - logs structure to console */}
        <ModelInspector />

        {/* 3D Model */}
        <ToolboxModel
          wireframe={wireframe}
          onPartClick={handlePartClick}
        />

        {/* Ground shadow */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />

        {/* Camera controls with logging */}
        <CameraLogger onCameraMove={handleCameraMove} />
      </Canvas>

      <Controls
        wireframe={wireframe}
        autoRotate={autoRotate}
        onToggleWireframe={() => setWireframe(!wireframe)}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
      />
    </div>
  )
}

export default App
