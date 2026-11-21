(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const navToggle = document.getElementById("navToggle");
  const navigation = document.getElementById("siteNavigation");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

  const getSavedTheme = () => {
    try {
      return localStorage.getItem("portfolio-theme");
    } catch {
      return null;
    }
  };

  const setTheme = (theme, save = false) => {
    const isDark = theme === "dark";
    root.dataset.theme = isDark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeMeta.setAttribute("content", isDark ? "#111722" : "#f7f8fa");

    if (save) {
      try {
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
      } catch {
        // Theme still works for this page view if storage is unavailable.
      }
    }
  };

  const savedTheme = getSavedTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  setTheme(savedTheme || systemTheme);

  themeToggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
  });

  const setNavigationOpen = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", open);
  };

  navToggle.addEventListener("click", () => {
    setNavigationOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setNavigationOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      setNavigationOpen(false);
      navToggle.focus();
    }
  });

  if ("IntersectionObserver" in window && !motionPreference.matches) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach((section) => section.classList.add("reveal"));
    document.documentElement.classList.add("js-ready");

    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

    sections.forEach((section) => observer.observe(section));
  }
})();
