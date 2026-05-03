import React, { useRef, useMemo } from 'react';
import { useFrame } from "@react-three/fiber";
import { getPosition } from "../physics/motion";
import { Html } from "@react-three/drei";
import * as THREE from 'three';

export default function Asteroid({ a, e, i, mode, speed, color, isFocused }) {
  const meshRef = useRef();
  const ringRef = useRef();
  
  // Create an irregular, rocky geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(isFocused ? 1.5 : 1.0, 3);
    const positions = geo.attributes.position;
    for (let j = 0; j < positions.count; j++) {
      const x = positions.getX(j);
      const y = positions.getY(j);
      const z = positions.getZ(j);
      
      const noise = (Math.random() - 0.5) * 0.4;
      const factor = 1 + noise;
      positions.setXYZ(j, x * factor, y * factor, z * factor);
    }
    geo.computeVertexNormals();
    return geo;
  }, [isFocused]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const [x, y, z] = getPosition(a, e, t, mode);
    
    const radI = (i * Math.PI) / 180;
    const rotatedY = y * Math.cos(radI) - z * Math.sin(radI);
    const rotatedZ = y * Math.sin(radI) + z * Math.cos(radI);
    
    if (meshRef.current) {
      meshRef.current.position.set(x, rotatedY, rotatedZ);
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial 
          color={isFocused ? "#ffffff" : "#aaaaaa"} 
          roughness={1} 
          metalness={0.2}
          flatShading={true}
        />
      </mesh>
      
      {isFocused && (
        <>
          <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3, 3.2, 64]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
          <pointLight intensity={5} distance={10} color={color} />
          <Html distanceFactor={20}>
            <div className="asteroid-label" style={{ color: color }}>
              TARGET LOCKED
            </div>
          </Html>
        </>
      )}
      {!isFocused && <pointLight intensity={0.5} distance={5} color={color} />}
    </group>
  );
}
