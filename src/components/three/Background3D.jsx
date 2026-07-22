import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'

function LightRays() {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.015
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.02
  })

  const rays = useMemo(() => {
    const items = []
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      items.push({
        position: [Math.cos(angle) * 3, Math.sin(angle) * 2 - 1, -4],
        color: i % 2 === 0 ? '#F4B400' : '#F4B400',
        speed: 0.2 + Math.random() * 0.2,
        distort: 0.1 + Math.random() * 0.2,
      })
    }
    return items
  }, [])

  return (
    <group ref={groupRef}>
      {rays.map((ray, i) => (
        <Float key={i} speed={ray.speed * 0.4} rotationIntensity={0.1} floatIntensity={0.3}>
          <Sphere args={[0.6 + Math.random() * 0.4, 32, 32]} position={ray.position}>
            <MeshDistortMaterial
              color={ray.color}
              transparent
              opacity={0.04 + Math.random() * 0.03}
              roughness={0.4}
              metalness={0.2}
              distort={ray.distort}
              speed={1.5}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

function Particles({ count = 60 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    return pos
  }, [count])

  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.01
    const positions = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(clock.getElapsedTime() * 0.3 + i) * 0.0003
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#F4B400" transparent opacity={0.15} />
    </points>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}>
        <ambientLight intensity={0.3} />
        <LightRays />
        <Particles count={60} />
      </Canvas>
    </div>
  )
}
