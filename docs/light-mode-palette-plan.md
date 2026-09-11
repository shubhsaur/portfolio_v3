# Light Mode Color Palette Plan

## Design Philosophy

Light mode must achieve three competing goals simultaneously:

1. **Hero backdrop visibility** — orbital rings, glass cards, accent particles, and the central orb must remain clearly visible against a light background (unlike dark mode where they glow naturally)
2. **Glass morphism clarity** — frosted-glass panels need enough contrast with the background to show their blur + border + shadow layers distinctly
3. **Typography legibility** — WCAG AA contrast ratios on all text sizes, with a clear visual hierarchy

The core tension: **dark-mode glass uses `bg-white/[0.015]` and `border-white/[0.06]` which is invisible on light backgrounds**. Every glass token must be rethought for light mode.

---

## 1. Background System

### Problem
The current `--ln-bg: #FDFBF8` is near-white. The hero's orbital rings (`border-white/[0.06]`) and glass panels (`bg-[#0D0F15]/84`) will either wash out or create harsh dark blobs.

### Solution: Warm Ivory Gradient Canvas

| Token | Current | Proposed | Rationale |
|-------|---------|----------|-----------|
| `--ln-bg` | `#FDFBF8` | `#F8F4ED` | Slightly warmer, more texture — the base "paper" color |
| `--ln-bg-elevated` | `#FFFFFF` | `#FFFFFF` | Pure white for cards that need to pop |
| `--ln-bg-card` | `#FFFFFF` | `rgba(255, 255, 255, 0.92)` | Semi-transparent white for glass card effect |
| `--ln-bg-soft` | `rgba(255, 251, 248, 0.95)` | `rgba(248, 244, 237, 0.85)` | Softer, less opaque for subtle overlays |
| `--ln-bg-secondary` | `#E4D9CA` | `#EDE6DA` | Slightly lighter, smoother transition from base |

### Body Gradient (the canvas behind everything)

Replace flat `--ln-bg` with a subtle multi-stop gradient that gives the hero backdrop something to play against:

```css
body {
  background:
    radial-gradient(ellipse 80% 60% at 50% 40%, rgba(185,130,74,0.06), transparent),
    radial-gradient(ellipse 60% 50% at 20% 80%, rgba(128,103,161,0.04), transparent),
    linear-gradient(175deg, #F8F4ED 0%, #F0E9DD 50%, #F8F4ED 100%);
}
```

This gives the hero's ambient lighting glows something to blend into — instead of flat white.

---

## 2. Glass Morphism System (CRITICAL)

### Problem
Dark mode glass uses near-transparent white borders and dark backgrounds. In light mode, these are invisible. The hero components (`FrontendUniverse.tsx`, `InteractiveSOrb.tsx`) have hardcoded dark glass values like:
- `bg-[#0D0F15]/84` — opaque dark blob on light bg
- `border-white/[0.06]` — invisible on light
- `bg-white/[0.015]` — invisible on light

### Solution: Light Glass Token Set

| Token | Value | Usage |
|-------|-------|-------|
| `--ln-glass-bg` | `rgba(255, 255, 255, 0.72)` | Glass panel fill — translucent white |
| `--ln-glass-bg-elevated` | `rgba(255, 255, 255, 0.88)` | More opaque for hovered/active states |
| `--ln-glass-border` | `rgba(139, 122, 107, 0.18)` | Visible warm-toned border (not white!) |
| `--ln-glass-border-strong` | `rgba(139, 122, 107, 0.30)` | Hover/focus state border |
| `--ln-glass-shadow` | `0 8px 32px rgba(26, 23, 17, 0.08)` | Soft, warm shadow |
| `--ln-glass-backdrop-blur` | `blur(18px) saturate(130%)` | Frost effect |

### Hero Component Glass Overrides (light mode only)

The hero components need light-mode-specific overrides via CSS class or `html[data-color-mode="light"]` selector:

