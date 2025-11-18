import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function ToolboxModel({ wireframe, onPartClick }) {
  const groupRef = useRef()
  const { scene } = useGLTF('/toolbox-chits.glb')
  const [hoveredPart, setHoveredPart] = useState(null)
  const [selectedPart, setSelectedPart] = useState(null)
  const [openParts, setOpenParts] = useState({})
  const lidRefs = useRef({ Cube010: null, Cube010_1: null, Cube010_2: null, Cylinder001: null })
  const curveRefs = useRef({ Curve005_1: null, Curve005_2: null, Curve005_3: null })
  const drawerRefs = useRef({ Cube034: null, Cube034_1: null, Cube034_2: null, Cube034_3: null })
  const cube034_1GroupRefs = useRef({
    Cube034_1: null,
    Cube000: null,
    Cube001: null,
    Cube002: null,
    Cube003: null,
    Cube004: null,
    Cube005: null,
    Cube006: null,
    Cube007: null
  })
  const curve001Refs = useRef({ Curve001: null, Curve001_1: null, Curve001_2: null })
  const cube015Refs = useRef({ Cube015: null, Cube015_1: null })
  const cube021Refs = useRef({ Cube021: null, Cube021_1: null })
  const cube011Refs = useRef({ Cube011: null, Cube011_1: null })
  const cube023Refs = useRef({ Cube023: null, Cube023_1: null })
  const cube022Refs = useRef({ Cube022: null, Cube022_1: null })
  const cube014Refs = useRef({ Cube014: null, Cube014_1: null })
  const cube013Refs = useRef({ Cube013: null, Cube013_1: null })
  const cube012Refs = useRef({ Cube012: null, Cube012_1: null })

  // Clone and prepare the scene
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true)

    // Calculate scale and position
    const box = new THREE.Box3().setFromObject(cloned)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scaleValue = 4 / maxDim

    cloned.scale.multiplyScalar(scaleValue)
    cloned.position.sub(center.multiplyScalar(scaleValue))

    // Setup materials
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        // Ensure material exists and is cloned
        if (child.material) {
          child.material = child.material.clone()
          child.userData.originalMaterial = child.material.clone()
        }

        child.userData.interactive = true
      }
    })

    return cloned
  }, [scene])

  // Store references to lid parts, curve parts, and drawer parts after scene is ready
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child.isMesh) {
          if (child.name === 'Cube010' || child.name === 'Cube010_1' || child.name === 'Cube010_2' || child.name === 'Cylinder001') {
            lidRefs.current[child.name] = child
          }
          if (child.name === 'Curve005_1' || child.name === 'Curve005_2' || child.name === 'Curve005_3') {
            curveRefs.current[child.name] = child
          }
          if (child.name === 'Cube034' || child.name === 'Cube034_1' || child.name === 'Cube034_2' || child.name === 'Cube034_3') {
            drawerRefs.current[child.name] = child
          }
          if (child.name === 'Curve001' || child.name === 'Curve001_1' || child.name === 'Curve001_2') {
            curve001Refs.current[child.name] = child
          }
          if (child.name === 'Cube034_1' || child.name === 'Cube000' || child.name === 'Cube001' ||
              child.name === 'Cube002' || child.name === 'Cube003' || child.name === 'Cube004' ||
              child.name === 'Cube005' || child.name === 'Cube006' || child.name === 'Cube007') {
            cube034_1GroupRefs.current[child.name] = child
          }
          if (child.name === 'Cube015' || child.name === 'Cube015_1') {
            cube015Refs.current[child.name] = child
          }
          if (child.name === 'Cube021' || child.name === 'Cube021_1') {
            cube021Refs.current[child.name] = child
          }
          if (child.name === 'Cube011' || child.name === 'Cube011_1') {
            cube011Refs.current[child.name] = child
          }
          if (child.name === 'Cube023' || child.name === 'Cube023_1') {
            cube023Refs.current[child.name] = child
          }
          if (child.name === 'Cube022' || child.name === 'Cube022_1') {
            cube022Refs.current[child.name] = child
          }
          if (child.name === 'Cube014' || child.name === 'Cube014_1') {
            cube014Refs.current[child.name] = child
          }
          if (child.name === 'Cube013' || child.name === 'Cube013_1') {
            cube013Refs.current[child.name] = child
          }
          if (child.name === 'Cube012' || child.name === 'Cube012_1') {
            cube012Refs.current[child.name] = child
          }
        }
      })
    }
  }, [clonedScene])

  const handleClick = (event) => {
    event.stopPropagation()
    const clickedObject = event.object

    console.log('Clicked on:', clickedObject.name || 'Unnamed part', clickedObject)
    console.log('📍 Current Position:', {
      position: { x: clickedObject.position.x, y: clickedObject.position.y, z: clickedObject.position.z },
      rotation: { x: clickedObject.rotation.x, y: clickedObject.rotation.y, z: clickedObject.rotation.z },
      scale: { x: clickedObject.scale.x, y: clickedObject.scale.y, z: clickedObject.scale.z }
    })

    if (clickedObject.isMesh && clickedObject.userData.interactive) {
      setSelectedPart(clickedObject)
      const partName = clickedObject.name || 'Toolbox Part'

      // Highlight selected part temporarily
      if (clickedObject.material) {
        if (!clickedObject.material.emissive) {
          clickedObject.material.emissive = new THREE.Color(0x000000)
        }
        clickedObject.material.emissive.setHex(0xff8844)
        clickedObject.material.emissiveIntensity = 0.5

        // Reset highlight after a short delay
        setTimeout(() => {
          if (clickedObject.material && clickedObject.material.emissive) {
            clickedObject.material.emissive.setHex(0x000000)
            clickedObject.material.emissiveIntensity = 0
          }
        }, 300)
      }

      // Check if this part should open like a lid

      // Map chit parts to their slugs
      const chitMapping = {
        'Cube000': 'cube000',
        'Cube001': 'cube001',
        'Cube002': 'cube002',
        'Cube003': 'cube003',
        'Cube004': 'cube004',
        'Cube005': 'cube005',
        'Cube006': 'cube006',
        'Cube007': 'cube007',
        'Cube011': 'stories',
        'Cube011_1': 'stories',
        'Cube012': 'resistance',
        'Cube012_1': 'resistance',
        'Cube013': 'core-beliefs',
        'Cube013_1': 'core-beliefs',
        'Cube014': 'readiness',
        'Cube014_1': 'readiness',
        'Cube015': 'subconsciousness',
        'Cube015_1': 'subconsciousness',
        'Cube021': 'self-talk',
        'Cube021_1': 'self-talk',
        'Cube022': 'wounds',
        'Cube022_1': 'wounds',
        'Cube023': 'values',
        'Cube023_1': 'values'
      }

      // If it's a chit part, open its page in a new tab
      if (chitMapping[partName]) {
        console.log('📄 Opening chit page for:', partName)
        const slug = chitMapping[partName]
        window.open(`/chit/${slug}`, '_blank')
        return
      }

      // Disable interaction for Cylinder136_1
      if (partName === 'Cylinder136_1') {
        console.log('🚫 Cylinder136_1 clicked - no movement allowed')
        return
      }

      // Special behavior: clicking Cube010_1 opens all four lid parts together
      if (partName === 'Cube010_1') {
        const isOpen = openParts['allLids'] || false

        // Toggle open/close state for all lids
        setOpenParts(prev => ({
          ...prev,
          'allLids': !isOpen
        }))

        // Notify parent for camera animation
        onPartClick(partName)

        // Animate the three cube lid parts together
        const lid1 = lidRefs.current['Cube010']
        const lid2 = lidRefs.current['Cube010_1']
        const lid3 = lidRefs.current['Cube010_2']
        const cylinder = lidRefs.current['Cylinder001']

        if (lid1) animateLid(lid1, !isOpen)
        if (lid2) animateLid(lid2, !isOpen)
        if (lid3) animateLid(lid3, !isOpen)

        // Hide/show Cylinder001 instead of animating it
        if (cylinder) {
          cylinder.visible = isOpen  // Hide when opening, show when closing
        }
      } else if (partName === 'Cube010_2') {
        // Clicking Cube010_2 closes all lids, shows Cylinder001, and closes all drawers
        setOpenParts(prev => ({
          ...prev,
          'allLids': false,
          'Cube010': false,
          'Cube010_1': false,
          'Cube010_2': false,
          'allDrawers': false,
          'allCurve001': false,
          'allCurves': false
        }))

        // Notify parent for camera animation
        onPartClick(partName)

        const lid1 = lidRefs.current['Cube010']
        const lid2 = lidRefs.current['Cube010_1']
        const lid3 = lidRefs.current['Cube010_2']
        const cylinder = lidRefs.current['Cylinder001']

        // Close all three cube lids
        if (lid1) animateLid(lid1, false)
        if (lid2) animateLid(lid2, false)
        if (lid3) animateLid(lid3, false)

        // Make Cylinder001 visible
        if (cylinder) {
          cylinder.visible = true
        }

        // Close all drawers (Cube034, Cube034_2, Cube034_3)
        const drawer1 = drawerRefs.current['Cube034']
        const drawer2 = drawerRefs.current['Cube034_2']
        const drawer3 = drawerRefs.current['Cube034_3']

        if (drawer1) animateSlideForward(drawer1, false)
        if (drawer2) animateSlideForward(drawer2, false)
        if (drawer3) animateSlideForward(drawer3, false)

        // Close Cube034_1 and its group (Cube000-007)
        const cube034_1 = cube034_1GroupRefs.current['Cube034_1']
        const cube000 = cube034_1GroupRefs.current['Cube000']
        const cube001 = cube034_1GroupRefs.current['Cube001']
        const cube002 = cube034_1GroupRefs.current['Cube002']
        const cube003 = cube034_1GroupRefs.current['Cube003']
        const cube004 = cube034_1GroupRefs.current['Cube004']
        const cube005 = cube034_1GroupRefs.current['Cube005']
        const cube006 = cube034_1GroupRefs.current['Cube006']
        const cube007 = cube034_1GroupRefs.current['Cube007']

        if (cube034_1) animateSlideForward(cube034_1, false)
        if (cube000) animateSlideForward(cube000, false)
        if (cube001) animateSlideForward(cube001, false)
        if (cube002) animateSlideForward(cube002, false)
        if (cube003) animateSlideForward(cube003, false)
        if (cube004) animateSlideForward(cube004, false)
        if (cube005) animateSlideForward(cube005, false)
        if (cube006) animateSlideForward(cube006, false)
        if (cube007) animateSlideForward(cube007, false)

        // Close all cube pairs
        const cube011 = cube011Refs.current['Cube011']
        const cube011_1 = cube011Refs.current['Cube011_1']
        const cube012 = cube012Refs.current['Cube012']
        const cube012_1 = cube012Refs.current['Cube012_1']
        const cube013 = cube013Refs.current['Cube013']
        const cube013_1 = cube013Refs.current['Cube013_1']
        const cube014 = cube014Refs.current['Cube014']
        const cube014_1 = cube014Refs.current['Cube014_1']
        const cube023 = cube023Refs.current['Cube023']
        const cube023_1 = cube023Refs.current['Cube023_1']
        const cube022 = cube022Refs.current['Cube022']
        const cube022_1 = cube022Refs.current['Cube022_1']
        const cube021 = cube021Refs.current['Cube021']
        const cube021_1 = cube021Refs.current['Cube021_1']
        const cube015 = cube015Refs.current['Cube015']
        const cube015_1 = cube015Refs.current['Cube015_1']

        if (cube011) animateSlideForward(cube011, false)
        if (cube011_1) animateSlideForward(cube011_1, false)
        if (cube012) animateSlideForward(cube012, false)
        if (cube012_1) animateSlideForward(cube012_1, false)
        if (cube013) animateSlideForward(cube013, false)
        if (cube013_1) animateSlideForward(cube013_1, false)
        if (cube014) animateSlideForward(cube014, false)
        if (cube014_1) animateSlideForward(cube014_1, false)
        if (cube023) animateSlideForward(cube023, false)
        if (cube023_1) animateSlideForward(cube023_1, false)
        if (cube022) animateSlideForward(cube022, false)
        if (cube022_1) animateSlideForward(cube022_1, false)
        if (cube021) animateSlideForward(cube021, false)
        if (cube021_1) animateSlideForward(cube021_1, false)
        if (cube015) animateSlideForward(cube015, false)
        if (cube015_1) animateSlideForward(cube015_1, false)

        // Close all Curve001 parts
        const curve1 = curve001Refs.current['Curve001']
        const curve2 = curve001Refs.current['Curve001_1']
        const curve3 = curve001Refs.current['Curve001_2']

        if (curve1) animateDoorForward(curve1, false)
        if (curve2) animateDoorForward(curve2, false)
        if (curve3) animateDoorForward(curve3, false)

        // Close all Curve005 parts
        const curve005_1 = curveRefs.current['Curve005_1']
        const curve005_2 = curveRefs.current['Curve005_2']
        const curve005_3 = curveRefs.current['Curve005_3']

        if (curve005_1) animateDoorForward(curve005_1, false)
        if (curve005_2) animateDoorForward(curve005_2, false)
        if (curve005_3) animateDoorForward(curve005_3, false)
      } else if (partName === 'Cube010') {
        // Individual behavior for Cube010
        const isOpen = openParts[partName] || false
        setOpenParts(prev => ({
          ...prev,
          [partName]: !isOpen
        }))
        animateLid(clickedObject, !isOpen)
      } else if (partName === 'Curve005_2') {
        // Clicking Curve005_2 opens all three curve parts together
        const isOpen = openParts['allCurves'] || false

        setOpenParts(prev => ({
          ...prev,
          'allCurves': !isOpen
        }))

        const curve1 = curveRefs.current['Curve005_1']
        const curve2 = curveRefs.current['Curve005_2']
        const curve3 = curveRefs.current['Curve005_3']

        if (curve1) animateDoorForward(curve1, !isOpen)
        if (curve2) animateDoorForward(curve2, !isOpen)
        if (curve3) animateDoorForward(curve3, !isOpen)
      } else if (partName === 'Curve005_1' || partName === 'Curve005_3') {
        // Individual behavior for Curve005_1 and Curve005_3
        const isOpen = openParts[partName] || false
        setOpenParts(prev => ({
          ...prev,
          [partName]: !isOpen
        }))
        animateDoorForward(clickedObject, !isOpen)
      } else if (partName === 'Cube034_1' || partName === 'Cube034') {
        // Clicking Cube034_1 or Cube034 triggers the same behavior - slide all drawers
        const isOpen = openParts['allDrawers'] || false
        const willOpen = !isOpen

        setOpenParts(prev => ({
          ...prev,
          'allDrawers': willOpen
        }))

        // Notify parent about the state change for camera animation
        onPartClick(partName, willOpen)

        const drawer1 = drawerRefs.current['Cube034']
        const drawer2 = drawerRefs.current['Cube034_2']
        const drawer3 = drawerRefs.current['Cube034_3']

        // Also slide Cube034_1 and its group (Cube000-007)
        const cube034_1 = cube034_1GroupRefs.current['Cube034_1']
        const cube000 = cube034_1GroupRefs.current['Cube000']
        const cube001 = cube034_1GroupRefs.current['Cube001']
        const cube002 = cube034_1GroupRefs.current['Cube002']
        const cube003 = cube034_1GroupRefs.current['Cube003']
        const cube004 = cube034_1GroupRefs.current['Cube004']
        const cube005 = cube034_1GroupRefs.current['Cube005']
        const cube006 = cube034_1GroupRefs.current['Cube006']
        const cube007 = cube034_1GroupRefs.current['Cube007']

        // Also slide the additional cube pairs (both _1 and base versions)
        const cube011 = cube011Refs.current['Cube011']
        const cube011_1 = cube011Refs.current['Cube011_1']
        const cube012 = cube012Refs.current['Cube012']
        const cube012_1 = cube012Refs.current['Cube012_1']
        const cube013 = cube013Refs.current['Cube013']
        const cube013_1 = cube013Refs.current['Cube013_1']
        const cube014 = cube014Refs.current['Cube014']
        const cube014_1 = cube014Refs.current['Cube014_1']
        const cube023 = cube023Refs.current['Cube023']
        const cube023_1 = cube023Refs.current['Cube023_1']
        const cube022 = cube022Refs.current['Cube022']
        const cube022_1 = cube022Refs.current['Cube022_1']
        const cube021 = cube021Refs.current['Cube021']
        const cube021_1 = cube021Refs.current['Cube021_1']
        const cube015 = cube015Refs.current['Cube015']
        const cube015_1 = cube015Refs.current['Cube015_1']

        if (drawer1) animateSlideForward(drawer1, willOpen)
        if (drawer2) animateSlideForward(drawer2, willOpen)
        if (drawer3) animateSlideForward(drawer3, willOpen)

        if (cube034_1) animateSlideForward(cube034_1, willOpen)
        if (cube000) animateSlideForward(cube000, willOpen)
        if (cube001) animateSlideForward(cube001, willOpen)
        if (cube002) animateSlideForward(cube002, willOpen)
        if (cube003) animateSlideForward(cube003, willOpen)
        if (cube004) animateSlideForward(cube004, willOpen)
        if (cube005) animateSlideForward(cube005, willOpen)
        if (cube006) animateSlideForward(cube006, willOpen)
        if (cube007) animateSlideForward(cube007, willOpen)

        if (cube011) animateSlideForward(cube011, willOpen)
        if (cube011_1) animateSlideForward(cube011_1, willOpen)
        if (cube012) animateSlideForward(cube012, willOpen)
        if (cube012_1) animateSlideForward(cube012_1, willOpen)
        if (cube013) animateSlideForward(cube013, willOpen)
        if (cube013_1) animateSlideForward(cube013_1, willOpen)
        if (cube014) animateSlideForward(cube014, willOpen)
        if (cube014_1) animateSlideForward(cube014_1, willOpen)
        if (cube023) animateSlideForward(cube023, willOpen)
        if (cube023_1) animateSlideForward(cube023_1, willOpen)
        if (cube022) animateSlideForward(cube022, willOpen)
        if (cube022_1) animateSlideForward(cube022_1, willOpen)
        if (cube021) animateSlideForward(cube021, willOpen)
        if (cube021_1) animateSlideForward(cube021_1, willOpen)
        if (cube015) animateSlideForward(cube015, willOpen)
        if (cube015_1) animateSlideForward(cube015_1, willOpen)
      } else if (partName === 'Curve001_1') {
        // Clicking Curve001_1 opens all three Curve001 parts together
        const isOpen = openParts['allCurve001'] || false

        setOpenParts(prev => ({
          ...prev,
          'allCurve001': !isOpen
        }))

        // Notify parent for camera animation
        onPartClick(partName)

        const curve1 = curve001Refs.current['Curve001']
        const curve2 = curve001Refs.current['Curve001_1']
        const curve3 = curve001Refs.current['Curve001_2']

        if (curve1) animateDoorForward(curve1, !isOpen)
        if (curve2) animateDoorForward(curve2, !isOpen)
        if (curve3) animateDoorForward(curve3, !isOpen)
      } else if (partName === 'Cube015_1' || partName === 'Cube015') {
        // Clicking Cube015_1 or Cube015 animates both together
        const isOpen = openParts['allCube015'] || false

        setOpenParts(prev => ({
          ...prev,
          'allCube015': !isOpen
        }))

        const cube015 = cube015Refs.current['Cube015']
        const cube015_1 = cube015Refs.current['Cube015_1']

        if (cube015) animatePart(cube015)
        if (cube015_1) animatePart(cube015_1)
      } else if (partName === 'Cube021_1' || partName === 'Cube021') {
        // Clicking Cube021_1 or Cube021 animates both together
        const isOpen = openParts['allCube021'] || false

        setOpenParts(prev => ({
          ...prev,
          'allCube021': !isOpen
        }))

        const cube021 = cube021Refs.current['Cube021']
        const cube021_1 = cube021Refs.current['Cube021_1']

        if (cube021) animatePart(cube021)
        if (cube021_1) animatePart(cube021_1)
      } else if (partName === 'Cube011_1' || partName === 'Cube011') {
        // Clicking Cube011_1 or Cube011 animates both together
        const isOpen = openParts['allCube011'] || false

        setOpenParts(prev => ({
          ...prev,
          'allCube011': !isOpen
        }))

        const cube011 = cube011Refs.current['Cube011']
        const cube011_1 = cube011Refs.current['Cube011_1']

        if (cube011) animatePart(cube011)
        if (cube011_1) animatePart(cube011_1)
      } else if (partName === 'Cube023_1' || partName === 'Cube023') {
        // Clicking Cube023_1 or Cube023 animates both together
        const isOpen = openParts['allCube023'] || false

        setOpenParts(prev => ({
          ...prev,
          'allCube023': !isOpen
        }))

        const cube023 = cube023Refs.current['Cube023']
        const cube023_1 = cube023Refs.current['Cube023_1']

        if (cube023) animatePart(cube023)
        if (cube023_1) animatePart(cube023_1)
      } else if (partName === 'Cube022_1' || partName === 'Cube022') {
        // Clicking Cube022_1 or Cube022 animates both together
        const isOpen = openParts['allCube022'] || false

        setOpenParts(prev => ({
          ...prev,
          'allCube022': !isOpen
        }))

        const cube022 = cube022Refs.current['Cube022']
        const cube022_1 = cube022Refs.current['Cube022_1']

        if (cube022) animatePart(cube022)
        if (cube022_1) animatePart(cube022_1)
      } else if (partName === 'Cube014_1' || partName === 'Cube014') {
        // Clicking Cube014_1 or Cube014 animates both together
        const isOpen = openParts['allCube014'] || false

        setOpenParts(prev => ({
          ...prev,
          'allCube014': !isOpen
        }))

        const cube014 = cube014Refs.current['Cube014']
        const cube014_1 = cube014Refs.current['Cube014_1']

        if (cube014) animatePart(cube014)
        if (cube014_1) animatePart(cube014_1)
      } else if (partName === 'Cube013_1' || partName === 'Cube013') {
        // Clicking Cube013_1 or Cube013 animates both together
        const isOpen = openParts['allCube013'] || false

        setOpenParts(prev => ({
          ...prev,
          'allCube013': !isOpen
        }))

        const cube013 = cube013Refs.current['Cube013']
        const cube013_1 = cube013Refs.current['Cube013_1']

        if (cube013) animatePart(cube013)
        if (cube013_1) animatePart(cube013_1)
      } else if (partName === 'Cube012_1' || partName === 'Cube012') {
        // Clicking Cube012_1 or Cube012 animates both together
        const isOpen = openParts['allCube012'] || false

        setOpenParts(prev => ({
          ...prev,
          'allCube012': !isOpen
        }))

        const cube012 = cube012Refs.current['Cube012']
        const cube012_1 = cube012Refs.current['Cube012_1']

        if (cube012) animatePart(cube012)
        if (cube012_1) animatePart(cube012_1)
      } else {
        // Other parts - just rotate
        const isOpen = openParts[partName] || false
        setOpenParts(prev => ({
          ...prev,
          [partName]: !isOpen
        }))
        animatePart(clickedObject)
      }
    }
  }

  const handlePointerOver = (event) => {
    event.stopPropagation()
    const object = event.object

    if (object.isMesh && object.userData.interactive && object !== selectedPart) {
      setHoveredPart(object)
      document.body.style.cursor = 'pointer'

      // Highlight on hover
      if (object.material) {
        if (!object.material.emissive) {
          object.material.emissive = new THREE.Color(0x000000)
        }
        object.material.emissive.setHex(0x4488ff)
        object.material.emissiveIntensity = 0.3
      }
    }
  }

  const handlePointerOut = (event) => {
    const object = event.object

    if (object === hoveredPart) {
      setHoveredPart(null)
      document.body.style.cursor = 'auto'

      // Reset material if not selected
      if (object !== selectedPart && object.material) {
        if (object.material.emissive) {
          object.material.emissive.setHex(0x000000)
        }
        object.material.emissiveIntensity = 0
      }
    }
  }

  const animateLid = (object, shouldOpen) => {
    // Store original rotation if not already stored
    if (!object.userData.originalRotation) {
      object.userData.originalRotation = {
        x: object.rotation.x,
        y: object.rotation.y,
        z: object.rotation.z
      }
    }

    const startRotation = object.rotation.x
    // Open to specific angle, close back to original
    const targetRotation = shouldOpen
      ? -2.0420352248333655  // Open to exact angle
      : object.userData.originalRotation.x  // Close back to original

    console.log(`🔄 [${object.name}] Lid Animation:`, {
      action: shouldOpen ? 'OPENING' : 'CLOSING',
      startRotation: { x: startRotation, y: object.rotation.y, z: object.rotation.z },
      targetRotation: { x: targetRotation, y: object.rotation.y, z: object.rotation.z },
      startRotationDegrees: { x: (startRotation * 180 / Math.PI).toFixed(2) + '°' },
      targetRotationDegrees: { x: (targetRotation * 180 / Math.PI).toFixed(2) + '°' }
    })

    const duration = 800
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth easing function
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      object.rotation.x = startRotation + (targetRotation - startRotation) * easeProgress

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        console.log(`✅ [${object.name}] Lid Animation Complete:`, {
          finalRotation: { x: object.rotation.x, y: object.rotation.y, z: object.rotation.z },
          finalRotationDegrees: { x: (object.rotation.x * 180 / Math.PI).toFixed(2) + '°' }
        })
      }
    }

    animate()
  }

  const animateDoorForward = (object, shouldOpen) => {
    // Store original rotation if not already stored
    if (!object.userData.originalRotation) {
      object.userData.originalRotation = {
        x: object.rotation.x,
        y: object.rotation.y,
        z: object.rotation.z
      }
    }

    const startRotation = object.rotation.x
    // Open forward/down (positive X rotation)
    const targetRotation = shouldOpen
      ? object.userData.originalRotation.x + Math.PI * 0.65  // Open forward/down
      : object.userData.originalRotation.x  // Close back to original

    console.log(`🚪 [${object.name}] Door Animation:`, {
      action: shouldOpen ? 'OPENING' : 'CLOSING',
      startRotation: { x: startRotation, y: object.rotation.y, z: object.rotation.z },
      targetRotation: { x: targetRotation, y: object.rotation.y, z: object.rotation.z },
      startRotationDegrees: { x: (startRotation * 180 / Math.PI).toFixed(2) + '°' },
      targetRotationDegrees: { x: (targetRotation * 180 / Math.PI).toFixed(2) + '°' }
    })

    const duration = 800
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth easing function
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      object.rotation.x = startRotation + (targetRotation - startRotation) * easeProgress

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        console.log(`✅ [${object.name}] Door Animation Complete:`, {
          finalRotation: { x: object.rotation.x, y: object.rotation.y, z: object.rotation.z },
          finalRotationDegrees: { x: (object.rotation.x * 180 / Math.PI).toFixed(2) + '°' }
        })
      }
    }

    animate()
  }

  const animateSlideForward = (object, shouldOpen) => {
    // Store original position if not already stored
    if (!object.userData.originalPosition) {
      object.userData.originalPosition = {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z
      }
    }

    const startPosition = object.position.z
    // Slide forward along Z-axis
    const targetPosition = shouldOpen
      ? object.userData.originalPosition.z + 16  // Slide forward more
      : object.userData.originalPosition.z  // Slide back to original

    console.log(`📦 [${object.name}] Slide Animation:`, {
      action: shouldOpen ? 'SLIDING OUT' : 'SLIDING IN',
      startPosition: { x: object.position.x, y: object.position.y, z: startPosition },
      targetPosition: { x: object.position.x, y: object.position.y, z: targetPosition },
      slideDistance: (targetPosition - startPosition).toFixed(2)
    })

    const duration = 800
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth easing function
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      object.position.z = startPosition + (targetPosition - startPosition) * easeProgress

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        console.log(`✅ [${object.name}] Slide Animation Complete:`, {
          finalPosition: { x: object.position.x, y: object.position.y, z: object.position.z }
        })
      }
    }

    animate()
  }

  const animatePart = (object) => {
    const startRotation = object.rotation.y
    const targetRotation = startRotation + Math.PI / 4
    const duration = 500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      object.rotation.y = startRotation + (targetRotation - startRotation) * easeProgress

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  // Update wireframe when prop changes
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.wireframe = wireframe
        }
      })
    }
  }, [wireframe])

  return (
    <group ref={groupRef}>
      <primitive
        object={clonedScene}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  )
}

// Preload the model
useGLTF.preload('/toolbox.glb')

