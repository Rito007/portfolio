'use client';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { vertexShader, fragmentShader } from '@/app/lib/shaders/toonShader';
import { useThree } from '@react-three/fiber';

export default function Particles({ count = 100, radius = 3 }) {
  const mesh = useRef<THREE.Points>(null);
  const [mouse, setMouse] = useState([0, 0]);
  const angles = useMemo(() => Array.from({ length: count }, () => Math.random() * 2 * Math.PI), [count]);
  const distances = useMemo(() => Array.from({ length: count }, () => radius + Math.random() * 0.5), [count]);
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const [rotating, setRotating] = useState(true);
  const targets = useMemo(() => Array.from({ length: count }, () => new THREE.Vector3()), [count]);
  const { camera, scene } = useThree();

  // Função que lida com o movimento do mouse
  const onMouseMove = (event: any) => {
    

    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1 + window.scrollY;
    setMouse([x, y]);
  };

  const onMouseScrool = (event:any)=>{
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    if(window.scrollY >= 0 )
    {
      x = -40;
      y=-40;
    }
    
    
    setMouse([x, y]);
  }


  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onMouseScrool);
    setMouse([-20,-20]);
    return () => {window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('scroll', onMouseScrool)};
  }, []);

  useEffect(() => {
    const normalizado = new THREE.Vector2(mouse[0], mouse[1]).length();
    setRotating((normalizado >= 0.7) && !rotating || (normalizado >= 0.3) && rotating);
  }, [mouse]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) }, // Passando o mouse como uniforme
      uAttractRadius: { value: 0.7 }, // Raio de atração
    },
    transparent: true,
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    material.uniforms.uTime.value = time;
    material.uniforms.uMouse.value.set(mouse[0], mouse[1]);

    // 1) Define o raycaster
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2(mouse[0], mouse[1]);
    raycaster.setFromCamera(mouseVec, camera);

    // 2) Interseção limpa com o plano z=0 (sem mutar direction)
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(planeZ, intersection);

  
    // 4) Lógica das partículas
    for (let i = 0; i < count; i++) {
      const angle = angles[i] + time * 0.5;
      const distance = distances[i];

      const idx = i * 3;
      const currentPos = new THREE.Vector3(
        positions[idx + 0],
        positions[idx + 1],
        positions[idx + 2]
      );

      // Decide o target: mouse ou ponto orbital
      if (rotating) {
        targets[i].set(
          Math.cos(angle) * distance,
          Math.sin(angle) * distance,
          0
        );
      }  else {
        const orbitalRadiusX = 0.01 + Math.random() * 0.5; // Raio X entre 0.5 e 1.0
        const orbitalRadiusY = 0.01 + Math.random() * 0.5; // Raio Y entre 0.25 e 0.5
        const speed = 0.1; // Velocidade entre 0.3 e 1.0
        const localAngle = angle + time * speed;
      
        const x = Math.cos(localAngle) * orbitalRadiusX;
        const y = Math.sin(localAngle) * orbitalRadiusY;
        targets[i].set(intersection.x + x, intersection.y + y, 0);
      }
      

      // Transição suave
      currentPos.lerp(targets[i], 0.1); // 0.1 é o fator de suavidade

      positions[idx + 0] = currentPos.x;
      positions[idx + 1] = currentPos.y;
      positions[idx + 2] = 0;
    }

    if (mesh.current) {
      mesh.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry />
      <primitive object={material} attach="material" />
    </points>
  );
}
