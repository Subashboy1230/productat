import { Github, Twitter, Linkedin, MapPin } from "lucide-react";

import { Logo } from "@/components/site/logo";

const columns = [
  {
    title: "Event",
    links: [
      ["Hackathon", "#hackathon"],
      ["Schedule", "#hackathon"],
      ["Prizes", "#hackathon"],
      ["Apply", "#apply"],
    ],
  },
  {
    title: "Community",
    links: [
      ["Demo nights", "#community"],
      ["Office hours", "#community"],
      ["Member perks", "#community"],
      ["Join free", "#community"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Sponsors", "#sponsors"],
      ["FAQ", "#faq"],
      ["Code of conduct", "#"],
      ["Contact", "#"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Hackathons and a product community for builders across the US.
              Build. Ship. Belong.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              San Francisco, Bay Area
            </div>
            <div className="mt-5 flex items-center gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Productat. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <span className="font-mono text-xs">productat.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
