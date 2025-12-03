import Hero from "@/components/ark/Hero";
import WhatIsArk from "@/components/ark/WhatIsArk";
import HowItWorks from "@/components/ark/HowItWorks";
import TokenStats from "@/components/ark/TokenStats";
import MissionCards from "@/components/ark/MissionCards";
import TrustSection from "@/components/ark/TrustSection";
import Roadmap from "@/components/ark/Roadmap";
import FAQ from "@/components/ark/FAQ";
import JoinCTA from "@/components/ark/JoinCTA";
import PartnerStrip from "@/components/ark/Partners";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIsArk />
      <HowItWorks />
      <TokenStats />
      <MissionCards />
      <TrustSection />
      <Roadmap />
      <PartnerStrip />
      <FAQ />
      <JoinCTA />
    </main>
  );
}
