import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Hackathon } from "@/components/site/hackathon";
import { Community } from "@/components/site/community";
import { Sponsors } from "@/components/site/sponsors";
import { FAQ } from "@/components/site/faq";
import { CTA } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <Hero />
      <Stats />
      <Hackathon />
      <Community />
      <Sponsors />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
