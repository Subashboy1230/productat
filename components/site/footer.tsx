import { Github, Twitter, Linkedin, MapPin } from "lucide-react";

import { Logo } from "@/components/site/logo";

const columns = [
  {
    title: "Learn",
    links: [
      ["UX / UI", "#learn"],
      ["Product", "#learn"],
      ["Tech & systems", "#learn"],
      ["Go-to-market", "#learn"],
    ],
  },
  {
    title: "Community",
    links: [
      ["Who it's for", "#community"],
      ["Build nights", "#community"],
      ["Mentors", "#community"],
      ["Join the waitlist", "#waitlist"],
    ],
  },
  {
    title: "Event",
    links: [
      ["Inaugural hackathon", "#hackathon"],
      ["FAQ", "#faq"],
      ["Sign in", "/login"],
      ["Contact", "mailto:hello@productat.com"],
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
              A community of builders, by builders, helping non-technical people
              ship 0-to-1 products. Build. Ship. Belong.
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
