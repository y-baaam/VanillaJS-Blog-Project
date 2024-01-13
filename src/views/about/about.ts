import Layout from "../../components/Layout/layout";
import styles from "./about.css";

export default function About() {
  const content = `
  <div class=${styles.aboutContainer}>소개 페이지 컨텐츠</div>`;
  return Layout(content);
}
