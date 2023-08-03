// Theme
const $html = document.querySelector("html") as HTMLElement;
const $themeIcon = document.querySelector("#theme-icon") as HTMLElement;

const theme = localStorage.getItem("theme") || "dark";
loadTheme();

function loadTheme() {
  const theme = localStorage.getItem("theme") || "dark";
  if (theme === "dark") {
    $html.classList.add("dark");
    setThemeIcon("sun");
    return;
  }

  $html.classList.remove("dark");
  setThemeIcon("moon");
}

function setThemeIcon(icon: "sun" | "moon") {
  $themeIcon.classList.remove("i-lucide-" + (icon === "sun" ? "moon" : "sun"));
  $themeIcon.classList.add(`i-lucide-${icon}`);
}

function toggleTheme() {
  $html.classList.toggle("dark");
  setThemeIcon($html.classList.contains("dark") ? "sun" : "moon");
  localStorage.setItem("theme", $html.classList.contains("dark") ? "dark" : "light");
}

document.querySelector("#theme-toggle")?.addEventListener("click", toggleTheme);
