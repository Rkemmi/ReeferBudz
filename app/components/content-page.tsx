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
  banner,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: ContentSection[];
  banner?: {
    eyebrow: string;
    title: string;
    description: string;
    scene: "story" | "guidelines" | "privacy" | "terms" | "accessibility";
    sceneLabel: string;
    mascotAlt: string;
  };
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
        eyebrow={banner?.eyebrow ?? "Find your people"}
        title={banner?.title ?? "A better circle starts with a thoughtful first hello."}
        description={banner?.description ?? "Join the Founding Budz and help us build a safer, friendship-first community."}
        scene={banner?.scene}
        sceneLabel={banner?.sceneLabel}
        mascotAlt={banner?.mascotAlt}
      />
    </PageShell>
  );
}
