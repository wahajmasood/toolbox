import { useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import ToolboxModel from '../components/ToolboxModel'
import '../App.css'

function Loader() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      zIndex: 1000
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid rgba(255, 255, 255, 0.1)',
        borderTop: '4px solid #ffffff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 16px'
      }}></div>
      <p style={{
        color: '#ffffff',
        fontSize: '14px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeight: '500'
      }}>Loading 3D Model...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

function Home() {
  const cameraRef = useRef({ camera: null, controls: null })
  const [isLoading, setIsLoading] = useState(true)

  const handleCameraMove = ({ camera, controls }) => {
    cameraRef.current = { camera, controls }
  }

  const handlePartClick = (partName, isOpening) => {
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
      {isLoading && <Loader />}
      <Canvas
        camera={{ position: [-0.066, 4.303, 8.925], fov: 50 }}
        shadows
        gl={{ antialias: true }}
        style={{ background: '#2b2b2b' }}
      >
        <Suspense fallback={null}>
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

          {/* 3D Model */}
          <ToolboxModel onPartClick={handlePartClick} onLoad={() => setIsLoading(false)} />

          {/* Camera Controls */}
          <OrbitControls
            ref={(ref) => {
              if (ref) {
                handleCameraMove({ camera: ref.object, controls: ref })
              }
            }}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />

          {/* Ground Shadow */}
          <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={20} blur={2} far={4} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Home

