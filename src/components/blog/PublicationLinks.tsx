import { ExternalLink } from "lucide-react";
import type { ArticlePublications } from "@/lib/types/blog";

interface PublicationLinksProps {
  publications: ArticlePublications;
}

export function PublicationLinks({ publications }: PublicationLinksProps) {
  const items = Object.entries(publications).filter(([, pub]) => pub?.url);

  if (items.length === 0) return null;

  return (
    <section className="rounded-[var(--ln-radius-card)] border border-border bg-card/60 p-5 sm:p-6">
      <h3 className="text-base font-semibold text-foreground">
        Also published on
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Read this article on other platforms.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map(([key, pub]) => (
          <li key={key}>
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-[var(--ln-accent)]/50 hover:text-[var(--ln-accent)]"
            >
              <span className="capitalize">{pub.name || key}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
