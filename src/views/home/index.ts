import Layout from "@comp/Layout";
import { createRotatingText } from "@/util/rotatingText";

export default function Home() {
  const rotatingWords = ["송영범", "나나나", "오오오", "징징징"];
  const content = `
  <section>
    <div>안녕하세요</div>
    <div>
      <div class="h-10">
        <div class="relative" id="rotatingText"></div>
      </div>

      <div class="text-title-bold">
        Hello world!
      </div>
    </div>
  </section>`;
  const layoutContent = Layout(content);

  // DOM에 컨텐츠가 추가된 후에 텍스트 회전 기능을 초기화합니다.
  setTimeout(() => {
    createRotatingText("rotatingText", rotatingWords);
  }, 0);

  return layoutContent;
}
