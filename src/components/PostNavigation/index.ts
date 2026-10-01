import { Post } from "@/api/posts";

function NavCard(post: Post | undefined, label: string, align: "left" | "right") {
  if (!post) return `<div class="hidden sm:block"></div>`;

  const alignClass = align === "left" ? "text-left" : "text-right";
  return `
    <a href="${post.path}" data-link class="block p-4 rounded-lg border border-solid border-black-100 hover:bg-black-200 no-underline text-white-200 visited:text-white-200 ${alignClass}">
      <div class="text-caption1 text-white-400">${label}</div>
      <div class="mt-1 text-body-bold font-GmarketSansMedium">${post.title}</div>
    </a>`;
}

/**
 * @param posts 날짜 내림차순으로 정렬된 공개 글 목록
 */
export default function PostNavigation(posts: Post[], currentPath: string) {
  const index = posts.findIndex((post) => post.path === currentPath);
  if (index === -1) return "";

  const prev = posts[index + 1];
  const next = posts[index - 1];
  if (!prev && !next) return "";

  return `
  <nav class="mt-16 pt-6 border-t border-solid border-black-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
    ${NavCard(prev, "← 이전 글", "left")}
    ${NavCard(next, "다음 글 →", "right")}
  </nav>`;
}
