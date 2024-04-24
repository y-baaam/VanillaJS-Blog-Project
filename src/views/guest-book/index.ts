import Layout from "@comp/Layout";
import utterances from "@comp/utterances";

export default async function GuestBook() {
  const content = `
    <section>
      <div class="flex justify-center py-24">
        <div class="text-subTitle md:text-title">자유롭게 방명록을 작성해주세요 🤗</div>
      </div>
      <div id="utterances-container"></div>
    </section>
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
