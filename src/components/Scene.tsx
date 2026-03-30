"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

function EternalStarfield({ scrollY }: { scrollY: number }) {
  const starsRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!starsRef.current || !groupRef.current) return;
    
    // Make stars rotate slowly based on time
    const t = state.clock.getElapsedTime();
    starsRef.current.rotation.z = t * 0.05;
    
    // Camera "Dive" - Link this to the scroll value
    // As the user scrolls, we move the entire group towards the camera
    // This creates the "warp speed" effect
    const targetZ = scrollY * 0.1;
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
  });

  return (
    <group ref={groupRef}>
      <group ref={starsRef}>
        <Stars 
          radius={100} 
          depth={50} 
          count={7000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
      </group>
      
      {/* Floating 3D Wireframes as requested */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[2, 2, -10]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* Adding more wireframes for depth */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[-3, -2, -25]}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[4, -3, -40]}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene() {
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
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <EternalStarfield scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
