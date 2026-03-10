import Image from "next/image";

const STEPS = [
  "Small Batches Are Milled With Intention.",
  "Blended With Pristine Water.",
  "Given Time To Breathe.",
  "Through Copper Pot Stills, Crystal-Clear Spirit Rises — Polished,\nFiltered, Perfected — Achieving Brilliance While Retaining Depth.",
];

export function RoyalCraftSection() {
  return (
    <section className="bg-[#FEFEF6] px-4 py-24 sm:px-6 lg:px-8">
      {/* Centered Top Header */}
      <div className="mx-auto max-w-4xl text-center mb-12">
        <div className="flex items-center justify-center gap-4">
          <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
          <p className="font-heading text-[32px] font-bold italic tracking-wider text-[#9f860e]">
            The Royal Craft
          </p>
          <span className="h-[1px] w-12 bg-[#9f860e]" aria-hidden />
        </div>
        <h2 className="mt-4 font-body text-[22px] sm:text-[28px] font-bold tracking-[0.1em] text-black">
          The Thirteen Stages Of Refinement
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left: text content */}
        <div className="flex flex-col justify-center lg:pl-8">
          <div className="mb-6">
            <h3 className="font-body text-[16px] lg:text-[18px] font-semibold tracking-widest text-[#111111]">
              Great Spirits Are Not Rushed.
            </h3>
            <p className="font-heading text-[20px] lg:text-[28px] font-bold italic tracking-wider text-[#9f860e] mt-1">
              They Are Refined.
            </p>
          </div>

          <div className="font-body text-[16px] xl:text-[18px] font-medium  tracking-[0.06em] text-[#444444] space-y-2 mb-6">
            <p>
              Distilled Not Once... Not Twice... But Thirteen Times, Cousins Vodka Undergoes A Meticulous Journey Of Purification And Elevation. Each Stage Removes Impurity While Preserving Character — Sculpting Clarity Without Stripping Soul.
            </p>
          </div>

          <ul className="mb-6">
            {STEPS.map((step, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="mt-[7px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#9f860e] text-[#9f860e]" aria-hidden>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </span>
                <span className="font-body text-[16px] xl:text-[18px] font-medium leading-[1.8] xl:leading-[2.2] tracking-[0.06em] text-[#444444] whitespace-pre-wrap">
                  {step}
                </span>
              </li>
            ))}
          </ul>

          <p className="font-body text-[16px] xl:text-[18px] font-medium leading-[2] tracking-[0.08em] text-[#444444]">
            <span className="font-bold text-[#9f860e]">The Result: </span>
            An Exquisite, Silky Finish With Elegant Smoothness And Commanding Presence.
          </p>
        </div>

        {/* Right: bottle image */}
        <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden ml-auto lg:max-w-[550px]">
          <img
            src="/bottle in field.png"
            alt="Cousins Vodka bottle in field"
            className="absolute inset-0 h-full w-full object-cover aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
