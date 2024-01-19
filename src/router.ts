import Home from "./views/home/home";
import About from "./views/about/about";
import Post from "./views/post/post";
import GuestBook from "./views/guest-book/guest-book";
// import ErrorImg from "../public/images/404.png";
import ErrorPage from "./views/error/error";

type ViewFunction = () => string;

// routes 객체는 URL 경로와 이 경로에 대응하는 뷰 함수(Home, About, Post, GuestBook)를 매핑합니다.
const routes: Record<string, ViewFunction> = {
  "/": Home,
  "/about": About,
  "/post": Post,
  "/guestBook": GuestBook,
};

function router(): void {
  // 현재 브라우저의 경로(window.location.pathname)를 확인합니다.
  const path = window.location.pathname;

  // 이 경로를 routes 객체에서 찾아 해당하는 뷰 함수를 viewFunction에 할당합니다.
  const viewFunction = routes[path];

  // appDiv는 페이지에서 id가 "app"인 HTML 요소를 참조합니다. 이 요소는 SPA의 메인 콘텐츠를 동적으로 표시하는 데 사용됩니다.
  const appDiv = document.getElementById("app");

  // appDiv가 null이 아님을 보장하기 위해 타입 가드(instanceof HTMLElement)를 사용합니다.
  if (appDiv instanceof HTMLElement)
    if (viewFunction) {
      // if (viewFunction) 구문은 해당 경로에 매핑된 뷰 함수가 있는지 검사합니다.
      // 존재하면 이 함수를 호출하여 반환된 HTML 콘텐츠를 appDiv의 innerHTML로 설정합니다.
      // 이를 통해 페이지의 메인 콘텐츠가 동적으로 업데이트됩니다.
      appDiv.innerHTML = viewFunction();
    } else {
      appDiv.innerHTML = `${ErrorPage()}`;
    }
}

export default router;
