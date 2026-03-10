import Link from "next/link";

export function Footer() {
    return (
        <>
            {/* Join The Legacy CTA */}
            <section className="bg-[#3A361A] px-4 py-24 sm:px-6 lg:px-8 text-center text-white">
                <div className="mx-auto max-w-[1100px]">

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className="h-[1px] w-12 bg-[#8C8567]" aria-hidden />
                        <p className="font-heading text-[32px] sm:text-[22px] font-medium italic tracking-wider text-[#A89E74]">
                            Join The Legacy
                        </p>
                        <span className="h-[1px] w-12 bg-[#8C8567]" aria-hidden />
                    </div>

                    <h2 className="font-body text-[20px] sm:text-[26px] font-bold tracking-[0.08em] text-white mb-6">
                        Raise A Glass To Heritage <span className="mx-2 text-white/80 font-normal">|</span> Honor Craftsmanship <span className="mx-2 text-white/80 font-normal">|</span> Share The Moment.
                    </h2>

                    <p className="font-body text-[13px] sm:text-[15px] font-medium leading-[2.2] tracking-[0.06em] text-[#C4C2B4] mb-20">
                        Cousins Vodka Offers A Gentle Sweetness, Exceptional Smoothness,<br />
                        And A Finish That Lingers With Quiet Authority.
                    </p>

                    <div className="mb-14 space-y-2">
                        <p className="font-body text-[15px] sm:text-[17px] font-bold italic tracking-[0.1em] text-[#C4C2B4]">
                            This Is Not Just Vodka.
                        </p>
                        <p className="font-body text-[15px] sm:text-[17px] font-bold italic tracking-[0.1em] text-white">
                            This Is Cultivated Excellence.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="#explore"
                            className="flex h-[52px] min-w-[240px] px-8 items-center justify-center rounded-[30px] bg-white font-body text-[13px] font-medium tracking-[0.03em] text-[#222222] transition hover:bg-zinc-200"
                        >
                            Explore the Collection
                        </Link>
                        <Link
                            href="#request"
                            className="flex h-[52px] min-w-[240px] px-8 items-center justify-center rounded-[30px] border border-[#6F6B50] bg-[#5E5B42] border-opacity-30 bg-opacity-70 font-body text-[13px] font-medium tracking-[0.03em] text-[#C4C2B4] transition hover:bg-[#68644A]"
                        >
                            Request Private Access
                        </Link>
                    </div>
                </div>
            </section>

            {/* Actual Footer */}
            <footer className="bg-[#F9F8F3] px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Col 1 */}
                    <div className="flex flex-col">
                        <Link href="/" className="mb-6">
                            <img
                                src="/logo.svg"
                                alt="Cousins Distillery Ltd."
                                className="h-14 w-auto object-contain object-left"
                            />
                        </Link>
                        <p className="font-body text-sm text-zinc-600 leading-relaxed mb-6">
                            Crafting premium spirits from pure yellow corn, cultivated with devotion and family heritage.
                        </p>
                        {/* Social Icons Placeholder */}
                        <div className="flex gap-4">
                            {['IN', 'FB', 'IG'].map((social) => (
                                <Link key={social} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D1BB8A] text-white hover:bg-[#bfa776] transition-colors">
                                    <span className="text-xs font-bold">{social}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div className="flex flex-col">
                        <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-zinc-900 mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'Company', 'Contact Us'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="font-body text-[15px] font-light text-zinc-600 hover:text-[#D1BB8A] transition-colors">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div className="flex flex-col">
                        <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-zinc-900 mb-6">
                            Products
                        </h3>
                        <ul className="space-y-4">
                            {['Cousins Vodka', 'Cousins Tequila', 'Cocktails', 'Merchandise'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="font-body text-[15px] font-light text-zinc-600 hover:text-[#D1BB8A] transition-colors">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 */}
                    <div className="flex flex-col">
                        <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-zinc-900 mb-6">
                            Get Updates
                        </h3>
                        <p className="font-body text-[15px] font-light text-zinc-600 mb-4">
                            Sign up for our newsletter to stay informed about new releases and events.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="w-full px-4 py-3 bg-white border border-zinc-300 rounded font-body text-sm text-zinc-900 focus:outline-none focus:border-[#D1BB8A]"
                            />
                            <button
                                type="button"
                                className="w-full px-4 py-3 bg-[#D1BB8A] text-white uppercase font-body text-sm font-semibold tracking-widest rounded hover:bg-[#bfa776] transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mx-auto max-w-[1280px] border-t border-zinc-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="font-body text-xs text-zinc-500">
                        © {new Date().getFullYear()} Cousins Distillery Ltd. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="font-body text-xs text-zinc-500 hover:text-[#D1BB8A]">Privacy Policy</Link>
                        <Link href="#" className="font-body text-xs text-zinc-500 hover:text-[#D1BB8A]">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