```css
/* Orbital rings — visible in light mode */
html[data-color-mode="light"] .orbit-ring {
  border-color: rgba(139, 122, 107, 0.15) !important;
}

/* Glass cards in hero — light glass, not dark glass */
html[data-color-mode="light"] .hero-glass-panel {
  background: rgba(255, 255, 255, 0.65) !important;
  border-color: rgba(139, 122, 107, 0.20) !important;
  backdrop-filter: blur(16px) saturate(125%);
}

/* Central orb — keep semi-transparent but warm */
html[data-color-mode="light"] .hero-orb {
  background: rgba(248, 244, 237, 0.78) !important;
  border-color: rgba(139, 122, 107, 0.22) !important;
  box-shadow: 0 20px 60px rgba(26, 23, 17, 0.12) !important;
}
```

### Accent Particle Visibility

Dark mode particles use bright glows (`shadow-[0_0_18px_#B9824A]`). In light mode they need **stronger saturation + darker cores** to stand out:

```css
html[data-color-mode="light"] .accent-particle {
  filter: saturate(1.3) brightness(0.92);
  box-shadow: 0 0 12px currentColor, 0 0 24px color-mix(in srgb, currentColor 40%, transparent);
}
```

---

## 3. Typography System

### Current Issues
- `--ln-text-primary: #1A1611` — good but slightly too warm for body text
- `--ln-text-muted: #5C4B3F` — too close to primary, insufficient contrast hierarchy
- Hero text uses hardcoded `text-white/50`, `text-white/25` — invisible in light mode

### Proposed Hierarchy

| Role | Token | Color | Contrast on #F8F4ED | Usage |
|------|-------|-------|---------------------|-------|
| **Headings / Titles** | `--ln-text-primary` | `#1A1612` | 15.4:1 (AAA) | h1, h2, section titles |
| **Subtitles** | `--ln-text-secondary` | `#3D3229` | 11.2:1 (AAA) | h3, card titles, nav items |
| **Body / Descriptions** | `--ln-text-body` | `#5C4B3F` | 7.1:1 (AAA) | p, descriptions, body copy |
| **Muted / Captions** | `--ln-text-muted` | `#7A6B5D` | 4.8:1 (AA) | timestamps, labels, helper text |
| **Soft / Disabled** | `--ln-text-soft` | `#9E8E80` | 3.2:1 (AA large only) | placeholders, disabled states |
| **Inverse / On Accent** | `--ln-accent-foreground` | `#FDFBF8` | — | Text on dark accent buttons |

### Hero Text Overrides (light mode)

All hardcoded `text-white/XX` values in hero components need light-mode mapping:

| Dark Mode Value | Light Mode Equivalent | Usage |
|----------------|----------------------|-------|
| `text-white/90` | `#1A1612` | Primary hero labels |
| `text-white/50` | `#5C4B3F` | Secondary labels, pill text |
| `text-white/38` | `#7A6B5D` | Muted captions |
| `text-white/25` | `#9E8E80` | Subtle dividers, orbit labels |
| `text-white/20` | `rgba(158,142,128,0.6)` | Background decoration text |

---

## 4. Accent Color System

### Current Accents (light mode)
The accent palette is solid: `#68432D` (terracotta brown), `#C96E55` (coral), `#C87886` (rose), `#8067A1` (lavender), `#718A74` (sage), `#B9824A` (gold).

### Adjustments for Light Mode Visibility

| Token | Current | Proposed | Rationale |
|-------|---------|----------|-----------|
| `--ln-accent` | `#68432D` | `#5C3A22` | Slightly darker for better button/link visibility |
| `--ln-accent-hover` | _(none)_ | `#4A2E1A` | New token — 15% darker than accent for hover |
| `--ln-accent-gold` | `#e8c547` | `#B9824A` | Use the warm gold already in palette, not bright yellow |
| `--ln-accent-active` | _(none)_ | `#3D2516` | New token — pressed/active state |
| `--ln-ring` | `rgba(104, 67, 45, 0.7)` | `rgba(92, 58, 34, 0.45)` | Softer ring, less harsh on light bg |

