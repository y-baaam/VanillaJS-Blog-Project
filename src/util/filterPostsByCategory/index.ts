import { Post } from "@/api/posts";

/**
 * 카테고리에 따라 포스트를 필터링합니다.
 * @param {Post[]} posts  카테고리별로 구분할 포스트 목록
 * @param {string | null} category  필터링할 카테고리
 */
export function filterPostsByCategory(
  posts: Post[],
  category: string | null
): Post[] {
  return category === "All" || !category
    ? posts
    : posts.filter((post) => post.category === category);
}
