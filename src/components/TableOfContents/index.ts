export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function TocList(items: TocItem[]) {
  return `
    <ul class="flex flex-col gap-1.5 text-caption1">
      ${items
        .map(
          (item) => `
        <li class="${item.level === 3 ? "pl-3" : ""}">
          <a href="#${item.id}" data-toc="${item.id}" class="block text-white-400 visited:text-white-400 hover:text-white-200">${escapeHtml(item.text)}</a>
        </li>`
        )
        .join("")}
    </ul>`;
}

export default function TableOfContents(items: TocItem[]) {
  if (items.length < 3) return { inline: "", side: "" };

  return {
    inline: `
    <details class="xl:hidden mb-8 p-4 rounded-lg border border-solid border-black-100">
      <summary class="cursor-pointer font-GmarketSansMedium">목차</summary>
      <div class="mt-3">${TocList(items)}</div>
    </details>`,
    // 360px은 Layout 본문 폭(w-medium, 720px)의 절반이라 본문 오른쪽 바깥에 붙는다
    side: `
    <aside class="hidden xl:block fixed top-32 w-56 max-h-[70vh] overflow-y-auto" style="left: calc(50% + 360px + 2rem)">
      <div class="mb-3 text-caption1 font-GmarketSansMedium text-white-200">목차</div>
      ${TocList(items)}
    </aside>`,
  };
}

const ACTIVE_CLASSES = ["!text-white-100", "font-GmarketSansMedium"];

export function setupTocHighlight(root: HTMLElement, items: TocItem[]) {
  if (items.length < 3) return;

  let activeId: string | null = null;

  const update = () => {
    // 라우터가 다른 페이지로 바꾸면 root가 DOM에서 빠지므로 그때 리스너를 정리한다
    if (!root.isConnected) {
      window.removeEventListener("scroll", update);
      return;
    }

    let currentId = items[0].id;
    for (const item of items) {
      const heading = root.querySelector(`#${item.id}`);
      if (heading && heading.getBoundingClientRect().top <= 120) {
        currentId = item.id;
      }
    }
    if (currentId === activeId) return;

    activeId = currentId;
    root.querySelectorAll<HTMLElement>("a[data-toc]").forEach((link) => {
      const isActive = link.dataset.toc === currentId;
      ACTIVE_CLASSES.forEach((c) => link.classList.toggle(c, isActive));
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}
