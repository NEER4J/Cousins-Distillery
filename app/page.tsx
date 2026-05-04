import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { OriginSection } from "./components/OriginSection";
import { RoyalCraftSection } from "./components/RoyalCraftSection";
import { CraftSliderSection } from "./components/CraftSliderSection";
import { CuratedSpiritsSection } from "./components/CuratedSpiritsSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ExperienceSection } from "./components/ExperienceSection";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "Cousins Distillery | Premium Craft Spirits & Small-Batch Vodka",
  description: "Cousins Distillery: Experience the art of craft spirits. From our 13-stage distillation process to our heritage-inspired blends, discover vodka, tequila, blue agave spirit, and rye whiskey.",
  alternates: {
    canonical: "/",
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <OriginSection />
      <RoyalCraftSection />
      <CraftSliderSection />
      <CuratedSpiritsSection />
      <PhilosophySection />
      <ExperienceSection />
      <Footer />
    </div>
  );
}
