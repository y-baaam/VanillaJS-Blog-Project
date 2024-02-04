import Layout from "../../../components/Layout/layout";
import styles from "./post.css";
import markdownStyle from "../../../../styles/markdown-style.css";
import markContent from "../../../../content/example/index.md";

import matter from "gray-matter";
import * as marked from "marked";

// code highlight 기능입니다.
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/github.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", html);

export default async function Post() {
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

  console.log(frontMatter); // 프론트매터 메타데이터를 출력합니다.
  console.log(htmlContent); // 변환된 HTML을 출력합니다.
  console.log(hljs, "hljs");

  const content = `
  <div class=${styles.postContainer}>
    <div class=${markdownStyle.markdown}>${rawHtml.innerHTML}</div>
  </div>`;
  return Layout(content);
}
