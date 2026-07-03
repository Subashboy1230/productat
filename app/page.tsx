import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Learn } from "@/components/site/learn";
import { Community } from "@/components/site/community";
import { Hackathon } from "@/components/site/hackathon";
import { CTA } from "@/components/site/cta";
import { FAQ } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <Hero />
      <Learn />
      <Community />
      <Hackathon />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
