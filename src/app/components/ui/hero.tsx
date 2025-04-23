'use client'
import { motion } from 'framer-motion';

interface HeroProps {
    heading: string;
    text:string;
  }

export default function Hero(props: HeroProps) {
  return (
    <div className="overflow-x-hidden flex flex-col align-middle justify-center w-full h-screen gap-5 bg-amber-100">
        <div className='flex flex-col space-y-2'>
        <motion.div 
          drag
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
           whileHover={{ scale: 1.1,  transformOrigin: 'center' }}
           whileTap={{ scale: 0.95, transformOrigin: 'center' }}
           animate={{ x: 0, y: 0 }}
         >
        <h1 className="cursor-grab active:cursor-grabbing  animate-fade-in-down text-4xl text-center text-amber-900 text-">{props.heading}</h1>
       
        </motion.div>
        <motion.div 
        drag
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
         whileHover={{ scale: 1.1,  transformOrigin: 'center' }}
         whileTap={{ scale: 0.95, transformOrigin: 'center' }}
         animate={{ x: 0, y: 0 }}
         >
        <h2 className="cursor-grab active:cursor-grabbing text-center text-amber-900">{props.text}</h2>
        </motion.div>
        </div>
        <div className="w-full flex flex-wrap gap-2 justify-center p-5 ">
            <button className={`rounded-md border-2 text-sm border-amber-900 py-2 px-2 bg-amber-900 h-auto w-30 min-w-[70px]`}>Explore More</button>
            <button className={`rounded-md border-2 text-sm border-amber-900 py-2 px-2 bg-amber-900 h-auto w-30 min-w-[70px]`}>Hire Me</button>
        </div>

    </div>
    
  )
}
