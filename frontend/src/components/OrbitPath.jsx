import React, { useMemo } from 'react';
import * as THREE from 'three';
import { generateOrbit } from "../physics/orbit";

export default function OrbitPath({ a, e, color }) {
  const points = useMemo(() => {
    const orbitPoints = generateOrbit(a, e);
    return orbitPoints.map(p => new THREE.Vector3(...p));
  }, [a, e]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={color} linewidth={2} transparent opacity={0.4} />
    </line>
  );
}
