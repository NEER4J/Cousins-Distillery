import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { OriginSection } from "./components/OriginSection";
import { RoyalCraftSection } from "./components/RoyalCraftSection";
import { CraftSliderSection } from "./components/CraftSliderSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ExperienceSection } from "./components/ExperienceSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <OriginSection />
      <RoyalCraftSection />
      <CraftSliderSection />
      <PhilosophySection />
      <ExperienceSection />
      <Footer />
    </div>
  );
}
