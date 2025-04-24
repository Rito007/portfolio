'use client';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { vertexShader, fragmentShader } from '@/app/lib/shaders/toonShader';

export default function Particles({ count = 100, radius = 3 }) {
  const mesh = useRef<THREE.Points>(null);
  const [mouse, setMouse] = useState([0, 0]);
  const angles = useMemo(() => Array.from({ length: count }, () => Math.random() * 2 * Math.PI), [count]);
  const distances = useMemo(() => Array.from({ length: count }, () => radius + Math.random() * 0.5), [count]);
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const [rotating, setRotating] = useState(true);
  
  // Função que lida com o movimento do mouse
  const onMouseMove = (event : any) => {
    // Posição do mouse normalizada (-1 a 1)
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMouse([x, y]);
    
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Verifica se a distância do mouse é menor que 0.7
  useEffect(() => {
    console.log(mouse);
    const normalizado = new THREE.Vector2(mouse[0], mouse[1]).length();
    setRotating(normalizado >= 0.7); // Se distância menor que 0.7, parar de rotacionar
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
    material.uniforms.uMouse.value.set(mouse[0], mouse[1]); // Atualiza o valor do uniforme do mouse
    
    if (rotating) {
      for (let i = 0; i < count; i++) {
        const angle = angles[i] + time * 0.5; // Velocidade de rotação
        const distance = distances[i];

        positions[i * 3 + 0] = Math.cos(angle) * distance;
        positions[i * 3 + 1] = Math.sin(angle) * distance;
        positions[i * 3 + 2] = 0;
      }
    } else {
      // Atração do mouse - move as partículas em direção ao mouse
      for (let i = 0; i < count; i++) {
        const particlePosition = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        
        // Calcular direção de atração
        const directionToMouse = new THREE.Vector2(mouse[0], mouse[1]).sub(new THREE.Vector2(particlePosition.x, particlePosition.y)).normalize();
        
        // Mover as partículas em direção ao mouse
        positions[i * 3] += directionToMouse.x * 0.05; // Multiplicar pela intensidade da atração
        positions[i * 3 + 1] += directionToMouse.y * 0.05;
      }
    }

    // Atualiza as posições das partículas
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
