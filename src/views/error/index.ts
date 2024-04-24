import Layout from "@comp/Layout";

export default function ErrorPage() {
  const content = `
  <section class="w-full text-subTitle-bold md:text-title">
    <h1 class="text-center mt-32 mb-20">
      404 Not Found
      <div>페이지를 찾을 수 없습니다.</div>
    </h1>
    <div class="flex flex-col w-full justify-center items-center">
      <a href="/" class="w-96 text-center p-4 my-4 text-black-100 bg-white-100 cursor-pointer">홈으로</a>
      <a onclick="history.back()" class="w-96 text-center p-4 my-4 text-black-100 bg-white-100 cursor-pointer">이전 페이지</a>
    </div>
  </section>
  `;

  const layoutContent = Layout(content);

  return layoutContent;
}
