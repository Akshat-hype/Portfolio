import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/** Slowly rotating cloud of particles arranged in a server-rack / helix pattern */
function DataStream() {
  const pointsRef = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 2200
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = i / count
      // Double helix pattern — like data flowing through infrastructure
      const radius = 1.8 + Math.random() * 5.5
      const angle = t * Math.PI * 8 + (Math.random() - 0.5) * 0.6
      const height = (t - 0.5) * 7.5 + (Math.random() - 0.5) * 1.2
      array[i * 3] = Math.cos(angle) * radius
      array[i * 3 + 1] = height
      array[i * 3 + 2] = Math.sin(angle) * radius
    }
    return array
  }, [])

  const colors = useMemo(() => {
    const count = 2200
    const array = new Float32Array(count * 3)
    const green = new THREE.Color('#00ff88')
    const purple = new THREE.Color('#9276ff')
    const cyan = new THREE.Color('#63d7ef')
    const palette = [green, purple, cyan]
    for (let i = 0; i < count; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)]
      const brightness = 0.4 + Math.random() * 0.6
      array[i * 3] = color.r * brightness
      array[i * 3 + 1] = color.g * brightness
      array[i * 3 + 2] = color.b * brightness
    }
    return array
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.014
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.06
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Falling data rain particles — matrix-style */
function DataRain() {
  const count = 400
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = Math.random() * 10 - 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      vel[i] = 0.3 + Math.random() * 0.8
    }
    return { positions: pos, velocities: vel }
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] -= velocities[i] * delta * 1.5
      if (posArray[i * 3 + 1] < -5) {
        posArray[i * 3 + 1] = 5 + Math.random() * 2
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#00ff88"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Wireframe server-core orb with pulsing rings */
function ServerCore() {
  const orb = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (orb.current) {
      orb.current.rotation.y += delta * 0.1
      orb.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08
    }
    if (ring.current) ring.current.rotation.z += delta * 0.06
    if (ring2.current) ring2.current.rotation.z -= delta * 0.04
  })

  return (
    <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.2}>
      {/* Main wireframe core */}
      <mesh ref={orb} position={[1.5, 0.1, 0]}>
        <icosahedronGeometry args={[1.18, 4]} />
        <meshStandardMaterial
          color="#00aa55"
          emissive="#004422"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>

      {/* Primary ring */}
      <mesh ref={ring} position={[1.5, 0.1, 0]} rotation={[1.15, 0.25, 0.2]}>
        <torusGeometry args={[1.72, 0.008, 8, 180]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.55} />
      </mesh>

      {/* Secondary ring */}
      <mesh ref={ring2} position={[1.5, 0.1, 0]} rotation={[0.5, 1.2, 0.8]}>
        <torusGeometry args={[1.95, 0.006, 6, 120]} />
        <meshBasicMaterial color="#9276ff" transparent opacity={0.3} />
      </mesh>

      {/* Inner glow sphere */}
      <mesh position={[1.5, 0.1, 0]}>
        <sphereGeometry args={[0.68, 32, 32]} />
        <meshBasicMaterial color="#002a11" transparent opacity={0.25} />
      </mesh>

      {/* Outer glow sphere */}
      <mesh position={[1.5, 0.1, 0]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.02} />
      </mesh>
    </Float>
  )
}

export default function Universe() {
  return (
    <div className="universe-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 3]} color="#00ff88" intensity={18} />
        <pointLight position={[-4, -1, 1]} color="#9276ff" intensity={10} />
        <pointLight position={[0, -3, 4]} color="#63d7ef" intensity={6} />
        <Stars
          radius={90}
          depth={48}
          count={1500}
          factor={1.8}
          saturation={0.1}
          fade
          speed={0.2}
        />
        <DataStream />
        <DataRain />
        <ServerCore />
      </Canvas>
    </div>
  )
}
