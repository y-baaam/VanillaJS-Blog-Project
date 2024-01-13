import Layout from "../../components/Layout/layout";
import styles from "./home.css";

export default function Home() {
  const content = `
  <div class=${styles.homeContainer}>
    <div>a</div>
  </div>`;
  return Layout(content);
}
