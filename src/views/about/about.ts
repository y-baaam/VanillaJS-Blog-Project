import Layout from "../../components/Layout/layout";
import styles from "./about.css";

export default function About() {
  const content = `
    <section class=${styles["about"]}>      
      <div></div>
      <div></div>
    </section>`;
  return Layout(content);
}
