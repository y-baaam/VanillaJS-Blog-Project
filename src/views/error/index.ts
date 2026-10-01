import Layout from "@comp/Layout";

export default function ErrorPage() {
  document.title = `영범 블로그 | 404 Not Found`;
  const content = `
  <section class="w-full px-4 text-subTitle-bold md:text-title">
    <h1 class="text-center mt-32 mb-20">
      404 Not Found
      <div>페이지를 찾을 수 없습니다.</div>
    </h1>
    <div class="flex flex-col w-full justify-center items-center">
      <a href="/" class="w-full max-w-sm text-center p-4 my-4 rounded-lg border border-solid border-line hover:border-accent text-white-200 cursor-pointer">홈으로</a>
      <button type="button" onclick="history.back()" class="w-full max-w-sm text-center p-4 my-4 rounded-lg border border-solid border-line hover:border-accent text-white-200 cursor-pointer">이전 페이지</button>
    </div>
  </section>
  `;

  const layoutContent = Layout(content);

  return layoutContent;
}
