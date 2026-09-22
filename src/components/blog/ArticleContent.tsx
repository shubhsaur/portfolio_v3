"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

interface ArticleContentProps {
  content: string;
}

function CodeBlock({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) {
  const match = /language-(\w+)/.exec(className || "");
  const language = match?.[1];
  const isInline = !match;

  if (isInline) {
    return (
      <code
        className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-[var(--ln-accent)]"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="group/code relative my-6 overflow-hidden rounded-xl border border-white/10">
      {language && (
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
          <span className="font-mono text-xs uppercase tracking-wider text-white/50">
            {language}
          </span>
        </div>
      )}
      <div className="overflow-x-auto bg-[#0d1117] p-4">
        <code className={className} {...props}>
          {children}
        </code>
      </div>
    </div>
  );
}

const components: Components = {
  code: CodeBlock as Components["code"],
  blockquote({ children }) {
    return (
      <blockquote className="my-6 border-l-4 border-[var(--ln-accent)] bg-white/5 py-4 pl-6 pr-4 italic text-white/80 not-italic">
        {children}
      </blockquote>
    );
  },
  table({ children }) {
    return (
      <div className="my-6 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    );
  },
  thead({ children }) {
    return <thead className="border-b border-white/10 bg-white/5">{children}</thead>;
  },
  th({ children }) {
    return (
      <th className="px-4 py-3 text-left font-semibold text-[var(--ln-accent)]">
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="border-b border-white/5 px-4 py-3 text-white">
        {children}
      </td>
    );
  },
  tr({ children }) {
    return <tr className="even:bg-white/[0.02]">{children}</tr>;
  },
  a({ href, children }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--ln-accent)] underline decoration-[var(--ln-accent)]/30 underline-offset-4 transition-colors hover:decoration-[var(--ln-accent)]"
      >
        {children}
      </a>
    );
  },
  hr() {
    return <hr className="my-8 border-white/10" />;
  },
};

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="article-content prose prose-invert prose-lg max-w-none prose-headings:text-[var(--ln-accent)] prose-p:text-white prose-strong:text-[var(--ln-accent)] prose-img:rounded-[var(--ln-radius-card)]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