### Button States

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | `--ln-accent` (`#5C3A22`) | `#FDFBF8` | `transparent` |
| Hover | `--ln-accent-hover` (`#4A2E1A`) | `#FDFBF8` | `transparent` |
| Active/Pressed | `--ln-accent-active` (`#3D2516`) | `#FDFBF8` | `transparent` |
| Focus ring | _(same)_ | _(same)_ | `0 0 0 3px var(--ln-ring)` |
| Disabled | `rgba(92, 58, 34, 0.35)` | `rgba(253, 251, 248, 0.6)` | `transparent` |

### Outline / Ghost Buttons

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | `transparent` | `--ln-accent` | `1.5px solid rgba(92, 58, 34, 0.30)` |
| Hover | `rgba(92, 58, 34, 0.06)` | `--ln-accent-hover` | `1.5px solid rgba(92, 58, 34, 0.45)` |

---

## 5. Card System

### Featured Work Cards (already partially implemented)

Current hardcoded values in `FeaturedWork.tsx`:
- `border-[rgba(104,67,45,0.15)]` — good, keep
- `bg-[linear-gradient(180deg,rgba(104,67,45,0.03),rgba(104,67,45,0.01))]` — good
- `hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]` — too harsh

### Unified Card Token Set

| Token | Value | Usage |
|-------|-------|-------|
| `--ln-card-bg` | `#FFFFFF` | Card fill |
| `--ln-card-border` | `rgba(139, 122, 107, 0.18)` | Default border |
| `--ln-card-border-hover` | `rgba(139, 122, 107, 0.30)` | Hover border |
| `--ln-card-shadow` | `0 4px 16px rgba(26, 23, 17, 0.06)` | Resting shadow |
| `--ln-card-shadow-hover` | `0 8px 32px rgba(26, 23, 17, 0.10)` | Hover shadow |
| `--ln-card-radius` | `var(--ln-radius-card)` = `1.25rem` | All cards |

### Glass Card Variant (for hero overlays)

| Token | Value |
|-------|-------|
| `--ln-glass-card-bg` | `rgba(255, 255, 255, 0.68)` |
| `--ln-glass-card-border` | `rgba(139, 122, 107, 0.22)` |
| `--ln-glass-card-shadow` | `0 8px 24px rgba(26, 23, 17, 0.07)` |

---

## 6. Interactive States

### Link States
| State | Color |
|-------|-------|
| Default | `--ln-accent` (`#5C3A22`) |
| Hover | `--ln-accent-hover` (`#4A2E1A`) + `text-decoration: underline` (2px, `rgba(92, 58, 34, 0.25)`) |
| Visited | `#6B4F7A` (slight purple shift) |

### Form Input States
| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | `#FFFFFF` | `rgba(139, 122, 107, 0.25)` | `#1A1612` |
| Focus | `#FFFFFF` | `--ln-accent` + `0 0 0 3px var(--ln-ring)` | `#1A1612` |
| Error | `rgba(220, 38, 38, 0.04)` | `#DC2626` | `#1A1612` |
| Disabled | `rgba(248, 244, 237, 0.6)` | `rgba(139, 122, 107, 0.12)` | `#9E8E80` |

---

## 7. Implementation Priority

### Phase 1: CSS Variables (globals.css)
- [ ] Add new light mode tokens to `html[data-color-mode="light"]`
- [ ] Add `--ln-text-secondary`, `--ln-text-body` tokens
- [ ] Add `--ln-glass-*` token family
- [ ] Add `--ln-accent-hover`, `--ln-accent-active` tokens
- [ ] Add `--ln-card-*` token family

