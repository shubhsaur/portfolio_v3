"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Briefcase,
  FolderGit2,
  Mail,
  Copy,
  Download,
  Github,
  Linkedin,
  ExternalLink,
  CornerDownLeft,
  Hotel,
  Bot,
  Coins,
  Palette,
  Sun,
  Moon,
  GitMerge,
  GitPullRequest,
} from "lucide-react";
import { navItems } from "@/lib/nav";
import { toast } from "sonner";
import { useTheme } from "@/components/theme/ThemeContext";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Case Studies" | "Open Source" | "Accent Themes" | "Links";
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void;
  keywords?: string[];
  shortcut?: string;
}

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const router = useRouter();
  const { setAccent, colorMode, toggleColorMode, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string) => {
    toast(message);
  };

  const go = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  const copyEmail = useCallback(async () => {
    const email = "shubhamsaurabh@outlook.com";
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied: shubhamsaurabh@outlook.com");
    } catch {
      showToast("Failed to copy email");
    }
    onClose();
  }, [onClose]);

  const copyPhone = useCallback(async () => {
    const phone = "+918130755160";
    try {
      await navigator.clipboard.writeText(phone);
      showToast("Phone number copied: +91 8130755160");
    } catch {
      showToast("Failed to copy phone");
    }
    onClose();
  }, [onClose]);

  const downloadResume = useCallback(() => {
    onClose();
    const link = document.createElement("a");
    link.href = "/Shubham_Saurabh_Resume.pdf";
    link.download = "Shubham_Saurabh_Resume.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [onClose]);

  const openUrl = useCallback(
    (url: string) => {
      onClose();
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [onClose]
  );

  const items: CommandItem[] = [
    // Navigation
    ...navItems
      .filter((item) => !item.disabled)
      .map((item) => {
        const icons: Record<string, React.ComponentType<{ className?: string }>> = {
          Home: Home,
          Projects: FolderGit2,
          Experience: Briefcase,
          About: User,
          Contact: Mail,
        };
        return {
          id: `nav-${item.href}`,
          title: `Go to ${item.label}`,
          category: "Navigation" as const,
          description: item.label === "Home" ? "Hero introduction & highlights" :
                       item.label === "Projects" ? "Work and personal builds" :
                       item.label === "Experience" ? "RateGain & Infosys career" :
                       item.label === "About" ? "Bio and skills inventory" :
                       item.label === "Contact" ? "Send a message" : undefined,
          icon: icons[item.label] || Home,
          perform: () => go(item.href),
          keywords: [item.label.toLowerCase(), ...(item.label === "Home" ? ["hero", "intro"] : [])],
        };
      }),

    // Actions
    {
      id: "act-email",
      title: "Copy Email Address",
      category: "Actions",
      description: "shubhamsaurabh@outlook.com",
      icon: Copy,
      perform: copyEmail,
      keywords: ["copy", "email", "mail", "outlook"],
      shortcut: "⌘C",
    },
    {
      id: "act-phone",
      title: "Copy Phone Number",
      category: "Actions",
      description: "+91 8130755160",
      icon: Copy,
      perform: copyPhone,
      keywords: ["copy", "phone", "mobile", "call"],
    },
    {
      id: "act-resume",
      title: "Download Resume",
      category: "Actions",
      description: "Get the latest PDF resume",
      icon: Download,
      perform: downloadResume,
      keywords: ["resume", "cv", "pdf", "download"],
    },
    {
      id: "act-toggle-color",
      title: colorMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      category: "Actions",
      description: colorMode === "dark" ? "Switch to Ivory/Slate theme" : "Switch to Liquid Noir theme",
      icon: colorMode === "dark" ? Sun : Moon,
      perform: () => {
        toggleColorMode();
        showToast(`Switched to ${colorMode === "dark" ? "light" : "dark"} mode`);
        onClose();
      },
      keywords: ["light", "dark", "mode", "theme", "toggle"],
    },

    // Case Studies
    {
      id: "case-uno",
      title: "Uno Booking Engine",
      category: "Case Studies",
      description: "Multi-tenant hotel booking with 10+ payment gateways",
      icon: Hotel,
      perform: () => go("/projects/uno-booking"),
      keywords: ["uno", "booking", "hotel", "payments", "rategain"],
    },
    {
      id: "case-content-ai",
      title: "Content AI",
      category: "Case Studies",
      description: "B2B content platform, 60% UI performance boost",
      icon: Bot,
      perform: () => go("/projects/content-ai"),
      keywords: ["content ai", "b2b", "forms", "rategain", "performance"],
    },
    {
      id: "case-cryptopedia",
      title: "Cryptopedia",
      category: "Case Studies",
      description: "Real-time crypto tracker with ChartJS trends",
      icon: Coins,
      perform: () => go("/projects/cryptopedia"),
      keywords: ["cryptopedia", "crypto", "charts", "finance", "bitcoin"],
    },
    {
      id: "case-codelens",
      title: "Codelens",
      category: "Case Studies",
      description: "AI-powered GitHub repo explorer with Gemini & Supabase",
      icon: Palette,
      perform: () => go("/projects/codelens"),
      keywords: ["codelens", "gemini", "ai", "github", "search"],
    },

    // Open Source
    {
      id: "os-pr-6217",
      title: "PrimeReact PR #6217 (Merged)",
      category: "Open Source",
      description: "Calendar timeOnly & stepMinute state fix (v10.6.0)",
      icon: GitPullRequest,
      perform: () => openUrl("https://github.com/primefaces/primereact/pull/6217"),
      keywords: ["primereact", "pr", "6217", "calendar", "open source"],
    },
    {
      id: "os-pr-6214",
      title: "PrimeReact PR #6214 (Merged)",
      category: "Open Source",
      description: "Calendar AM/PM range validation deadlock fix (v10.6.0)",
      icon: GitPullRequest,
      perform: () => openUrl("https://github.com/primefaces/primereact/pull/6214"),
      keywords: ["primereact", "pr", "6214", "calendar", "validation", "open source"],
    },

    // Accent Themes
    {
      id: "theme-gold",
      title: "Switch Theme: Liquid Gold",
      category: "Accent Themes",
      description: "Warm gold, coral & cyan palette",
      icon: Palette,
      perform: () => {
        setTheme("gold");
        showToast("Switched to Liquid Gold theme");
        onClose();
      },
      keywords: ["theme", "gold", "yellow", "color", "palette"],
    },
    {
      id: "theme-emerald",
      title: "Switch Theme: Neon Emerald",
      category: "Accent Themes",
      description: "Fresh emerald, cyan & blue palette",
      icon: Palette,
      perform: () => {
        setTheme("emerald");
        showToast("Switched to Neon Emerald theme");
        onClose();
      },
      keywords: ["theme", "emerald", "green", "color", "palette"],
    },
    {
      id: "theme-violet",
      title: "Switch Theme: Electric Violet",
      category: "Accent Themes",
      description: "Deep purple, pink & indigo palette",
      icon: Palette,
      perform: () => {
        setTheme("violet");
        showToast("Switched to Electric Violet theme");
        onClose();
      },
      keywords: ["theme", "violet", "purple", "pink", "color", "palette"],
    },
    {
      id: "theme-cyan",
      title: "Switch Theme: Cyber Cyan",
      category: "Accent Themes",
      description: "High-contrast cyan, sky blue & lavender palette",
      icon: Palette,
      perform: () => {
        setTheme("cyan");
        showToast("Switched to Cyber Cyan theme");
        onClose();
      },
      keywords: ["theme", "cyan", "blue", "cyber", "color", "palette"],
    },

    // Links
    {
      id: "link-github",
      title: "GitHub Profile",
      category: "Links",
      description: "@shubhsaur (70+ repositories)",
      icon: Github,
      perform: () => openUrl("https://github.com/shubhsaur"),
      keywords: ["github", "code", "repos", "open source"],
    },
    {
      id: "link-linkedin",
      title: "LinkedIn Profile",
      category: "Links",
      description: "linkedin.com/in/shubhsaur",
      icon: Linkedin,
      perform: () => openUrl("https://www.linkedin.com/in/shubhsaur"),
      keywords: ["linkedin", "social", "connect", "network"],
    },
    {
      id: "link-x",
      title: "X (Twitter) Profile",
      category: "Links",
      description: "x.com/shubhsaur",
      icon: ExternalLink,
      perform: () => openUrl("https://x.com/shubhsaur"),
      keywords: ["x", "twitter", "social"],
    },
    {
      id: "link-uno-live",
      title: "Uno Booking Engine (Live)",
      category: "Links",
      description: "uno.rategain.com/hotel-booking-engine",
      icon: ExternalLink,
      perform: () => openUrl("https://uno.rategain.com/hotel-booking-engine/"),
      keywords: ["uno", "booking", "hotel", "live", "rategain"],
    },
    {
      id: "link-contentai-live",
      title: "Content AI (Live)",
      category: "Links",
      description: "rategain.com/hotel-content-management-system",
      icon: ExternalLink,
      perform: () => openUrl("https://rategain.com/hotel-content-management-system/"),
      keywords: ["content ai", "b2b", "live", "rategain"],
    },
    {
      id: "link-cryptopedia-live",
      title: "Cryptopedia (Live)",
      category: "Links",
      description: "cryptopedia-app.vercel.app",
      icon: ExternalLink,
      perform: () => openUrl("https://cryptopedia-app.vercel.app"),
      keywords: ["cryptopedia", "crypto", "live"],
    },
    {
      id: "link-codelens-live",
      title: "Codelens (Live)",
      category: "Links",
      description: "shubhsaur-codelens.vercel.app",
      icon: ExternalLink,
      perform: () => openUrl("https://shubhsaur-codelens.vercel.app"),
      keywords: ["codelens", "ai", "live"],
    },
  ];

  const filteredItems = items.filter((item) => {
    if (!query.trim()) return true;
    const cleanQuery = query.toLowerCase().trim();
    const titleMatch = item.title.toLowerCase().includes(cleanQuery);
    const descMatch = item.description?.toLowerCase().includes(cleanQuery);
    const keywordMatch = item.keywords?.some((k) => k.toLowerCase().includes(cleanQuery));
    const categoryMatch = item.category.toLowerCase().includes(cleanQuery);
    return titleMatch || descMatch || keywordMatch || categoryMatch;
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].perform();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const categories = Array.from(new Set(filteredItems.map((i) => i.category)));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-16 sm:pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-popover text-popover-foreground shadow-[var(--ln-shadow-surface)] backdrop-blur-2xl"
          >
            <div className="relative flex items-center border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, project, or page name..."
                className="w-full bg-transparent px-3 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="rounded-md px-1.5 py-0.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
              <span className="ln-mono ml-2 shrink-0 rounded-md border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                ESC
              </span>
            </div>

            <div
              ref={listRef}
              className="max-h-[380px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-muted"
            >
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                categories.map((category) => {
                  const categoryItems = filteredItems.filter((i) => i.category === category);
                  return (
                    <div key={category} className="mb-2 last:mb-0">
                      <div className="ln-mono px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                        {category}
                      </div>
                      <div className="space-y-1">
                        {categoryItems.map((item) => {
                          const globalIndex = filteredItems.findIndex((i) => i.id === item.id);
                          const isSelected = globalIndex === selectedIndex;
                          const Icon = item.icon;

                          return (
                            <button
                              key={item.id}
                              data-index={globalIndex}
                              onClick={item.perform}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={[
                                "group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all",
                                isSelected
                                  ? "bg-accent text-accent-foreground shadow-inner"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                              ].join(" ")}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={[
                                    "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
                                    isSelected
                                      ? "border-[var(--ln-accent)]/40 bg-[var(--ln-accent)]/10 text-[var(--ln-accent)]"
                                      : "border-border bg-muted text-muted-foreground group-hover:text-foreground",
                                  ].join(" ")}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium">{item.title}</span>
                                  {item.description && (
                                    <span className="text-xs text-muted-foreground">
                                      {item.description}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {item.shortcut && (
                                  <span className="ln-mono rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                    {item.shortcut}
                                  </span>
                                )}
                                {isSelected && (
                                  <span className="flex items-center gap-1 text-[11px] text-[var(--ln-accent)]">
                                    <span className="hidden sm:inline">Select</span>
                                    <CornerDownLeft className="h-3 w-3" />
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border bg-muted/50 px-4 py-2.5 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="ln-mono rounded border border-border bg-background px-1 py-0.5 text-[9px]">
                    ↑
                  </span>
                  <span className="ln-mono rounded border border-border bg-background px-1 py-0.5 text-[9px]">
                    ↓
                  </span>{" "}
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="ln-mono rounded border border-border bg-background px-1 py-0.5 text-[9px]">
                    ↵
                  </span>{" "}
                  to select
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>{colorMode === "dark" ? "Liquid Noir UI" : "Ivory & Slate UI"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
