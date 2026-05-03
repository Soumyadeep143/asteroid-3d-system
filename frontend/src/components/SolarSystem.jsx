import React from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { OrbitControls, Stars, Float, Text, Instances, Instance, MeshDistortMaterial } from "@react-three/drei";
import Asteroid from "./Asteroid";
import OrbitPath from "./OrbitPath";

const SCALE_FACTOR = 30;

function CameraController({ asteroid, selectedPlanet, mode, speed, follow }) {
  const targetPos = new THREE.Vector3();

  useFrame(({ camera, clock }) => {
    if (follow && asteroid) {
      const t = clock.getElapsedTime() * speed;
      const { getPosition } = require("../physics/motion");
      const [x, y, z] = getPosition(asteroid.a * SCALE_FACTOR, asteroid.e, t, mode);

      const radI = (asteroid.i * Math.PI) / 180;
      const rotatedY = y * Math.cos(radI) - z * Math.sin(radI);
      const rotatedZ = y * Math.sin(radI) + z * Math.cos(radI);

      targetPos.set(x, rotatedY, rotatedZ);
      camera.position.lerp(new THREE.Vector3(x, rotatedY + 10, rotatedZ + 25), 0.1);
      camera.lookAt(targetPos);
    } else if (selectedPlanet) {
      // Focus on planet
      camera.position.lerp(new THREE.Vector3(selectedPlanet.position.x + 20, selectedPlanet.position.y + 10, selectedPlanet.position.z + 40), 0.05);
      camera.lookAt(selectedPlanet.position);
    }
  });
  return null;
}

function Sun() {
  const meshRef = React.useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[8, 64, 64]} />
        <meshStandardMaterial
          emissive="#ff8800"
          emissiveIntensity={5}
          color="#ffcc00"
          roughness={0.5}
        />
        <pointLight intensity={40} distance={1200} decay={2} color="#ffddaa" castShadow />
      </mesh>

      {/* Dynamic Solar Flares / Corona */}
      <mesh scale={1.1}>
        <sphereGeometry args={[8, 64, 64]} />
        <MeshDistortMaterial
          color="#ffaa00"
          speed={2}
          distort={0.4}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Atmospheric Glow */}
      <mesh scale={1.8}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function Planet({ distance, size, color, name, speed, hasRings, onSelect, isSelected }) {
  const meshRef = React.useRef();
  const [hovered, setHovered] = React.useState(false);

  // Custom distortion for different planet types
  const distortSpeed = name === "Jupiter" || name === "Saturn" ? 1.5 : 0.5;
  const distortion = name === "Venus" || name === "Earth" ? 0.2 : 0.05;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed * 0.1;
    const x = Math.cos(t) * distance;
    const z = Math.sin(t) * distance;
    meshRef.current.position.set(x, 0, z);
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group>
      {/* Orbit Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.2, distance + 0.2, 128]} />
        <meshBasicMaterial color={isSelected ? "#00f2fe" : "#ffffff"} transparent opacity={isSelected ? 0.4 : 0.05} side={THREE.DoubleSide} />
      </mesh>

      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect({ name, position: meshRef.current.position.clone(), color })}
      >
        {/* Planet Core */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial
            color={color}
            roughness={0.7}
            metalness={0.3}
            emissive={isSelected ? color : "#000"}
            emissiveIntensity={isSelected ? 0.4 : 0}
          />
        </mesh>

        {/* Atmosphere / Cloud Layer */}
        <mesh scale={1.02}>
          <sphereGeometry args={[size, 64, 64]} />
          <MeshDistortMaterial
            color={color}
            speed={distortSpeed}
            distort={distortion}
            transparent
            opacity={0.2}
            roughness={1}
          />
        </mesh>

        {/* Glow / Fresnel Atmosphere */}
        <mesh scale={1.15}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={isSelected ? 0.3 : (hovered ? 0.2 : 0.1)} side={THREE.BackSide} />
        </mesh>

        {hasRings && (
          <group rotation={[Math.PI / 2.5, 0, 0]}>
            <mesh>
              <ringGeometry args={[size * 1.5, size * 2.5, 128]} />
              <meshStandardMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[0.1, 0, 0]}>
              <ringGeometry args={[size * 1.6, size * 2.4, 128]} />
              <meshStandardMaterial color="#fff" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )}

        {(hovered || isSelected) && (
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Text
              position={[0, size + 3, 0]}
              fontSize={size > 3 ? 3 : 2}
              color={isSelected ? "#00f2fe" : "white"}
              anchorX="center"
              anchorY="middle"
            >
              {name.toUpperCase()}
            </Text>
          </Float>
        )}
      </group>
    </group>
  );
}

function AsteroidBelt({ count = 4000, innerRadius = 150, outerRadius = 195 }) {
  const points = React.useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      const r = innerRadius + Math.random() * (outerRadius - innerRadius);
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const y = (Math.random() - 0.5) * 6;
      const rotation = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
      const scale = 0.05 + Math.random() * 0.25;
      p.push({ position: [x, y, z], rotation, scale });
    }
    return p;
  }, [count, innerRadius, outerRadius]);

  return (
    <Instances range={count}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#444" roughness={1} />
      {points.map((p, i) => (
        <Instance key={i} position={p.position} rotation={p.rotation} scale={p.scale} />
      ))}
    </Instances>
  );
}

