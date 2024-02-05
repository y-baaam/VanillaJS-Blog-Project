import App from "./app";
import router from "./router";
import "../styles/reset.css";
import "../styles/styles.css";

import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", html);

// 브라우저의 뒤로 가기/앞으로 가기를 감지합니다.
window.addEventListener("popstate", router);

new App(document.querySelector("#app"));

// 이 코드는 페이지 내의 모든 클릭 이벤트를 감시하고, data-link 속성을 가진 요소가 클릭될 때 기본 링크 동작을 방지한 후 pushState를 사용하여 URL을 변경하고, router 함수를 호출합니다.
// 이로써 페이지 전환 시 페이지 로딩 없이 URL을 변경하고 콘텐츠를 동적으로 업데이트할 수 있습니다.
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      e.target instanceof HTMLAnchorElement &&
      target.matches("[data-link]")
    ) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });

  router();
});
