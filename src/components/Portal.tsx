"use client";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Image as DreiImage, Text } from "@react-three/drei";
import * as THREE from "three";

interface PortalProps {
  position: [number, number, number];
  url: string;
  title: string;
}

/**
 * Portal - Floating 3D Photo Frame
 * Displays photos as floating glass panels in space
 */
export default function Portal({ position, url, title }: PortalProps) {
  const ref = useRef<THREE.Group>(null);
  const [hasError, setHasError] = useState(false);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {/* Photo Frame - Shows placeholder if image fails to load */}
        {!hasError ? (
          <DreiImage
            url={url}
            scale={[4, 5.5]}
            transparent
            opacity={0.85}
            radius={0.1}
            onError={() => setHasError(true)}
          />
        ) : (
          // Placeholder box when image is missing
          <mesh>
            <boxGeometry args={[4, 5.5, 0.1]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        )}
        {/* Title Text below image */}
        <Text
          position={[0, -3.2, 0.1]}
          fontSize={0.25}
          font="https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459Wlhyw.woff"
          fontWeight={300}
          color="#d4af37"
          anchorX="center"
          anchorY="top"
        >
          {title}
        </Text>
      </group>
    </Float>
  );
}
