import Layout from "../../components/Layout/layout";
import styles from "./home.css";

export default function Home() {
  const content = `<div class=${styles.homeContainer}>홈 페이지 컨텐츠</div>`;
  return Layout(content);
}
