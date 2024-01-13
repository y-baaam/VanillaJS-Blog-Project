import Header from "../Header/header";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";
import styles from "./layout.css";

export default function Layout(content: string) {
  return `
  <div class=${styles.layout}>
    <div class=${styles.headerContainer}>
      ${Header()}
      ${Navbar()}
    </div>
    ${content}
    ${Footer()}
  </div>
  `;
}
