"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Briefcase,
  Sparkles,
  FolderGit2,
  BookOpen,
  Mail,
  Copy,
  Download,
  ArrowUp,
  Github,
  Linkedin,
  ExternalLink,
  CornerDownLeft,
  Hotel,
  Bot,
  Coins,
  Palette,
} from "lucide-react";
import { sections, type SectionId } from "@/lib/sections";
import { Toast } from "@/components/ui/Toast";
import { useTheme } from "@/components/theme/ThemeContext";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Featured Projects" | "Accent Themes" | "Links & Socials";
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
  const { setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const navigateToSection = useCallback(
    (id: SectionId) => {
      onClose();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [onClose]
  );

  const copyEmail = useCallback(async () => {
    const email = "shubhamsaurabh@outlook.com";
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied: shubhamsaurabh@outlook.com ✨");
    } catch {
      showToast("Failed to copy email");
    }
    onClose();
  }, [onClose]);

  const copyPhone = useCallback(async () => {
    const phone = "+918130755160";
    try {
      await navigator.clipboard.writeText(phone);
      showToast("Phone number copied: +91 8130755160 ✨");
    } catch {
      showToast("Failed to copy phone");
    }
    onClose();
  }, [onClose]);

  const downloadResume = useCallback(() => {
    onClose();
    showToast("Opening / Downloading resume... 📄");
    const link = document.createElement("a");
    link.href = "/Shubham_Saurabh_Resume.pdf";
    link.download = "Shubham_Saurabh_Resume.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [onClose]);

  const scrollToTop = useCallback(() => {
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    {
      id: "nav-hero",
      title: "Go to Home",
      category: "Navigation",
      description: "Hero introduction & highlights",
      icon: Home,
      perform: () => navigateToSection("hero"),
      keywords: ["home", "start", "hero", "intro"],
    },
    {
      id: "nav-about",
      title: "Go to About Me",
      category: "Navigation",
      description: "Bio, DTU education (7.82 GPA), and career summary",
      icon: User,
      perform: () => navigateToSection("about"),
      keywords: ["about", "bio", "education", "dtu"],
    },
    {
      id: "nav-experience",
      title: "Go to Work Experience",
      category: "Navigation",
      description: "RateGain (SDE-I), Infosys, and awards",
      icon: Briefcase,
      perform: () => navigateToSection("experience"),
      keywords: ["experience", "jobs", "rategain", "infosys", "career", "awards", "timeline"],
    },
    {
      id: "nav-skills",
      title: "Go to Skills & Tech Stack",
      category: "Navigation",
      description: "React, Next.js, TypeScript, Redux, AWS, and ecosystem",
      icon: Sparkles,
      perform: () => navigateToSection("skills"),
      keywords: ["skills", "tech", "react", "typescript", "nextjs", "aws", "redux", "tailwind"],
    },
    {
      id: "nav-projects",
      title: "Go to Featured Projects",
      category: "Navigation",
      description: "Uno Booking Engine, Content AI, Cryptopedia, Codelens",
      icon: FolderGit2,
      perform: () => navigateToSection("projects"),
      keywords: ["projects", "uno", "booking", "content ai", "cryptopedia", "codelens", "work"],
    },
    {
      id: "nav-content",
      title: "Go to Content & Insights",
      category: "Navigation",
      description: "Articles on frontend architecture and performance",
      icon: BookOpen,
      perform: () => navigateToSection("content"),
      keywords: ["content", "articles", "blogs", "insights"],
    },
    {
      id: "nav-contact",
      title: "Go to Contact",
      category: "Navigation",
      description: "Send a message or get in touch",
      icon: Mail,
      perform: () => navigateToSection("contact"),
      keywords: ["contact", "email", "message", "hire"],
    },

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
      id: "act-top",
      title: "Scroll to Top",
      category: "Actions",
      description: "Jump straight to the top of the page",
      icon: ArrowUp,
      perform: scrollToTop,
      keywords: ["top", "scroll", "up"],
    },

    // Featured Projects
    {
      id: "proj-uno",
      title: "Uno Booking Engine",
      category: "Featured Projects",
      description: "Enterprise hotel booking engine with 10+ payment gateways & 20+ locales",
      icon: Hotel,
      perform: () => navigateToSection("projects"),
      keywords: ["uno", "booking", "hotel", "nextjs", "payments", "multilingual"],
    },
    {
      id: "proj-contentai",
      title: "Content AI",
      category: "Featured Projects",
      description: "B2B Content Management Platform boosting UI performance by 60%",
      icon: Bot,
      perform: () => navigateToSection("projects"),
      keywords: ["content ai", "b2b", "forms", "react final form"],
    },
    {
      id: "proj-crypto",
      title: "Cryptopedia",
      category: "Featured Projects",
      description: "Cryptocurrency tracker with live prices & ChartJS trend analytics",
      icon: Coins,
      perform: () => navigateToSection("projects"),
      keywords: ["cryptopedia", "crypto", "charts", "chartjs", "finance"],
    },
    {
      id: "proj-codelens",
      title: "Codelens AI Explorer",
      category: "Featured Projects",
      description: "AI-powered GitHub repo explorer with Google Gemini & Supabase",
      icon: Sparkles,
      perform: () => openUrl("https://shubhsaur-codelens.vercel.app"),
      keywords: ["codelens", "gemini", "ai", "search", "github"],
    },

    // Accent Themes
    {
      id: "theme-gold",
      title: "Switch Theme: Liquid Gold 🟡",
      category: "Accent Themes",
      description: "Warm gold, coral & cyan Liquid Noir palette",
      icon: Palette,
      perform: () => {
        setTheme("gold");
        showToast("Switched to Liquid Gold theme 🟡");
        onClose();
      },
      keywords: ["theme", "gold", "yellow", "color", "palette"],
    },
    {
      id: "theme-emerald",
      title: "Switch Theme: Neon Emerald 🟢",
      category: "Accent Themes",
      description: "Fresh neon emerald, cyan & blue palette",
      icon: Palette,
      perform: () => {
        setTheme("emerald");
        showToast("Switched to Neon Emerald theme 🟢");
        onClose();
      },
      keywords: ["theme", "emerald", "green", "color", "palette"],
    },
    {
      id: "theme-violet",
      title: "Switch Theme: Electric Violet 🟣",
      category: "Accent Themes",
      description: "Deep electric purple, pink & indigo palette",
      icon: Palette,
      perform: () => {
        setTheme("violet");
        showToast("Switched to Electric Violet theme 🟣");
        onClose();
      },
      keywords: ["theme", "violet", "purple", "pink", "color", "palette"],
    },
    {
      id: "theme-cyan",
      title: "Switch Theme: Cyber Cyan 🔵",
      category: "Accent Themes",
      description: "High-contrast cyber cyan, sky blue & lavender palette",
      icon: Palette,
      perform: () => {
        setTheme("cyan");
        showToast("Switched to Cyber Cyan theme 🔵");
        onClose();
      },
      keywords: ["theme", "cyan", "blue", "cyber", "color", "palette"],
    },

    // Links & Socials
    {
      id: "link-github",
      title: "View GitHub Profile",
      category: "Links & Socials",
      description: "@shubhsaur (70+ repositories)",
      icon: Github,
      perform: () => openUrl("https://github.com/shubhsaur"),
      keywords: ["github", "code", "repos", "open source"],
    },
    {
      id: "link-linkedin",
      title: "Connect on LinkedIn",
      category: "Links & Socials",
      description: "linkedin.com/in/shubhsaur",
      icon: Linkedin,
      perform: () => openUrl("https://www.linkedin.com/in/shubhsaur"),
      keywords: ["linkedin", "social", "connect", "network"],
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

  // Keep selected index in bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle keyboard navigation
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

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Categories present in filtered list
  const categories = Array.from(new Set(filteredItems.map((i) => i.category)));

  return (
    <>
      <Toast message={toastMessage} />
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-16 sm:pt-24">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#090a10]/95 shadow-[0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl ring-1 ring-white/5"
            >
              {/* Search Bar */}
              <div className="relative flex items-center border-b border-white/8 px-4">
                <Search className="h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command, project, or section name..."
                  className="w-full bg-transparent px-3 py-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="rounded-md px-1.5 py-0.5 text-xs text-zinc-500 hover:text-zinc-300"
                  >
                    Clear
                  </button>
                )}
                <span className="ln-mono ml-2 shrink-0 rounded-md border border-white/8 bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400">
                  ESC
                </span>
              </div>

              {/* Items List */}
              <div
                ref={listRef}
                className="max-h-[380px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-zinc-800"
              >
                {filteredItems.length === 0 ? (
                  <div className="p-8 text-center text-sm text-zinc-500">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  categories.map((category) => {
                    const categoryItems = filteredItems.filter((i) => i.category === category);
                    return (
                      <div key={category} className="mb-2 last:mb-0">
                        <div className="ln-mono px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-zinc-500">
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
                                    ? "bg-white/[0.08] text-zinc-50 shadow-inner"
                                    : "text-zinc-300 hover:bg-white/[0.04]",
                                ].join(" ")}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={[
                                      "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
                                      isSelected
                                        ? "border-[rgba(232,197,71,0.4)] bg-[rgba(232,197,71,0.12)] text-[var(--ln-accent-gold)]"
                                        : "border-white/6 bg-white/[0.02] text-zinc-400 group-hover:text-zinc-200",
                                    ].join(" ")}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    {item.description && (
                                      <span className="text-xs text-zinc-400">
                                        {item.description}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {item.shortcut && (
                                    <span className="ln-mono rounded border border-white/8 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-500">
                                      {item.shortcut}
                                    </span>
                                  )}
                                  {isSelected && (
                                    <span className="flex items-center gap-1 text-[11px] text-[var(--ln-accent-gold)]">
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

              {/* Footer info */}
              <div className="flex items-center justify-between border-t border-white/8 bg-black/40 px-4 py-2.5 text-[11px] text-zinc-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="ln-mono rounded border border-white/8 bg-white/[0.04] px-1 py-0.5 text-[9px]">
                      ↑
                    </span>
                    <span className="ln-mono rounded border border-white/8 bg-white/[0.04] px-1 py-0.5 text-[9px]">
                      ↓
                    </span>{" "}
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="ln-mono rounded border border-white/8 bg-white/[0.04] px-1 py-0.5 text-[9px]">
                      ↵
                    </span>{" "}
                    to select
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Liquid Noir UI</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
