import Header from "./Header";
import Footer from "./Footer";

export default function Layout(htmlContent: string): HTMLElement {
  const layoutHTML = `
  <div class="w-default flex justify-center items-center pb-10 mx-auto">
    <div class="w-full  md:w-medium mx-auto">
      ${Header()}
      ${htmlContent}
      ${Footer()}
    </div>
  </div>
  `;
  const template = document.createElement("template");
  template.innerHTML = layoutHTML.trim();

  return template.content.firstChild as HTMLElement;
}
