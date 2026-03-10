import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src="/main-vid.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay gradients for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"
        aria-hidden
      />

      {/* Content */}
      <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl pt-10 flex flex-col items-center">
          {/* Logo Overlay at top center */}
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-white/80 mb-6">
            Cousins Vodka
          </p>

          {/* H1: Cormorant Garamond, White, text-7xl or larger */}
          <h1 className="font-heading text-[5rem] sm:text-[6rem] lg:text-[7rem] font-bold leading-[1] text-white">
            Cousins Vodka
          </h1>

          {/* Subheading: Italic, Cormorant, Gold #D1BB8A, text-2xl or 35px */}
          <p className="mt-8 font-heading text-2xl sm:text-3xl lg:text-[35px] tracking-[0.05em] font-bold italic text-white">
            From Bloodline to Bottle. <br /> From Field to Crown.
          </p>

          {/* Para: Poppins, centered, white, max-w-2xl */}
          <p className="mx-auto mt-8 max-w-2xl font-body text-lg sm:text-[20px] font-light leading-relaxed text-white max-sm:px-4">
            At Cousins Distillery, vodka is not merely distilled —{" "}
            <em className="font-normal italic">It is Cultivated.</em>{" "}
            Crafted through devotion, refined through thirteen stages, and
            destined for those who recognize true distinction.
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="#legacy"
              className="flex h-[55px] min-w-[240px] px-8 items-center justify-center rounded-full bg-[#D1BB8A] font-body text-[14px] font-medium uppercase tracking-widest text-white transition hover:bg-[#bfa776]"
            >
              Discover the Legacy
            </Link>
            <Link
              href="#house"
              className="flex h-[55px] min-w-[240px] px-8 items-center justify-center rounded-full border-2 border-white/80 bg-transparent font-body text-[14px] font-medium uppercase tracking-widest text-white transition hover:bg-white/10"
            >
              Enter the House
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
