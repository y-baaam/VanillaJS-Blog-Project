import Header from "./Header";
import Footer from "./Footer";

export default function Layout(htmlContent: string): HTMLElement {
  const layoutHTML = `
  <div class="w-full flex flex-col justify-center items-center mx-auto bg-black-400 ">
    <main class="w-full md:w-medium mx-auto pb-16 min-h-screen">
      ${Header()}
      <div class="py-8">
        ${htmlContent}
      </div>
    </main>
    ${Footer()}
  </div>
  `;
  const template = document.createElement("template");
  template.innerHTML = layoutHTML.trim();

  return template.content.firstChild as HTMLElement;
}
