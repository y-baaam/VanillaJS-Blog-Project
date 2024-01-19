import Layout from "../../components/Layout/layout";
import { apiHandler } from "../../api/post";
import styles from "./post.css";

export default function Post() {
  apiHandler().then((data) => {
    console.log(data);
  });

  const content = `
  <div class=${styles.postContainer}>블로그 페이지


  </div>`;
  return Layout(content);
}
