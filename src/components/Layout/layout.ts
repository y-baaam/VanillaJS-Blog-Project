import Header from "../Header/header";
import Footer from "../Footer/footer";
import styles from "./layout.css";

export default function Layout(content: string) {
  return `
  <div class=${styles.layout}>
    <div class=${styles.contentsContainer}>
      ${Header()}
      ${content}
      ${Footer()}
    </div>
  </div>
  `;
}
