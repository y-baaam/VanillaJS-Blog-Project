import Layout from "../../../components/Layout/layout";
import styles from "./post.css";
import markdownStyle from "../../../../styles/markdown-style.css";
import markContent from "../../../../content/posts/example1.md";

import matter from "gray-matter";
import * as marked from "marked";

import hljs from "highlight.js";
import "./highlight.scss";

export default function Post() {
  // gray-matter를 사용하여 프론트매터와 마크다운 본문을 분리
  const { data: frontMatter, content: markdownContent } = matter(
    markContent as string
  );

  // marked를 사용하여 마크다운을 HTML로 변환
  const htmlContent: string = marked.marked(markdownContent) as string;

  const rawHtml = document.createElement("div");
  rawHtml.innerHTML = htmlContent;
  rawHtml.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });

  const content = `
  <div class=${styles["post"]}>
    <header class=${styles["post__header"]}>
      <div class=${styles["post__emoji"]}>${frontMatter.emoji}</div>
      <h1 class=${styles["post__title"]}>${frontMatter.title}</h1>
      <div class=${styles["post__categories"]}>${frontMatter.categories}</div>
    </header>
    <div class=${markdownStyle["markdown"]}>${rawHtml.innerHTML}</div>
  </div>`;
  return Layout(content);
}
