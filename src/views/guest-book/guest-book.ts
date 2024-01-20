import Layout from "../../components/Layout/layout";
import utterances from "../../components/utterances/utterances";
import styles from "./guest-book.css";

export default function GuestBook() {
  const content = `
  <div class="${styles.guestBookContainer}">
    <div id="utterances-container"></div>
  </div>
  `;

  // 레이아웃 컨텐츠를 로드한 후에 Utterances를 로드합니다.
  const layoutContent = Layout(content);
  document.addEventListener("DOMContentLoaded", () => {
    utterances("y-baaam/VanillaJS-Blog-Project");
  });

  return layoutContent;
}
