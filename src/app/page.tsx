import Navbar from "@/app/components/ui/navbar";
import Hero from "@/app/components/ui/hero";
import Image from 'next/image';
export default function Home() {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
  return (
    <div className="">
      <Navbar links={links}></Navbar>
      <main className="w-full">
        <Hero heading={"Miguel's Developer Portfolio"} text={"More than a portfolio - a space to explore, create, and grow."}></Hero>
      </main>
      <section className="px-6 py-20 md:px-10 lg:px-20 bg-white flex flex-col lg:flex-row items-center justify-center gap-12">
        <Image
          src="/imgs/MyImg.jpg"
          alt="Miguel Rito Imagem"
          width={400}
          height={400}
          className="rounded-2xl shadow-lg object-cover w-[300px] md:w-[400px] h-auto"
        />

        <div className="max-w-xl text-black">
          <h1 className="text-3xl font-bold mb-4 text-left">Who is Miguel Rito?</h1>
          <p className="text-justify leading-relaxed">
            Hi! I'm Miguel, an IT student with a strong drive for technology, creativity, and problem-solving.
            Born in 2006, I started exploring computers and programming at an early age, which led me to independently learn how to code and experiment with building websites, games, bots, and other custom projects even before starting my degree in Information Technology.
            <br /><br />
            Besides tech, I enjoy teaching myself new skills — from learning guitar through online resources to diving into topics like history, science, and literature. I'm a curious mind always looking to grow and create.
            <br /><br />
            Right now, I'm focused on building my portfolio and helping clients bring their ideas to life, especially through web development, automation tools, and game dev projects.
            <br /><br />
            If you're looking for someone who’s hands-on, adaptable, and committed to delivering quality work, I’d love to work with you!
          </p>
        </div>
      </section>

    </div>
  );
}
