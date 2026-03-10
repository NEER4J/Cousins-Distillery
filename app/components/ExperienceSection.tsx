import Image from "next/image";

export function ExperienceSection() {
    return (
        <section
            className="relative bg-[#FEFEF6] px-4 py-24 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/the-exp-backgournd.png')" }}
        >
            <div className="absolute inset-0 bg-[#FEFEF6]/80"></div>

            <div className="relative mx-auto max-w-[1240px] text-center z-10 w-full flex flex-col items-center">
                {/* Header */}
                <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
                    <p className="font-heading text-[32px] font-bold italic tracking-wider text-[#9f860e]">
                        The Experience
                    </p>
                    <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
                </div>

                <h2 className="font-body text-[26px] sm:text-[32px] font-bold tracking-[0.1em] text-black mb-8">
                    A Spirit Of Distinction
                </h2>

                <p className="font-body text-[16px] xl:text-[18px] font-medium leading-[2.2] tracking-[0.06em] text-[#555555] mb-20">
                    Cousins Vodka Offers A Gentle Sweetness, Exceptional Smoothness,<br />
                    And A Finish That Lingers With Quiet Authority.
                </p>

                {/* 3-Column Layout tightened tightly around the bottle */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-12 lg:gap-8 w-full max-w-[1000px] mx-auto">

                    {/* Left Column (Icons) aligned right */}
                    <div className="flex flex-col items-center lg:items-end justify-center gap-16 lg:gap-32 w-full lg:pr-8">
                        {/* Top Left */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <img src="/noun-gluten-free.png" alt="Gluten Free Icon" className="w-[50px] lg:w-[60px] object-contain" />
                            <p className="font-body text-[16px] xl:text-[18px] font-bold tracking-widest text-[#111111]">
                                Naturally Gluten-Free.
                            </p>
                        </div>
                        {/* Bottom Left */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <img src="/noun-distillation.png" alt="Distilled Icon" className="w-[50px] lg:w-[60px] object-contain" />
                            <p className="font-body text-[16px] xl:text-[18px] font-bold tracking-widest text-[#111111]">
                                Thirteen Times Distilled.
                            </p>
                        </div>
                    </div>

                    {/* Center Column (Bottle) perfectly sized */}
                    <div className="flex justify-center w-[280px] lg:w-[320px] mx-auto z-10 relative">
                        <div className="relative w-full aspect-[1/2.2] flex items-center justify-center drop-shadow-2xl mix-blend-multiply">
                            <img
                                src="/bottle.png"
                                alt="Cousins Vodka Bottle"
                                className="absolute inset-0 w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Column (Icons) aligned left */}
                    <div className="flex flex-col items-center lg:items-start justify-center gap-16 lg:gap-32 w-full lg:pl-10">
                        {/* Top Right */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <img src="/noun-corn.png" alt="Corn Icon" className="w-[45px] lg:w-[50px] h-[64px] object-contain" />
                            <p className="font-body text-[16px] xl:text-[18px] font-bold tracking-widest text-[#111111]">
                                Crafted From 100% Yellow Corn.
                            </p>
                        </div>
                        {/* Bottom Right */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <img src="/noun-prepared-in-small-batches.png" alt="Small Batches Icon" className="w-[50px] lg:w-[60px] object-contain" />
                            <p className="font-body text-[16px] xl:text-[18px] font-bold tracking-widest text-[#111111]">
                                Small-Batch Refined.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
