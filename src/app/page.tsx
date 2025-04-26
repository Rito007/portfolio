import Navbar from "@/app/components/ui/navbar";
import Hero from "@/app/components/ui/hero";
import KnowSection from "./components/knownsection";
import Carlos from "./components/ui/carlos";
import AboutSection from "./components/ui/aboutsection";
import ServicesSection from "./components/ui/servicessection";
import Contact from "./components/ui/contact";
export default function Home() {
  const links = [
    { label: 'Main', href: '#main' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="font-sans bg-gray-50">
      <Navbar links={links} />

      <main>
        <Hero
          heading={"Miguel's Developer Portfolio"}
          text={"A space where creativity and technology meet. Explore, create, and innovate."}
        />
        <AboutSection />
        <KnowSection />
        <Carlos />
        <ServicesSection/>
        <Contact/>
      </main>
    </div>
  );
}
