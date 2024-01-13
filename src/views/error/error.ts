import ErrorImg from "../public/images/404.png";
import styles from "./error.css";

export default function ErrorPage() {
  return `
  <div class=${styles.errorContainer}>
    <h1 class=${styles.errorText} >404 Not Found</h1>
  </div>
  `;
}
