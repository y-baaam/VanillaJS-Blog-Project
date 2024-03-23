import styles from "./index.css";
import { Post } from "@/api/posts";
import { filterPostsByCategory } from "@/util/filterPostsByCategory";
import PostItem from "@comp/PostItem";

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
  const filteredPostItemsHtml = PostItem(filteredPosts); // 필터링된 포스트를 기반으로 PostItem을 호출

  //중복된 카테고리 목록 필터링
  const uniqueCategories = [...new Set(posts.map((post) => post.category))];
  const uniqueCategoriesMap = uniqueCategories.map((v) => {
    return `<div class=${styles["posts__category"]}  data-category=${v}>${v}</div>`;
  });

  return `<section class=${styles["posts"]}>
  <div class=${styles["posts__header"]}>
    <div class=${styles["posts__header__title"]}>${selectedCategory}</div>
    <div class=${styles["posts__header__num"]}>${
    filteredPosts.length
  } posts</div>
  </div>

  <div class=${styles["posts__body"]}>
    <div class=${styles["posts__category-list"]}>
      <div class=${styles["posts__category"]} data-category="All">All</div>
      ${uniqueCategoriesMap.join("")}
    </div>
    ${filteredPostItemsHtml}
  </div>  
</section>`;
}
