"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import Portal from "./Portal";

/**
 * CinematicScene - Z-Axis Journey Through Space
 * Camera flies through stars, photos float past like portals
 */
export default function CinematicScene() {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Subtle ambient rotation
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Starfield */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Photo Portals - Placed along Z-axis for scroll journey */}
      {/* TODO: Replace with real photos of Sanu & Bijeesh */}
      <Portal
        position={[-3, 1, -15]}
        url="/photo1.jpg"
        title="The First Meeting"
      />
      <Portal
        position={[3, -1, -30]}
        url="/photo2.jpg"
        title="Engagement Day"
      />
      <Portal
        position={[-2, 0, -45]}
        url="/photo3.jpg"
        title="Building Dreams"
      />
      <Portal
        position={[2, 1, -60]}
        url="/photo4.jpg"
        title="Family Traditions"
      />
      <Portal
        position={[0, 0, -75]}
        url="/photo5.jpg"
        title="08.04.2026"
      />
    </group>
  );
}
