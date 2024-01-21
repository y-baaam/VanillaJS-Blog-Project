import Home from "./views/home/home";
import About from "./views/about/about";
import Post from "./views/post/post";
import GuestBook from "./views/guest-book/guest-book";
import ErrorPage from "./views/error/error";

type ViewFunction = () => string | HTMLElement | Promise<string | HTMLElement>;

// routes 객체는 URL 경로와 이 경로에 대응하는 뷰 함수(Home, About, Post, GuestBook)를 매핑합니다.
const routes: Record<string, ViewFunction> = {
  "/": Home,
  "/about": About,
  "/post": Post,
  "/guestBook": GuestBook,
};

function router(): void {
  const path = window.location.pathname;
  const viewFunction = routes[path];

  // app은 SPA의 메인 콘텐츠를 동적으로 표시하는 데 사용됩니다.
  const appDiv = document.getElementById("app");

  if (appDiv instanceof HTMLElement && viewFunction) {
    const viewContent = viewFunction();

    // 문자열이면 innerHTML에 할당하고, HTMLElement이면 appendChild를 사용합니다
    if (typeof viewContent === "string") {
      appDiv.innerHTML = viewContent;
    } else if (viewContent instanceof HTMLElement) {
      appDiv.innerHTML = viewContent.outerHTML;
    } else {
      appDiv.innerHTML = `${ErrorPage()}`;
    }
  }
}

export default router;
