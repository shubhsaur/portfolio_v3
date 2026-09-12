export type NavItem =
  | { href: string; label: string; disabled?: false }
  | { href?: never; label: "Blog"; disabled: true };

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { label: "Blog", disabled: true },
  { href: "/contact", label: "Contact" },
];
