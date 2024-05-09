import Home from "@views/home";
import Posts from "@views/posts";
import Post from "@views/posts/post";
import GuestBook from "@views/guest-book";
import ErrorPage from "@views/error";

type ViewFunction = () => HTMLElement | Promise<string | HTMLElement | void>;

const routes: Record<string, ViewFunction> = {
  "/": Home,
  "/posts": Posts,
  "/posts/:id": Post,
  "/guestBook": GuestBook,
};

// function makeRoutes(
//   routesOption: Record<string, ViewFunction>
// ): Record<string, ViewFunction> {
//   let temp: ReturnType<typeof makeRoutes> = {};
//   for (let k in routesOption) {
//     temp[k] = routesOption[k];
//     if (k !== "/") temp[`${k}/`] = routesOption[k];
//   }
//   return temp;
// }

const pathToRegex = (path: string): RegExp => {
  return new RegExp(
    "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "([^/]+)") + "$"
  );
};

async function router(): Promise<void> {
  const path = window.location.pathname;
  let matched = false;

  // app은 SPA의 메인 콘텐츠를 동적으로 표시하는 데 사용됩니다.
  const appDiv = document.getElementById("app");

  if (!appDiv) return;

  for (const [routePath, viewFunction] of Object.entries(routes)) {
    const regex = pathToRegex(routePath);
    const match = path.match(regex);
    if (match) {
      matched = true;

      // URL에서 파라미터 추출
      const params: string[] = match.slice(1);
      let viewContent;

      try {
        viewContent = await viewFunction(...(params as []));
      } catch (error) {
        console.error("error", error);
        viewContent = ErrorPage();
      }

      // 뷰 콘텐츠 렌더링
      if (typeof viewContent === "string") {
        appDiv.innerHTML = viewContent;
      } else if (viewContent instanceof HTMLElement) {
        appDiv.innerHTML = "";
        appDiv.appendChild(viewContent);
      }
      break;
    }
  }

  if (!matched) {
    const errorPage = ErrorPage();
    appDiv.innerHTML = "";
    appDiv.appendChild(errorPage);
  }
}

export default router;
