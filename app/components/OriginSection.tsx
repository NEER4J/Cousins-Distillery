import Link from "next/link";
import Image from "next/image";

export function OriginSection() {
  return (
    <section className="bg-[#FEFEF6] px-4 py-20 sm:px-6 lg:px-8">
      {/* Section header */}
      <header className="mx-auto max-w-4xl text-center pb-16">
        <div className="flex items-center justify-center gap-4">
          <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
          <p className="font-heading text-[32px] font-bold italic tracking-wider text-[#9f860e]">
            The Origin
          </p>
          <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
        </div>
        <h2 className="mt-6 font-body text-[20px] sm:text-[24px] font-bold tracking-widest text-[#111111]">
          A Spirit Meant To Be Shared. Savored. Remembered.
        </h2>
      </header>

      {/* 3-column, 2-row grid with no gaps */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">

        {/* Row 1, Col 1 (Text block) */}
        <div className="flex flex-col justify-center bg-transparent p-10 lg:p-12 aspect-square">
          <div>
            <h3 className="font-body text-[16px] lg:text-[18px] font-semibold tracking-widest text-[#111111] mb-1">
              Where The Story Begins
            </h3>
            <p className="font-heading text-[32px] lg:text-[20px] font-medium italic tracking-wider text-[#9f860e]">
              In The Fields
            </p>
          </div>
          <div className="mt-8 font-body text-[16px] lg:text-[18px] font-semibold leading-[1.8] xl:leading-[2] tracking-[0.06em] text-[#333333] space-y-6">
            <p>
              Long Before The First Drop Is Poured,<br />
              Our Story Begins Beneath Open Skies.
            </p>
            <p>
              Waves Of Golden Corn Sway Across Fertile<br />
              Fields — Each Kernel Carefully Selected In<br />
              Partnership With Growers Who Honor The<br />
              Land As We Do. This Is Not Sourcing.<br />
              It Is Stewardship.
            </p>
          </div>
        </div>

        {/* Row 1, Col 2 (Field Image) */}
        <div className="relative w-full aspect-square overflow-hidden bg-[#E2D8B3]">
          <img
            src="/origin-one.jpg"
            alt="Corn Fields"
            className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-80"
          />
        </div>

        {/* Row 1, Col 3 (Mauve Block) */}
        <div className="flex flex-col items-center justify-center bg-[#D3C6BF] text-center p-10 lg:p-12 aspect-square">
          <div className="mb-6 flex items-center justify-center" aria-hidden>
            <img src="/corn-pink-icon.png" alt="" className="w-[60px] h-[60px] object-contain" />
          </div>
          <p className="font-body text-[16px] lg:text-[18px] font-semibold leading-[1.8] lg:leading-[2] tracking-[0.06em] text-[#3E2E21] px-1">
            Born Entirely From Premium Yellow Corn,<br />
            Our Vodka Is Naturally Gluten-Free,<br />
            Carrying A Delicate Whisper Of Sweetness<br />
            — A Signature Of Its Noble Origin.
          </p>
        </div>

        {/* Row 2, Col 1 (Agave Image) */}
        <div className="relative w-full aspect-square overflow-hidden bg-[#D4C3A3]">
          <img
            src="/origin-two.jpg"
            alt="Agave plant"
            className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-80"
          />
        </div>

        {/* Row 2, Col 2 (Dark Brown Statement) */}
        <div className="flex flex-col items-center justify-center bg-[#392B24] p-10 lg:p-12 text-center aspect-square">
          <p className="font-body text-[16px] lg:text-[18px] font-medium leading-[2] lg:leading-[2.2] tracking-widest text-[#D3C6BF] px-4">
            From Seed To Spirit, Every Step Reflects<br />
            Patience, Precision, And Purpose.
          </p>
        </div>

        {/* Row 2, Col 3 (Watch Box) */}
        <div className="group flex flex-col items-center justify-center bg-white p-10 lg:p-12 text-center transition-colors aspect-square">
          <Link
            href="#watch-story"
            className="flex flex-col items-center group"
          >
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
