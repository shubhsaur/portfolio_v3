import Image from "next/image";
import type { AuthorProfile } from "@/lib/types/blog";

interface AuthorBioProps {
  author: AuthorProfile;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <section className="flex items-start gap-4 rounded-[var(--ln-radius-card)] border border-border bg-card/60 p-5 sm:p-6">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border bg-muted/30">
        <Image
          src={author.image}
          alt={author.name}
          fill
          unoptimized
          className="object-cover"
          sizes="56px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-foreground">
          {author.name}
        </h3>
        <p className="mt-1 text-sm text-[var(--ln-text-body)]">{author.bio}</p>
      </div>
    </section>
  );
}
