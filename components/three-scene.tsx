"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment, PerspectiveCamera, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"
import { JSX } from "react/jsx-runtime"; // Import JSX for TypeScript support

// Abstract furniture-inspired 3D shapes
function FurnitureAbstract() {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef1 = useRef<THREE.Mesh>(null)
  const meshRef2 = useRef<THREE.Mesh>(null)
  const meshRef3 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    if (meshRef1.current) {
      meshRef1.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef1.current.rotation.z = state.clock.elapsedTime * 0.1
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.y = state.clock.elapsedTime * 0.15
    }
    if (meshRef3.current) {
      meshRef3.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main sofa-like shape */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef1} position={[0, 0, 0]}>
          <roundedBoxGeometry args={[2.5, 0.8, 1.2, 4, 0.15]} />
          <MeshDistortMaterial
            color="#2A3B5C"
            roughness={0.3}
            metalness={0.2}
            distort={0.1}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Back cushion */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
        <mesh ref={meshRef2} position={[0, 0.6, -0.3]}>
          <roundedBoxGeometry args={[2.2, 0.6, 0.4, 4, 0.1]} />
          <MeshDistortMaterial
            color="#1A2B4C"
            roughness={0.4}
            metalness={0.1}
            distort={0.05}
            speed={1.5}
          />
        </mesh>
      </Float>

      {/* Decorative sphere */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef3} position={[1.8, 0.3, 0.5]} scale={0.25}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={1}
          />
        </mesh>
      </Float>

      {/* Additional decorative elements */}
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-1.5, 0.8, 0.3]} scale={0.15}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial
            color="#CCCCCC"
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
      </Float>
    </group>
  )
}

// Rounded box geometry helper
function roundedBoxGeometry(
  width: number,
  height: number,
  depth: number,
  segments: number,
  radius: number
) {
  const shape = new THREE.Shape()
  const eps = 0.00001
  const r = radius - eps

  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true)
  shape.absarc(eps, height - r * 2, eps, Math.PI, Math.PI / 2, true)
  shape.absarc(width - r * 2, height - r * 2, eps, Math.PI / 2, 0, true)
  shape.absarc(width - r * 2, eps, eps, 0, -Math.PI / 2, true)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: segments,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius,
    curveSegments: segments,
  })

  geometry.center()

  return geometry
}

// Register the custom geometry
THREE.BufferGeometry.prototype.constructor.name = "BufferGeometry"

// Custom rounded box as a separate component
function RoundedBox({ args, ...props }: { args: [number, number, number, number, number] } & JSX.IntrinsicElements["mesh"]) {
  const geometry = useMemo(
    () => roundedBoxGeometry(args[0], args[1], args[2], args[3], args[4]),
    [args]
  )
  return <mesh geometry={geometry} {...props} />
}

// Particles background
function Particles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      const scale = Math.random() * 0.02 + 0.01
      temp.push({ position, scale })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    
    particles.forEach((particle, i) => {
      const dummy = new THREE.Object3D()
      dummy.position.copy(particle.position)
      dummy.position.y += Math.sin(state.clock.elapsedTime + i) * 0.01
      dummy.scale.setScalar(particle.scale)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
    </instancedMesh>
  )
}

// Mouse-following light
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { viewport, pointer } = useThree()

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = (pointer.x * viewport.width) / 2
      lightRef.current.position.y = (pointer.y * viewport.height) / 2
    }
  })

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      intensity={0.5}
      color="#FFFFFF"
      distance={10}
    />
  )
}

// Loading fallback
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#1A2B4C" wireframe />
    </mesh>
  )
}

interface ThreeSceneProps {
  className?: string
}

export function ThreeScene({ className = "" }: ThreeSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <MouseLight />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Main content */}
          <FurnitureAbstract />
          <Particles count={50} />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Simplified version for hero section
export function HeroThreeScene() {
  return (
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
            <mesh position={[2, 1, 0]} scale={0.8}>
              <torusKnotGeometry args={[0.8, 0.2, 100, 16]} />
              <meshStandardMaterial
                color="#FFFFFF"
                roughness={0.3}
                metalness={0.7}
                transparent
                opacity={0.6}
              />
            </mesh>
          </Float>
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh position={[-2.5, -0.5, -1]} scale={0.6}>
              <icosahedronGeometry args={[1, 1]} />
              <meshStandardMaterial
                color="#CCCCCC"
                roughness={0.2}
                metalness={0.8}
                transparent
                opacity={0.4}
              />
            </mesh>
          </Float>
          
          <Particles count={30} />
        </Suspense>
      </Canvas>
    </div>
  )
}
