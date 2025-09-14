import App from "./app";
import router from "./router";
import "@/styles/reset.module.css";
import "@/styles/styles.css";

import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", html);

new App(document.getElementById("app")!);

// 끝 슬래시 제거
const normalizePath = (pathname: string) => {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
};

// 최초 진입 시 정규화 (히스토리 오염 방지: replaceState)
(() => {
  const p = normalizePath(location.pathname);
  if (p !== location.pathname)
    history.replaceState(null, "", p + location.search + location.hash);
})();

window.addEventListener("popstate", () => {
  router();
});

document.addEventListener("click", (e: MouseEvent) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
    "a[data-link]"
  );
  if (!a) return;

  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank")
    return;

  e.preventDefault();

  const url = new URL(a.getAttribute("href")!, location.origin);
  const nextPath = normalizePath(url.pathname);

  if (nextPath !== location.pathname || url.search || url.hash) {
    history.pushState(null, "", nextPath + url.search + url.hash);
    router();
  }
});

router();
