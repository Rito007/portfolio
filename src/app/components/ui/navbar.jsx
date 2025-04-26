'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ links }) => {
  const [isActiveNav, setIsActiveNav] = useState(false);
  const [activeSection, setActiveSec] = useState('');
  
  // Referência para a navbar
  const navbarRef = useRef(null);

  const handleScroll = () => {
    setIsActiveNav(window.scrollY > window.innerHeight - 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(()=>{
    console.log(activeSection);
  },[activeSection])

  useEffect(() => {
    const sections = links
      .map(link => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSec(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.3,
      }
    );

    sections.forEach(section => observer.observe(section));
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [links]);

  // Função para rolar até a seção, levando em conta a altura da navbar
  const handleLinkClick = (event, targetId) => {
    event.preventDefault(); // Previne o comportamento padrão de rolagem

    const targetElement = document.getElementById(targetId);
    const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - navbarHeight, // Subtrai a altura da navbar
        behavior: 'smooth', // Rolagem suave
      });
    }
  };

  return (
    <motion.div
      ref={navbarRef} // Adiciona a referência da navbar
      className="fixed w-full z-20"
      initial={{ opacity: 0, y: isActiveNav ? 0 : -50 }}
      animate={{
        y: isActiveNav ? 0 : -50,
        opacity: isActiveNav ? 1 : 0,
      }}
      exit={{ y: -50, opacity: 0 }}
      transition={{
        y: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 1, ease: "easeInOut" },
      }}
    >
      <nav className="w-full flex justify-center py-5 bg-amber-100 shadow-sm">
        <ul className="flex space-x-4 text-sm">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                onClick={(event) => handleLinkClick(event, link.href.slice(1))} // Passa o ID da seção
                className={`inline-block text-center rounded-xl border-2 py-1 w-24 px-2 transition-all duration-1000 ${
                  activeSection === link.href.slice(1)
                    ? 'border-amber-900 bg-amber-900 text-white'
                    : 'border-amber-900 text-amber-900'
                } hover:border-amber-900 hover:bg-amber-900 hover:text-white transition-all duration-300 ease-in-out`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Navbar;
