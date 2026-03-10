import Image from "next/image";

export function PhilosophySection() {
    return (
        <section className="bg-[#FEFEF6] px-4 py-24 sm:px-6 lg:px-8">
            {/* Centered Top Header */}
            <div className="mx-auto max-w-4xl text-center mb-16">
                <div className="flex items-center justify-center gap-4">
                    <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
                    <p className="font-heading text-[32px] font-bold italic tracking-wider text-[#9f860e]">
                        The Philosophy
                    </p>
                    <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
                </div>
                <h2 className="mt-6 font-body text-[26px] sm:text-[32px] font-bold tracking-[0.1em] text-black">
                    A House Built On Unity
                </h2>
            </div>

            <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

                {/* Left: Lifestyle Image */}
                <div className="relative w-full aspect-[4/3] lg:aspect-[1.3/1] overflow-hidden ml-auto lg:max-w-[550px]">
                    <img
                        src="/lady-with-glass.jpg"
                        alt="Lady with an elegant glass of Cousins Vodka"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>

                {/* Right: Text content */}
                <div className="flex flex-col justify-center lg:pr-8">
                    <div className="mb-6">
                        <h3 className="font-body text-[16px] xl:text-[20px] font-medium tracking-[0.08em] text-[#222222]">
                            Cousins Distillery Was Founded On More Than Ambition.
                        </h3>
                        <p className="font-heading text-[20px] xl:text-[28px] font-bold italic tracking-wider text-[#9f860e] mt-1">
                            It Was Founded On Family.
                        </p>
                    </div>

                    <div className="font-body text-[16px] xl:text-[18px] font-medium tracking-[0.06em] text-[#555555] space-y-2 mb-8 pr-4">
                        <p>
                            Every Bottle Carries The Spirit Of Unity, Craftsmanship, And Shared Vision — A Reminder That True Luxury Is Rooted In Authenticity.
                        </p>
                    </div>

                    <ul className="mb-10 space-y-2">
                        {[
                            "We Do Not Produce For The Masses.",
                            "We Craft For Connoisseurs.",
                            "For Those Who Appreciate Refinement Not As Extravagance — But As Discipline.",
                            "From Our Family... To Yours."
                        ].map((point, i) => (
                            <li key={i} className="flex gap-2 items-start">
                                <span className="mt-[7px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#9f860e] text-[#9f860e]" aria-hidden>
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                                </span>
                                <span className="font-body text-[15px] xl:text-[18px] font-medium leading-[2.2] tracking-[0.06em] text-[#555555]">
                                    {point}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
}
