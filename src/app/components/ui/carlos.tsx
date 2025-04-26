// components/CustomizableCharacter.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import GansoCarlos from './GansoCarlos';
function Carlos() {

  return (
    <div className="py-24 px-6 md:px-20 bg-amber-50 h-auto">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-amber-900 ">
        Say hi to Carlos!
      </h2>
      <p className="text-lg max-w-2xl text-center mx-auto mb-12 text-neutral-800 ">
        Meet my mascot! Click on it to hear a fun sound!
      </p>
      <div className="h-[300px] md:h-[500px] w-full border-2 border-amber-950 bg-blue-200">
      <Canvas shadows className="w-full h-full">
    <Suspense fallback={null}>

      <ambientLight intensity={0.3} />

      <GansoCarlos />

      <mesh receiveShadow position={[0, -3, 0]}>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.5} />
      </mesh>
    </Suspense>
  </Canvas>
      </div>
    </div>
  );
}

export default Carlos;
