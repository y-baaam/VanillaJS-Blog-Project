import { Post } from "@/api/posts";
import { filterPostsByCategory } from "@/util/filterPostsByCategory";
import PostIndexItem from "@comp/PostIndexItem";

/**
 * @param {Post[]} posts 렌더링할 포스트의 배열
 * @param {string} selectedCategory 현재 선택된 카테고리
 *
 */

export default function createPostsContent(
  posts: Post[],
  selectedCategory: string | null
): string {
  const filteredPosts = filterPostsByCategory(posts, selectedCategory);
  const filteredPostItemsHtml = PostIndexItem(filteredPosts);

  //중복된 카테고리 목록 필터링
  const uniqueCategories = [
    "All",
    ...new Set(posts.map((post) => post.category)),
  ];
  const uniqueCategoriesMap = uniqueCategories.map((v) => {
    return `<div class="py-2 cursor-pointer whitespace-nowrap ${
      v === selectedCategory
        ? "text-white-200 shadow-[inset_0_-2px_0_#ffb86b]"
        : "text-muted hover:text-white-200"
    }" data-category="${v}">${v}</div>`;
  });

  return `
  <section class="w-full px-4">
      <div class="flex flex-row overflow-x-auto overflow-y-hidden gap-x-5 scrollbar-hide border-b border-solid border-line mb-2 text-body font-GmarketSansMedium">
        ${uniqueCategoriesMap.join("")}
      </div>
      ${filteredPostItemsHtml}
  </section>
  `;
}
