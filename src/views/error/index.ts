import ErrorImg from "../public/images/404.png";
import styles from "./index.css";

export default function ErrorPage() {
  return `
  <section class=${styles["error__container"]}>
    <h1 class=${styles["error__text"]} >404 Not Found</h1>
  </section>
  `;
}
