import Link from "next/link";

export function OriginSection() {
  return (
    <section id="about" className="bg-[#FEFEF6] px-4 py-20 sm:px-6 lg:px-8 scroll-mt-20">
      {/* Section header */}
      <header className="mx-auto max-w-4xl text-center mb-12">
        <div className="flex items-center justify-center gap-4">
          <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
          <p className="font-heading text-[32px] font-bold italic tracking-wider text-[#9f860e]">
            The Origin
          </p>
          <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
        </div>
        <h2 className="mt-4 font-body text-[22px] sm:text-[28px] font-bold tracking-[0.1em] text-black">
          A Spirit Meant To Be Shared. Savored. Remembered.
        </h2>
      </header>

      {/* 3-column, 2-row grid with no gaps */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">

        {/* Row 1, Col 1 — Text block */}
        <div className="flex flex-col justify-center bg-transparent p-8 lg:p-10 aspect-square">
          <div className="mb-4">
            <h3 className="font-body text-[14px] lg:text-[15px] font-semibold tracking-widest text-[#111111]">
              Where The Story Begins
            </h3>
            <p className="font-heading text-[18px] lg:text-[22px] font-bold italic tracking-wider text-[#9f860e] mt-1">
              In The Fields
            </p>
          </div>
          <div className="font-body text-[14px] lg:text-[14px] font-medium leading-[1.8] tracking-[0.03em] text-[#444444] space-y-4">
            <p>
              Long Before The First Drop Is Poured, Our Story Begins Beneath Open Skies.
            </p>
            <p>
              Waves Of Golden Corn Sway Across Fertile Fields — Each Kernel Carefully Selected In Partnership With Growers Who Honor The Land As We Do. This Is Not Sourcing. It Is Stewardship.
            </p>
          </div>
        </div>

        {/* Row 1, Col 2 — Field Image */}
        <div className="relative w-full aspect-square overflow-hidden bg-[#A89530]">
          <img
            src="/cornone.jpg"
            alt="Corn Fields"
            className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-75"
          />
        </div>

        {/* Row 1, Col 3 — Mauve Block */}
        <div className="flex flex-col justify-center bg-[#D3C6BF] p-8 lg:p-10 aspect-square">
          <div className="flex justify-center" aria-hidden>
            <img src="/corn-pink-icon.png" alt="" className="w-[122px] h-[122px] object-contain" />
          </div>
          <p className="font-body text-[14px] lg:text-[14px] font-medium leading-[1.8] tracking-[0.03em] text-[#3E2E21]">
            Born Entirely From Premium Yellow Corn, Our Vodka Is Naturally Gluten-Free, Carrying A Delicate Whisper Of Sweetness — A Signature Of Its Noble Origin.
          </p>
        </div>

        {/* Row 2, Col 1 — Agave Image */}
        <div className="relative w-full aspect-square overflow-hidden bg-[#A89530]">
          <img
            src="/corntwo.jpg"
            alt="Corn Fields"
            className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-75"
          />
        </div>

        {/* Row 2, Col 2 — Dark Brown Statement */}
        <div className="flex flex-col items-center justify-center bg-[#34241D] p-8 lg:p-10 text-center aspect-square">
          <p className="font-body text-[14px] lg:text-[14px] font-medium leading-[1.9] tracking-[0.05em] text-[#D3C6BF]">
            From Seed To Spirit, Every Step Reflects Patience, Precision, And Purpose.
          </p>
        </div>

        {/* Row 2, Col 3 — Watch Box */}
        <div className="group flex flex-col items-center justify-center bg-white p-10 lg:p-12 text-center aspect-square">
          <Link href="#watch-story" className="flex flex-col items-center group">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#D1D1D1] text-white transition-all group-hover:bg-[#9f860e]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="mt-6 font-body text-[14px] lg:text-[16px] font-medium text-zinc-600 tracking-[0.1em] transition-colors group-hover:text-[#9f860e]">
              Watch Full Story
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
