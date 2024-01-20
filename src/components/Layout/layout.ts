import Header from "../Header/header";
import Footer from "../Footer/footer";
import styles from "./layout.css";

export default function Layout(htmlContent: string): HTMLElement {
  const layoutHTML = `
  <div class=${styles.layout}>
    <div class=${styles.contentsContainer}>
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
