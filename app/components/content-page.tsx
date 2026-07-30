import type { ReactNode } from "react";
import { ClosingBanner, PageHero, PageShell } from "./site-chrome";

export type ContentSection = {
  title: string;
  body: ReactNode;
};

export function ContentPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: ContentSection[];
}) {
  return (
    <PageShell>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <div className="article-layout">
        {sections.map((section) => (
          <section className="article-section" key={section.title}>
            <h2>{section.title}</h2>
            <div>{section.body}</div>
          </section>
        ))}
      </div>
      <ClosingBanner
        eyebrow="Find your people"
        title="A better circle starts with a thoughtful first hello."
        description="Join the Founding Budz and help us build a safer, friendship-first community."
      />
    </PageShell>
  );
}
