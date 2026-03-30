"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface SceneProps {
  currentTime: number; // Current audio time in seconds
  isWarpSpeed: boolean; // Triggered at chorus (1:30+)
}

/**
 * EternalStarfield - Dynamic 3D Starfield for "Uyire"
 * 
 * Timeline sync:
 * - 0:00 - 0:45 (Intro): Slow rotation, stars fade in
 * - 0:45 - 1:30 (Verse): Camera moves through stars
 * - 1:30+ (Chorus): Warp speed effect with increased velocity
 */
function EternalStarfield({ currentTime, isWarpSpeed, scrollY }: { currentTime: number; isWarpSpeed: boolean; scrollY: number }) {
  const starsRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const warpSpeedRef = useRef(0);

  useFrame((state, delta) => {
    if (!starsRef.current || !groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Slow rotation - always active
    starsRef.current.rotation.z = t * 0.05;
    starsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;

    // Warp speed animation - increases at chorus
    const targetWarpSpeed = isWarpSpeed ? 1 : 0.1;
    warpSpeedRef.current = THREE.MathUtils.lerp(warpSpeedRef.current, targetWarpSpeed, delta * 2);

    // Move stars towards camera for "flying through" effect
    const baseSpeed = 0.5 + warpSpeedRef.current * 5; // Much faster during warp
    const scrollOffset = scrollY * 0.05;
    
    // Animate stars moving towards camera
    const starZ = groupRef.current.position.z;
    const targetZ = scrollOffset - (t * baseSpeed * 0.1);
    
    // Reset stars when they pass the camera for infinite effect
    if (targetZ < -100) {
      groupRef.current.position.z = 0;
    } else {
      groupRef.current.position.z = THREE.MathUtils.lerp(starZ, targetZ, delta * 0.5);
    }

    // Add subtle pulsing during warp speed
    if (isWarpSpeed) {
      starsRef.current.scale.setScalar(1 + Math.sin(t * 10) * 0.05);
    } else {
      starsRef.current.scale.setScalar(1);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={starsRef}>
        <Stars
          radius={150}
          depth={80}
          count={10000}
          factor={4}
          saturation={0}
          fade
          speed={isWarpSpeed ? 3 : 1}
        />
      </group>

      {/* Floating 3D Wireframes - Geometric symbols of union */}
      <Float speed={isWarpSpeed ? 8 : 2} rotationIntensity={isWarpSpeed ? 2 : 0.5} floatIntensity={1}>
        <mesh position={[3, 2, -15]}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>

      <Float speed={isWarpSpeed ? 6 : 1.5} rotationIntensity={isWarpSpeed ? 1.5 : 0.8} floatIntensity={1.2}>
        <mesh position={[-4, -3, -30]}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>

      <Float speed={isWarpSpeed ? 10 : 2.5} rotationIntensity={isWarpSpeed ? 1 : 0.3} floatIntensity={0.8}>
        <mesh position={[5, -4, -50]}>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>

      {/* Additional wireframes for depth during warp */}
      {isWarpSpeed && (
        <>
          <Float speed={12} rotationIntensity={2} floatIntensity={1.5}>
            <mesh position={[-6, 3, -70]}>
              <octahedronGeometry args={[1.5, 1]} />
              <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.1} />
            </mesh>
          </Float>
          <Float speed={15} rotationIntensity={3} floatIntensity={2}>
            <mesh position={[7, -5, -90]}>
              <tetrahedronGeometry args={[2, 1]} />
              <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.08} />
            </mesh>
          </Float>
        </>
      )}
    </group>
  );
}

export default function Scene({ currentTime = 0, isWarpSpeed = false }: SceneProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera 
          makeDefault 
          position={[0, 0, 5]} 
          fov={75}
        />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
        <EternalStarfield 
          currentTime={currentTime} 
          isWarpSpeed={isWarpSpeed} 
          scrollY={scrollY} 
        />
      </Canvas>
    </div>
  );
}