function Galaxy() {
  return (
    <group>
      {/* Blinking Stars */}
      <Stars 
        radius={900} 
        depth={100} 
        count={20000} 
        factor={15} 
        saturation={1} 
        fade 
        speed={5} 
      />
      
      {/* Deep Space Background */}
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[1500, 32, 32]} />
        <meshBasicMaterial 
          color="#02020a"
          side={THREE.BackSide} 
        />
      </mesh>
    </group>
  );
}

export default function SolarSystem({ asteroids, focusedAsteroid, mode, speed, follow }) {
  const [selectedPlanet, setSelectedPlanet] = React.useState(null);

  const planetData = {
    Mercury: { mass: "3.285 × 10^23 kg", temp: "167°C", gravity: "3.7 m/s²" },
    Venus: { mass: "4.867 × 10^24 kg", temp: "464°C", gravity: "8.87 m/s²" },
    Earth: { mass: "5.972 × 10^24 kg", temp: "15°C", gravity: "9.8 m/s²" },
    Mars: { mass: "6.39 × 10^23 kg", temp: "-65°C", gravity: "3.72 m/s²" },
    Jupiter: { mass: "1.898 × 10^27 kg", temp: "-110°C", gravity: "24.79 m/s²" },
    Saturn: { mass: "5.683 × 10^26 kg", temp: "-140°C", gravity: "10.44 m/s²" },
    Uranus: { mass: "8.681 × 10^25 kg", temp: "-195°C", gravity: "8.69 m/s²" },
    Neptune: { mass: "1.024 × 10^26 kg", temp: "-201°C", gravity: "11.15 m/s²" },
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      {selectedPlanet && (
        <div className="planet-info-hud">
          <div className="corner-tl"></div>
          <button className="close-btn" onClick={() => setSelectedPlanet(null)}>×</button>
          <h2>{selectedPlanet.name.toUpperCase()}</h2>
          <div className="data-row">
            <label>MASS</label>
            <span>{planetData[selectedPlanet.name]?.mass}</span>
          </div>
          <div className="data-row">
            <label>MEAN TEMP</label>
            <span>{planetData[selectedPlanet.name]?.temp}</span>
          </div>
          <div className="data-row">
            <label>GRAVITY</label>
            <span>{planetData[selectedPlanet.name]?.gravity}</span>
          </div>
          <div className="scanline"></div>
        </div>
      )}

      <Canvas camera={{ position: [0, 150, 300], fov: 45 }}>
        <color attach="background" args={["#05051a"]} />
        <ambientLight intensity={1.2} />

        <Galaxy />
        <fog attach="fog" args={['#05051a', 300, 1500]} />

        <Sun />

        {/* Major Planets */}
        <Planet distance={40} size={1.2} color="#8c8c8c" name="Mercury" speed={4.1} onSelect={setSelectedPlanet} isSelected={selectedPlanet?.name === "Mercury"} />
        <Planet distance={65} size={2.5} color="#e3bb76" name="Venus" speed={1.6} onSelect={setSelectedPlanet} isSelected={selectedPlanet?.name === "Venus"} />
        <Planet distance={95} size={2.6} color="#2271b3" name="Earth" speed={1} onSelect={setSelectedPlanet} isSelected={selectedPlanet?.name === "Earth"} />
        <Planet distance={125} size={1.8} color="#e27b58" name="Mars" speed={0.5} onSelect={setSelectedPlanet} isSelected={selectedPlanet?.name === "Mars"} />

        <AsteroidBelt count={3000} innerRadius={150} outerRadius={190} />

        <Planet distance={230} size={6.5} color="#d39c7e" name="Jupiter" speed={0.08} onSelect={setSelectedPlanet} isSelected={selectedPlanet?.name === "Jupiter"} />
        <Planet distance={310} size={5.5} color="#c5ab6e" name="Saturn" speed={0.03} hasRings onSelect={setSelectedPlanet} isSelected={selectedPlanet?.name === "Saturn"} />
        <Planet distance={380} size={4.0} color="#b5e1e1" name="Uranus" speed={0.01} onSelect={setSelectedPlanet} isSelected={selectedPlanet?.name === "Uranus"} />
        <Planet distance={440} size={3.8} color="#4b70dd" name="Neptune" speed={0.006} onSelect={setSelectedPlanet} isSelected={selectedPlanet?.name === "Neptune"} />

        {asteroids.map((ast, i) => (
          <React.Fragment key={i}>
            <OrbitPath a={ast.a * SCALE_FACTOR} e={ast.e} color={ast.color} />
            <Asteroid a={ast.a * SCALE_FACTOR} e={ast.e} i={ast.i} mode={mode} speed={speed} color={ast.color} isFocused={focusedAsteroid === ast} />
          </React.Fragment>
        ))}

        <CameraController asteroid={focusedAsteroid} selectedPlanet={selectedPlanet} mode={mode} speed={speed} follow={follow} />
        {!follow && !selectedPlanet && <OrbitControls maxDistance={800} minDistance={10} />}
        {selectedPlanet && <OrbitControls target={selectedPlanet.position} maxDistance={100} minDistance={10} />}
      </Canvas>
    </div>
  );
}
