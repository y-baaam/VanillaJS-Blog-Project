import Layout from "@comp/Layout";
import styles from "./index.css";

export default function About() {
  const content = `
    <section class=${styles["about"]}>      
      <div></div>
      <div></div>
    </section>`;
  return Layout(content);
}
