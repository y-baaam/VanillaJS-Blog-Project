import Header from "@comp/Header";
import Footer from "@comp/Footer";
import styles from "./index.module.css";

export default function Layout(htmlContent: string): HTMLElement {
  const layoutHTML = `
  <div class=${styles["layout"]}>
    <div class=${styles["contents__container"]}>
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
