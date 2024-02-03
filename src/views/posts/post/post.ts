import Layout from "../../../components/Layout/layout";
import styles from "./post.css";

import matter from "gray-matter";
import * as marked from "marked";
import markContent from "../../../../content/example/index.md";

export default function Post() {
  // gray-matter를 사용하여 프론트매터와 마크다운 본문을 분리합니다.
  const { data: frontMatter, content: markdownContent } = matter(markContent);

  // marked를 사용하여 마크다운 본문을 HTML로 변환합니다.
  const htmlContent = marked.marked(markdownContent);

  console.log(frontMatter); // 프론트매터 메타데이터를 출력합니다.
  console.log(htmlContent); // 변환된 HTML을 출력합니다.

  const content = `
  <div class=${styles.postContainer}>

  </div>`;
  return Layout(content);
}
