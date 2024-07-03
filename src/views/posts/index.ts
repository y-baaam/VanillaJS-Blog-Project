import Layout from "@comp/Layout";

import { getFeaturedPublicPosts, Post } from "@/api/posts";
import { State } from "@/util/state";

import { setupCategoryListeners } from "@/util/setupCategoryListeners";
import createPostsContent from "./posts-content";
import PostHeader from "@comp/PostHeader";

export default async function Posts() {
  document.title = `영범 블로그 | Posts`;
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
      const layoutContent = Layout(
        content,
        PostHeader(posts, selectedCategory)
      );
      layoutElement.appendChild(layoutContent);
    } else {
      console.error("App container not found");
    }
  }
  categoryState.subscribe(render);

  render();
  setupCategoryListeners({ categoryState, render });
}
