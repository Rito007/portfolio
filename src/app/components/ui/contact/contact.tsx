export default function Contact() {
    return (
        <section id="contact" className="bg-amber-50 px-6 py-24 md:px-20">
            <h2 className="text-4xl font-extrabold mb-12 text-center tracking-tight text-black">
                📬 Get in Touch
            </h2>
            <form className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6">
                <div>
                    <label htmlFor="name" className="block font-medium text-black mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block font-medium text-black mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block font-medium text-black mb-1">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-amber-900 text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition"
                >
                    Send Message
                </button>
            </form>
        </section>
    )
}
