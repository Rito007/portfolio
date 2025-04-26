import Image from "next/image";

export default function AboutSection()
{
    return(
        <section id="about" className="px-6 py-20 md:px-10 lg:px-20 bg-white flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="flex justify-center w-full max-w-xs md:max-w-md">
          <Image
            src="/imgs/MyImg.jpg"
            alt="Miguel Rito"
            width={400}
            height={400}
            className="rounded-2xl shadow-lg object-cover w-full h-auto"
          />
        </div>

        <div className="max-w-xl text-black">
          <h2 className="text-3xl font-bold mb-4 text-left">Who is Miguel Rito?</h2>
          <p className="text-justify leading-relaxed">
            Hi! I'm Miguel, an IT student with a passion for technology, creativity, and problem-solving.
            I started programming at a young age, learning to code and build websites, games, bots, and other projects independently.
            <br /><br />
            In addition to tech, I enjoy learning new skills, such as playing guitar, and exploring topics like history, science, and literature.
            <br /><br />
            Currently, I am focused on growing my portfolio and helping clients bring their ideas to life through web development, automation tools, and game development projects.
            <br /><br />
            If you're looking for someone who's hands-on, adaptable, and committed to quality work, I'd love to collaborate with you!
          </p>
        </div>
      </section>
    );
}