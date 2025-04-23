'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = ({ links }) => {
    const pathname = usePathname();
    const [isActiveNav,setIsActiveNav] = useState(false);

    const handleScroll = ()=>{
        (window.scrollY > window.innerHeight - 100) ? setIsActiveNav(true) : setIsActiveNav(false);
    }

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
          };
    },[])
    useEffect(() => {
        console.log("isActiveNav:", isActiveNav); // Agora o valor de isActiveNav será refletido corretamente
    }, [isActiveNav]);
    


    return (
        <motion.div  className='fixed w-full z-10'
        initial={{ opacity: 0, y: isActiveNav ? 0 : -50 }}  // Começa invisível e um pouco acima
            animate={{
                y: isActiveNav ? 0 : -50,  
                opacity: isActiveNav ? 1 : 0,   // Se ativo, torna visível (opacity 1)
                     // Se ativo, move para a posição original
            }}
            exit={{
                y: -50,  
                opacity: 0,                     // Desaparece ao sair
                                     // Move-se para cima ao sair
            }}
            transition={{
                y: { duration: 0.5, ease: "easeInOut" },
                opacity: { duration: 1, ease: "easeInOut" },
                
            }}
        >
        <nav className={`w-full flex justify-center py-5 bg-amber-100 shadow-sm`}>
                <ul className="flex space-x-4 text-sm">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={index}>
                                <Link
                                    href={link.href}
                                    className={`inline-block text-center rounded-xl border-2 py-1 w-24 px-2 ${isActive ? ' border-amber-900 bg-amber-900 text-white ' : 'border-amber-900 text-amber-900'
                                        } hover:border-amber-900 hover:bg-amber-900 hover:text-white transition-all duration-300 ease-in-out`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
        </nav>
        </motion.div>
    );
};

export default Navbar;