import { SectionHeading } from "@/components/site/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who can apply?",
    a: "Anyone who builds: engineers, designers, PMs, founders, and students. Come solo or with a team of up to four. You don't need a polished idea in advance; plenty of teams form Friday night.",
  },
  {
    q: "How much does it cost?",
    a: "Hackathon tickets are free for accepted builders. The community has a free tier you can join today; an optional supporter membership unlocks office hours, credits, and member events.",
  },
  {
    q: "I'm not in the Bay Area. Can I still take part?",
    a: "Absolutely. The flagship hackathon runs in San Francisco, but you can build from a satellite node in 12 cities, and the year-round community is fully remote with builders in 38 cities.",
  },
  {
    q: "Do I need a team or an idea before I arrive?",
    a: "Neither. Show up solo and we'll help you find a team during Friday's team formation. Bring an idea if you have one, or pick up a track prompt at kickoff.",
  },
  {
    q: "What can I build?",
    a: "Anything that fits one of the tracks (AI agents, developer tools, consumer, fintech, hardware, or wildcard) and can demo live in two minutes. Working beats polished.",
  },
  {
    q: "Who owns what I build?",
    a: "You do. You keep full ownership of everything you create at a Productat event. Sponsors get visibility and the chance to support you, never your IP.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Answers before you ask"
            description="Still curious about something? Reach the team at hello@productat.com and we'll get back fast."
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