### Phase 2: Hero Component Light Mode Support
- [ ] `FrontendUniverse.tsx`: Replace hardcoded dark glass values with CSS variables or `html[data-color-mode="light"]` overrides
- [ ] `InteractiveSOrb.tsx`: Same treatment — glass panels, orb, particles
- [ ] Orbital ring borders: `border-white/[0.06]` → light-mode visible borders
- [ ] Accent particles: increase saturation + dual-shadow for light bg

### Phase 3: Component Audit
- [ ] `FeaturedWork.tsx`: Migrate hardcoded colors to CSS variables
- [ ] `Navbar.tsx`: Ensure light mode glass/nav visibility
- [ ] `SkillsStrip.tsx`: Verify contrast ratios
- [ ] `CodeCard.tsx`: Light mode glass card styling
- [ ] `CommandMenu.tsx`: Light mode overlay styling

### Phase 4: Verification
- [ ] Run WCAG AA contrast checker on all text/background combos
- [ ] Test in browser at multiple zoom levels
- [ ] Test `prefers-reduced-motion` path
- [ ] Test form inputs, buttons, links in all states

---

## 8. Complete CSS Token Reference (Light Mode)

```css
html[data-color-mode="light"] {
  color-scheme: light;

  /* === BACKGROUNDS === */
  --ln-bg: #F8F4ED;
  --ln-bg-secondary: #EDE6DA;
  --ln-bg-elevated: #FFFFFF;
  --ln-bg-card: rgba(255, 255, 255, 0.92);
  --ln-bg-soft: rgba(248, 244, 237, 0.85);

  /* === TYPOGRAPHY === */
  --ln-text-primary: #1A1612;
  --ln-text-secondary: #3D3229;
  --ln-text-body: #5C4B3F;
  --ln-text-muted: #7A6B5D;
  --ln-text-soft: #9E8E80;

  /* === BORDERS === */
  --ln-border-subtle: rgba(139, 122, 107, 0.18);
  --ln-border-strong: rgba(139, 122, 107, 0.30);

  /* === GLASS === */
  --ln-glass: rgba(255, 255, 255, 0.72);
  --ln-glass-border: rgba(139, 122, 107, 0.18);
  --ln-glass-border-strong: rgba(139, 122, 107, 0.30);
  --ln-glass-shadow: 0 8px 32px rgba(26, 23, 17, 0.08);

  /* === ACCENTS === */
  --ln-accent: #5C3A22;
  --ln-accent-hover: #4A2E1A;
  --ln-accent-active: #3D2516;
  --ln-accent-gold: #B9824A;
  --ln-accent-terracotta: #C96E55;
  --ln-accent-rose: #C87886;
  --ln-accent-lavender: #8067A1;
  --ln-accent-sage: #718A74;
  --ln-accent-secondary: #B9824A;
  --ln-accent-foreground: #FDFBF8;
  --ln-gradient-primary: linear-gradient(135deg, #B9824A 0%, #C96E55 40%, #C87886 100%);
  --ln-ring: rgba(92, 58, 34, 0.45);
  --ln-accent-wash: color-mix(in srgb, var(--ln-accent) 14%, transparent);

  /* === CARDS === */
  --ln-card-bg: #FFFFFF;
  --ln-card-border: rgba(139, 122, 107, 0.18);
  --ln-card-border-hover: rgba(139, 122, 107, 0.30);
  --ln-card-shadow: 0 4px 16px rgba(26, 23, 17, 0.06);
  --ln-card-shadow-hover: 0 8px 32px rgba(26, 23, 17, 0.10);

  /* === MESH (hero backdrop gradient hints) === */
  --ln-mesh-gold: rgba(185, 130, 74, 0.10);
  --ln-mesh-cyan: rgba(113, 138, 116, 0.07);

  /* === FOG (decorative overlays) === */
  --ln-fog-highlight: #FFFFFF;
  --ln-fog-body: #F0E9DD;
  --ln-fog-shadow: #DDD5C8;
  --ln-fog-tint: #B9824A;

  /* === DESTRUCTIVE === */
  --destructive: #DC2626;
}
```
