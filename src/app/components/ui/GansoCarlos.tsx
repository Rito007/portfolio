import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import useSound from 'use-sound'; // Para usar o som

export default function GansoCarlos() {
  const { scene } = useGLTF('./assets/models/carlos.glb');
  const headBone = useRef<THREE.Bone | null>(null);
  const headTopBone = useRef<THREE.Bone | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Carregar o som
  const [play] = useSound('/assets/sounds/QuackSound.mp3'); // Caminho para o arquivo de som

  useEffect(() => {
    const bone = scene.getObjectByName('Bone001') as THREE.Bone | null;
    const bone2 = scene.getObjectByName('Bone002') as THREE.Bone | null;
    
    if (bone) headBone.current = bone;
    if (bone2) headTopBone.current = bone2;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(-(event.clientY / window.innerHeight) * 2 + 1);
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [scene]);

  useFrame(() => {
    if (!headBone.current) return;
    if (headTopBone.current) {
      headTopBone.current.rotation.y = -0.2;
    }
    headBone.current.rotation.y = THREE.MathUtils.lerp(
      headBone.current.rotation.y,
      mouse.x * 0.8,
      0.1
    );
    headBone.current.rotation.x = THREE.MathUtils.lerp(
      headBone.current.rotation.x,
      mouse.y * 0.8,
      0.1
    );
  });

  // Função para tocar o som ao clicar no ganso
  const handleClick = () => {
    play(); // Toca o som
  };

  return (
    <primitive
      castShadow
      receiveShadow
      position={[0, -3, 0]}
      object={scene}
      scale={2.5}
      onClick={handleClick} // Adiciona o evento de clique
    />
  );
}