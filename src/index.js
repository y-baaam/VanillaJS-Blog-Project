import App from "./app.js";
import router from "./router.js";

// 브라우저의 뒤로 가기/앞으로 가기를 감지합니다.
window.addEventListener("popstate", router);

new App(document.querySelector("#app"));

// 이 코드는 페이지 내의 모든 클릭 이벤트를 감시하고, data-link 속성을 가진 요소가 클릭될 때 기본 링크 동작을 방지한 후 pushState를 사용하여 URL을 변경하고, router 함수를 호출합니다.
// 이로써 페이지 전환 시 페이지 로딩 없이 URL을 변경하고 콘텐츠를 동적으로 업데이트할 수 있습니다.
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });

  router(); // 페이지가 처음 로드될 때 초기 라우트를 실행
});
