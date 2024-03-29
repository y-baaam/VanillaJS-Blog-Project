import Layout from "../../components/Layout/layout";
import utterances from "../../components/utterances/utterances";
import styles from "./guest-book.css";

export default async function GuestBook() {
  const content = `
    <div class=${styles.guestBookContainer}>
      <div class=${styles.guestBookTextContainer}>
        <div>자유롭게 방명록을 작성해주세요 🤗</div>
      </div>
      <div id="utterances-container" ></div>
    </div>
  `;

  const layoutContent = await Layout(content);

  const appDiv = document.getElementById("app");
  if (appDiv) {
    appDiv.innerHTML = "";
    appDiv.appendChild(layoutContent);

    // layoutContent가 DOM에 추가된 후에 utterances를 로드합니다.
    utterances("y-baaam/VanillaJS-Blog-Project");
  }

  return layoutContent;
}
