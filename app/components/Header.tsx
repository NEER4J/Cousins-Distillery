import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative flex shrink-0 items-center">
          <img
            src="/logo.svg"
            alt="Cousins Distillery Ltd. – Crafting Quality Spirits"
            className="h-[72px] w-auto max-w-[200px] object-contain object-left sm:h-20 sm:max-w-[240px]"
            width={240}
            height={80}
          />
        </Link>

        {/* Navigation */}
        <nav
          className="hidden lg:flex flex-1 items-center justify-center gap-10"
          aria-label="Main"
        >
          <Link
            href="/"
            className="font-body text-sm font-medium uppercase tracking-[0.2em] text-zinc-800 hover:text-zinc-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="font-body text-sm font-medium uppercase tracking-[0.2em] text-zinc-800 hover:text-zinc-600 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#company"
            className="font-body text-sm font-medium uppercase tracking-[0.2em] text-zinc-800 hover:text-zinc-600 transition-colors"
          >
            Company
          </Link>
          <Link
            href="#contact"
            className="font-body text-sm font-medium uppercase tracking-[0.2em] text-zinc-800 hover:text-zinc-600 transition-colors"
          >
            Contact Us
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex shrink-0 items-center justify-end">
          <Link
            href="#visit"
            className="rounded-full bg-[#D1BB8A] px-8 py-3.5 font-body text-[13px] font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
          >
            Find Us
          </Link>
        </div>
      </div>
    </header>
  );
}
