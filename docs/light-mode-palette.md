# Light Mode Color Palette - Implementation Strategy

## Overview

This document outlines the enhanced light mode color palette strategy for the portfolio v3 project, focusing on improving visibility for hero backdrop, glass design, and cards while maintaining consistency with the existing "Ivory/Slate" theme.

## Current State

The project already has a light mode implementation with:
- **Backgrounds**: Ivory tones (#EEE7DC, #FFFDFC)
- **Text**: Cool slate tones (#2B1D16, #624D40)
- **Glass effects**: rgba(255, 253, 252, 0.82)
- **Borders**: rgba(222, 211, 201, 0.7) to rgba(205, 189, 168, 0.85)

However, several areas need enhancement for better visual hierarchy and accessibility.

## Enhanced Light Mode Color Palette

### Core Tokens (High Priority)
#### Background System
```css
--ln-bg: #FDFBF8; /* Warmer ivory with subtle texture */
--ln-bg-elevated: #FFFFFF; /* Pure white for maximum clarity */
--ln-bg-card: #FFFFFF; /* Clean white with soft shadow */
--ln-bg-soft: rgba(255, 251, 248, 0.95); /* Warmer, more opaque */
```

#### Typography System
```css
--ln-text-primary: #1A1611; /* Deeper, richer black */
--ln-text-muted: #5C4B3F; /* Richer muted tone */
--ln-text-soft: #8B7A6B; /* Warmer, more organic soft tone */
```

#### Border & Surface System
```css
--ln-border-subtle: rgba(139, 122, 107, 0.25); /* Softer, more visible borders */
--ln-border-strong: rgba(139, 122, 107, 0.45); /* Clearer borders */
--ln-shadow-surface: 0 8px 32px rgba(26, 23, 17, 0.12); /* Softer, distinct shadows */
```