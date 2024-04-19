import Layout from "@comp/Layout";

export default function ErrorPage() {
  const content = `
  <section>
    <h1 class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-title">
      404 Not Found
      <div>페이지를 찾을 수 없습니다.</div>
      <div onclick="history.back()" class="mt-10 p-4 text-black-100 bg-white-100 text-center text-title-bold">이전 페이지</div>
    </h1>
    
  </section>
  `;

  const layoutContent = Layout(content);

  return layoutContent;
}
