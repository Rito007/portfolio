'use client'
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Particles = dynamic(() => import('@/app/components/fiberSim/particles'), { ssr:  false});

interface HeroProps {
  heading: string;
  text: string;
}

export default function Hero(props: HeroProps) {
  return (
    <section id="main" className="relative w-full h-screen bg-amber-100 overflow-hidden">
      <div className="absolute w-full z-10 flex flex-col justify-center items-center h-full gap-5">
      
        <div className="space-y-2 text-center">
          <motion.div
            drag
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="cursor-grab active:cursor-grabbing text-4xl text-amber-900">{props.heading}</h1>
          </motion.div>

          <motion.div
            drag
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="cursor-grab active:cursor-grabbing text-amber-900">{props.text}</h2>
          </motion.div>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="rounded-md border-2 cursor-pointer text-sm border-amber-900 py-2 px-4 bg-amber-900 text-white">Explore More</button>
          <button className="rounded-md border-2 cursor-pointer text-sm border-amber-900 py-2 px-4 bg-amber-900 text-white"><a>Hire Me</a></button>
        </div>
      </div>
      <Canvas className="absolute top-0 left-0 w-full h-full z-0">
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <Particles count={120} radius={3} />
        </Suspense>
      </Canvas>
    </section>
  );
}
