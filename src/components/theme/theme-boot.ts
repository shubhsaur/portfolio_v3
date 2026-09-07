/** Inlined in <head> to apply accent + color-mode before first paint. */
export const THEME_BOOT_SCRIPT = `(function(){
  var root = document.documentElement;
  var accents = { gold:1, emerald:1, violet:1, cyan:1 };
  try {
    var a = localStorage.getItem("ln_accent_theme");
    if (!accents[a]) a = "gold";
    var m = localStorage.getItem("ln_color_mode");
    if (m !== "light" && m !== "dark") {
      m = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    root.dataset.accent = a;
    root.dataset.colorMode = m;
    root.style.colorScheme = m;
    root.classList.toggle("dark", m === "dark");
    root.classList.toggle("ln-root", true);
  } catch (e) {
    root.dataset.accent = "gold";
    root.dataset.colorMode = "dark";
    root.style.colorScheme = "dark";
    root.classList.add("dark", "ln-root");
  }
})();`;
