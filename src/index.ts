"use strict";

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

window.addEventListener("popstate", router);

new App(document.getElementById("app"));

// data-link 속성을 가진 요소가 클릭될 때 기본 링크 동작을 방지한 후 pushState를 사용하여 URL을 변경하고, router 함수를 호출합니다.

document.body.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (e.target instanceof HTMLAnchorElement && target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState(null, "", e.target.href);
    router();
  }
});

router();
