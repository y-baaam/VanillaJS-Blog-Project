import Layout from "@comp/Layout";

import { getFeaturedPublicPosts, Post } from "@/api/posts";
import { State } from "@/util/state";

import { setupCategoryListeners } from "@/util/setupCategoryListeners";
import createPostsContent from "./posts-content";

export default async function Posts() {
  const posts: Post[] = await getFeaturedPublicPosts();
  const categoryState = new State<string | null>("All");

  function render() {
    const selectedCategory = categoryState.getValue();
    const content = createPostsContent(posts, selectedCategory);

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
  categoryState.subscribe(render);

  render();
  setupCategoryListeners({ categoryState, render });
}
