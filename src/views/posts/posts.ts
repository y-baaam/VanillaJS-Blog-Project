import Layout from "../../components/Layout/layout";
import styles from "./posts.css";
import PostItem from "../../components/PostItem/postItem";
import { getFeaturedPublicPosts, Post } from "../../api/posts";
import { State } from "../../util/state/state";

export default async function Posts() {
  const posts: Post[] = await getFeaturedPublicPosts();
  const categoryState = new State<string | null>("All");

  /**
   * 카테고리에 따라 포스트를 필터링합니다.
   * @param {Post[]} posts  카테고리별로 구분할 포스트 목록
   * @param {string | null} category  필터링할 카테고리
   * @returns {Post[]}  필터링된 포스트 목록
   */
  function filterPostsByCategory(
    posts: Post[],
    category: string | null
  ): Post[] {
    return category === "All" || !category
      ? posts
      : posts.filter((post) => post.category === category);
  }

  function render() {
    const selectedCategory = categoryState.getValue();
    const filteredPosts = filterPostsByCategory(posts, selectedCategory);
    const filteredPostItemsHtml = PostItem(filteredPosts); // 필터링된 포스트를 기반으로 PostItem을 호출

    //중복된 카테고리 목록 필터링
    const uniqueCategories = [...new Set(posts.map((post) => post.category))];
    const uniqueCategoriesMap = uniqueCategories.map((v) => {
      return `<div class=${styles["posts__category"]}  data-category=${v}>${v}</div>`;
    });

    const content = `
    <section class=${styles["posts"]}>
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

    const layoutElement = document.getElementById("app");
    if (layoutElement) {
      // 기존 내용을 비우기
      layoutElement.innerHTML = "";

      // Layout 함수로부터 반환된 HTMLElement를 추가
      const layoutContent = Layout(content);
      layoutElement.appendChild(layoutContent);
    } else {
      console.error("App container not found");
    }
  }

  // DOM로드가 되고 카테고리를 클릭하면 클릭된 카테고리를 가져오는 로직
  function setupCategoryListeners() {
    document.addEventListener("click", (e) => {
      let target = e.target as HTMLElement;
      if (!target?.className?.includes(`${styles["posts__category"]}`)) {
        return;
      }
      categoryState.setValue(target.getAttribute("data-category"));
      render();
    });
  }

  categoryState.subscribe(render);

  render();
  setupCategoryListeners();
}
