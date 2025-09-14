import Home from "@views/home";
import Posts from "@views/posts";
import Post from "@views/posts/post";
import GuestBook from "@views/guest-book";
import ErrorPage from "@views/error";

type ViewFunction = (
  ...args: string[]
) => HTMLElement | Promise<string | HTMLElement | void>;

const routes: Record<string, ViewFunction> = {
  "/": Home,
  "/posts": Posts,
  "/posts/:id": Post,
  "/guestBook": GuestBook,
};

const pathToRegex = (path: string): RegExp =>
  new RegExp(
    "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "([^/]+)") + "$"
  );

// 끝 슬래시 제거
const normalizePath = (pathname: string) =>
  pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

async function router(): Promise<void> {
  const appDiv = document.getElementById("app");
  if (!appDiv) return;

  // 주소 정규화 필요하면 replaceState로 교체(히스토리 안 늘림)
  const current = location.pathname;
  const normalized = normalizePath(current);
  if (normalized !== current) {
    history.replaceState(
      null,
      "",
      normalized + location.search + location.hash
    );
  }

  const path = normalized;
  for (const [routePath, viewFn] of Object.entries(routes)) {
    const match = path.match(pathToRegex(routePath));
    if (match) {
      try {
        const params = match.slice(1);
        const view = await viewFn(...params);
        if (typeof view === "string") {
          appDiv.innerHTML = view;
        } else if (view instanceof HTMLElement) {
          appDiv.replaceChildren(view);
        }
      } catch (err) {
        console.error(err);
        appDiv.replaceChildren(ErrorPage());
      }
      return;
    }
  }

  appDiv.replaceChildren(ErrorPage());
}

export default router;
