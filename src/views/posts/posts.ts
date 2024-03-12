import Layout from "../../components/Layout/layout";
import styles from "./posts.css";
import PostItem from "../../components/PostItem/postItem";
import { getFeaturedPosts } from "../../api/posts";
import { useState } from "../../util/state/state";

export default async function Posts() {
  const postsLength = (await getFeaturedPosts()).length;

  const postItemsHtml = await PostItem();
  const posts = await getFeaturedPosts();
  const [category, setCategory] = useState<string | null>("All");

  // // DOM로드가 되고 카테고리를 클릭하면 클릭된 카테고리를 가져오는 로직
  function setupCategoryListeners() {
    document.addEventListener("click", function (event) {
      const target = event.target as HTMLElement;
      const categoryElement = target.closest(`.${styles["posts__category"]}`);

      if (categoryElement) {
        const selectedCategory = categoryElement.getAttribute("data-category");
        setCategory(selectedCategory);
        console.log("@@ selected category", selectedCategory);
      }
    });
  }

  //중복된 카테고리 필터링
  const uniqueCategories = [...new Set(posts.map((post) => post.category))];
  const uniqueCategoriesMap = uniqueCategories.map((v) => {
    return `<div class=${styles["posts__category"]}  data-category=${v}>${v}</div>`;
  });

  const content = `
  <section class=${styles["posts"]}>
    <div class=${styles["posts__header"]}>
      <div class=${styles["posts__header__title"]}>${category()}</div>
      <div class=${styles["posts__header__num"]}>${postsLength} posts</div>
    </div>

    <div class=${styles["posts__body"]}>
      <div class=${styles["posts__category-list"]}>
        <div class=${styles["posts__category"]} data-category="All">All</div>
        ${uniqueCategoriesMap.join("")}
      </div>
      ${postItemsHtml}
    </div>  
  </section>`;

  const layoutContent = Layout(content);
  setupCategoryListeners();
  return layoutContent;
}
