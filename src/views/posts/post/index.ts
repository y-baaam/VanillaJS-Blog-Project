import Layout from "@comp/Layout";
import markdownStyle from "@/styles/markdown-style.module.css";
import ErrorPage from "@views/error";
import matter from "gray-matter";
import * as marked from "marked";

import hljs from "highlight.js";
import "./highlight.scss";

export default async function Post(): Promise<string | HTMLElement> {
  const path = window.location.pathname;
  const postId = path.split("/").pop(); // URL의 마지막 부분을 postId로 사용합니다.

  // posts.json에서 올바른 파일명을 찾기
  let postContentURL: string;
  try {
    const postsResponse = await fetch("/content/posts.json");
    const posts = await postsResponse.json();
    const post = posts.find((p: any) => p.path === path);

    if (post) {
      // path에서 파일명 추출 (예: "/posts/1-compile" -> "1-compile")
      const fileName = post.path.split("/").pop();
      postContentURL = `/content/posts/${fileName}.md`;
    } else {
      throw new Error(`Post not found for path: ${path}`);
    }
  } catch (error) {
    console.error("Failed to load posts.json", error);
    return ErrorPage();
  }

  let postContent;
  try {
    const response = await fetch(postContentURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    postContent = await response.text();
  } catch (error) {
    console.error("failed to fetch post content", error);
    return ErrorPage();
  }
  // gray-matter를 사용하여 프론트매터와 마크다운 본문을 분리
  const { data: frontMatter, content: markdownContent } = matter(
    postContent as string
  );

  // marked를 사용하여 마크다운을 HTML로 변환
  const htmlContent: string = marked.marked(markdownContent) as string;

  const rawHtml = document.createElement("div");
  rawHtml.innerHTML = htmlContent;
  rawHtml.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });

  // 이미지 Lazy Loading 및 애니메이션 적용
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100");
        observer.unobserve(img);
      }
    });
  });

  rawHtml.querySelectorAll("img").forEach((img) => {
    img.setAttribute("loading", "lazy");
    img.classList.add("opacity-0", "transition-opacity", "duration-1000");
    observer.observe(img);
  });

  document.title = `영범 블로그 | ${frontMatter.title}`;

  const content = `
  <section class="w-full p-4">
  <div class="text-7xl">${frontMatter.emoji}</div>
    <header class="mt-4">
      <div class="text-white-400 rounded-2xl inline-block text-body-bold font-GmarketSansMedium">${frontMatter.categories}</div>
      <div class="text-title mt-2">${frontMatter.title}</div>
      <div class="text-white-400 text-caption2-bold pt-2">${frontMatter.date}</div>
    </header>
    <hr class="mt-6 mb-6 border-y-gray-700"/>
    <div class=${markdownStyle["markdown"]}>${rawHtml.innerHTML}</div>
  </section>`;
  const layoutElement = Layout(content) as HTMLElement;
  document.body.appendChild(layoutElement);

  layoutElement.querySelectorAll("img").forEach((img) => {
    observer.observe(img);
  });

  return layoutElement;
}
