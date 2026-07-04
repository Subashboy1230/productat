import { SectionHeading } from "@/components/site/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "No. Productat is built for non-technical people. You'll learn enough about how systems work to build with AI tools and to talk to engineers, plus the product, design, and go-to-market skills that matter just as much.",
  },
  {
    q: "Who is this actually for?",
    a: "Non-technical founders, designers, PMs, domain experts, and career-switchers, anyone with an idea and no clear path to build it. If you're curious and want to ship, you belong here.",
  },
  {
    q: "What will I learn?",
    a: "Four lenses applied to building a real 0-to-1 product: UX/UI, first-principles product thinking, how the tech actually works (frontend, backend, APIs, databases, auth, and the nuances), and a builder's go-to-market mindset.",
  },
  {
    q: "When and where is the hackathon?",
    a: "The inaugural hackathon is in late July 2026 in the San Francisco Bay Area. Join the waitlist and we'll send you the exact date, venue, and schedule as soon as they're locked.",
  },
  {
    q: "Is it open to everyone, or do I apply?",
    a: "You apply, and we review every request. We approve builders on a rolling basis, so applying early helps. Approved members get first dibs on a spot at the inaugural hackathon.",
  },
  {
    q: "Do I need an idea or a team?",
    a: "Neither is required. Bring an idea if you have one, and we'll help you find teammates. Show up with just curiosity and we'll help you find both.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Answers before you ask"
            description="Still curious about something? Email hello@productat.com and we'll get back fast."
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="leading-relaxed">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
