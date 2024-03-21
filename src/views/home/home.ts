import Layout from "@comp/Layout/layout";
import styles from "./home.css";
import { createRotatingText } from "@/util/rotatingText/rotatingText";

export default function Home() {
  const rotatingWords = ["송영범", "나나나", "오오오", "징징징"];
  const content = `
  <section class=${styles["home"]}>
    <div>안녕하세요</div>
    <div class=${styles["rotatingText__wrapper"]}>
      <div id="rotatingText"></div>
    </div>
  </section>`;
  const layoutContent = Layout(content);

  // DOM에 컨텐츠가 추가된 후에 텍스트 회전 기능을 초기화합니다.
  setTimeout(() => {
    createRotatingText("rotatingText", rotatingWords);
  }, 0);

  return layoutContent;
}
