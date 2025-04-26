"use client"


export default function KnowSection() {
    return (
        <section className="py-24 px-6 md:px-20 bg-amber-50">
            <h2 className="text-4xl font-extrabold mb-16 text-center tracking-tight text-amber-900 ">
                🧠 What I Know
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        title: "Modern Front-end",
                        desc: "React, Next.js, Tailwind CSS, Framer Motion animations, and responsive UI.",
                    },
                    {
                        title: "Back-end & APIs",
                        desc: "Node.js, Express, MongoDB, and integration with REST or GraphQL APIs.",
                    },
                    {
                        title: "Desktop Apps & Bots",
                        desc: "Building local apps with Tauri + React and bots to automate workflows.",
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
                    >
                        <h3 className="text-2xl font-semibold mb-3 text-amber-900 ">
                            {item.title}
                        </h3>
                        <p className="text-neutral-800 ">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}