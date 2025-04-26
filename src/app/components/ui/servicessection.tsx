export default function ServicesSection() {
    return (
        <section id="about" className="py-24 px-6 md:px-20 bg-white">
            <h2 className="text-4xl font-extrabold mb-16 text-center tracking-tight text-black">
                💼 What I Can Do for You
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                    {
                        title: "Build Your Website",
                        desc: "Modern landing pages, portfolios, or business websites — fast, clean, and optimized.",
                    },
                    {
                        title: "Automate Your Business",
                        desc: "From bots that save you time to local dashboards and smart data tools.",
                    },
                    {
                        title: "Improve Your Current Site",
                        desc: "UI/UX enhancements, performance optimization, and technical SEO improvements.",
                    },
                    {
                        title: "Tech Support & Consulting",
                        desc: "Need help bringing an idea to life or fixing a bug? I’m here to assist.",
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-amber-50 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
                    >
                        <h3 className="text-2xl font-semibold mb-3 text-amber-900">
                            {item.title}
                        </h3>
                        <p className="text-neutral-900">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <a
                    href="#contact"
                    className="inline-block px-7 py-3 rounded-full font-semibold text-white bg-amber-900 hover:brightness-110 transition duration-300"
                    aria-label="Contact me via email"
                >
                    ✉️ Let's Talk
                </a>
            </div>
        </section>
    );
}