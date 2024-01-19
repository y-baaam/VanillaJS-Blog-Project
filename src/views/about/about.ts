import Layout from "../../components/Layout/layout";
import styles from "./about.css";

export default function About() {
  const content = `
    <div class=${styles.aboutContainer}>      
      <div></div>
      <div></div>
    </div>`;
  return Layout(content);
}
