import Layout from "@comp/Layout";
import styles from "./index.css";
import markdownStyle from "/styles/markdown-style.css";
import ErrorPage from "@views/error";
import matter from "gray-matter";
import * as marked from "marked";

import hljs from "highlight.js";
import "./highlight.scss";

export default async function Post(): Promise<string | HTMLElement> {
  const path = window.location.pathname;
  const postId = path.split("/").pop(); // URL의 마지막 부분을 postId로 사용합니다.

  const postContentURL = `/content/posts/${postId}.md`; // 서버 상의 실제 경로를 사용합니다.

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

  const content = `
  <section class=${styles["post"]}>
    <header class=${styles["post__header"]}>
      <div class=${styles["post__emoji"]}>${frontMatter.emoji}</div>
      <h1 class=${styles["post__title"]}>${frontMatter.title}</h1>
      <div class=${styles["post__categories"]}>${frontMatter.categories}</div>
    </header>
    <div class=${markdownStyle["markdown"]}>${rawHtml.innerHTML}</div>
  </section>`;
  return Layout(content);
}
