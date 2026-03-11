export function ExperienceSection() {
    return (
        <section
            id="visit"
            className="relative bg-[#FEFEF6] px-4 py-16 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat scroll-mt-20"
            style={{ backgroundImage: "url('/the-exp-backgournd.png')" }}
        >
            <div className="absolute inset-0 bg-[#FEFEF6]/80"></div>

            <div className="relative mx-auto max-w-[1400px] text-center z-10 w-full flex flex-col items-center">

                {/* Header */}
                <div className="flex items-center justify-center gap-4 mb-3">
                    <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
                    <p className="font-heading text-[32px] font-bold italic tracking-wider text-[#9f860e]">
                        The Experience
                    </p>
                    <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
                </div>

                <h2 className="font-body text-[22px] sm:text-[28px] font-bold tracking-[0.1em] text-black mb-4">
                    A Spirit Of Distinction
                </h2>

                <p className="font-body text-[14px] lg:text-[15px] font-medium tracking-[0.05em] text-[#444444] leading-[1.8] mb-10 max-w-[500px]">
                    Cousins Vodka Offers A Gentle Sweetness, Exceptional Smoothness, And A Finish That Lingers With Quiet Authority.
                </p>

                {/* 3-Column Layout — bottle flanked by icons */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-4 w-full">

                    {/* Left Column — icons aligned right, tight to bottle */}
                    <div className="flex flex-col items-center lg:items-end justify-center gap-10 lg:gap-16 w-full lg:pr-6">
                        {/* Top Left */}
                        <div className="flex flex-col items-center lg:items-center text-center gap-3">
                            <img src="/noun-gluten-free.png" alt="Gluten Free Icon" className="w-[90px] lg:w-[110px] object-contain" />
                            <p className="font-body text-[15px] lg:text-[17px] font-semibold tracking-[0.08em] text-[#111111]">
                                Naturally Gluten-Free.
                            </p>
                        </div>
                        {/* Bottom Left */}
                        <div className="flex flex-col items-center lg:items-center text-center gap-3">
                            <img src="/noun-distillation.png" alt="Distilled Icon" className="w-[90px] lg:w-[110px] object-contain" />
                            <p className="font-body text-[15px] lg:text-[17px] font-semibold tracking-[0.08em] text-[#111111]">
                                Thirteen Times Distilled.
                            </p>
                        </div>
                    </div>

                    {/* Center Column — bottle larger */}
                    <div className="flex justify-center w-[300px] lg:w-[520px] mx-auto z-10 relative">
                        <img
                            src="/bottle.png"
                            alt="Cousins Vodka Bottle"
                            className="w-full h-auto object-contain drop-shadow-2xl mix-blend-multiply"
                        />
                    </div>

                    {/* Right Column — icons aligned left, tight to bottle */}
                    <div className="flex flex-col items-center lg:items-start justify-center gap-10 lg:gap-16 w-full lg:pl-6">
                        {/* Top Right */}
                        <div className="flex flex-col items-center lg:items-center text-center gap-3">
                            <img src="/noun-corn.png" alt="Corn Icon" className="w-[70px] lg:w-[90px] h-[95px] object-contain" />
                            <p className="font-body text-[15px] lg:text-[17px] font-semibold tracking-[0.08em] text-[#111111]">
                                Crafted From 100% Yellow Corn.
                            </p>
                        </div>
                        {/* Bottom Right */}
                        <div className="flex flex-col items-center lg:items-center text-center gap-3">
                            <img src="/noun-prepared-in-small-batches.png" alt="Small Batches Icon" className="w-[90px] lg:w-[110px] object-contain" />
                            <p className="font-body text-[15px] lg:text-[17px] font-semibold tracking-[0.08em] text-[#111111]">
                                Small-Batch Refined.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
