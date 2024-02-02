import Layout from "../../../components/Layout/layout";
import styles from "./PostDetail.css";

const fs = require("fs");
const matter = require("gray-matter");
const marked = require("marked");
import markContent from "../../../../content/example/index.md";

export default function Post() {
  const fileContent = fs.readFileSync(markContent);

  // gray-matter를 사용하여 프론트매터와 마크다운 본문을 분리합니다.
  const { data: frontMatter, content: markdownContent } = matter(fileContent);

  // marked를 사용하여 마크다운 본문을 HTML로 변환합니다.
  const htmlContent = marked(markdownContent);

  console.log(frontMatter); // 프론트매터 메타데이터를 출력합니다.
  console.log(htmlContent); // 변환된 HTML을 출력합니다.

  const content = `
  <div class=${styles.postContainer}>
    
  </div>`;
  return Layout(content);
}
