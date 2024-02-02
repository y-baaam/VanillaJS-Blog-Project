import Layout from "../../components/Layout/layout";

import styles from "./post.css";

export default function Post() {
  const content = `
  <div class=${styles.postContainer}>
    <div class=${styles.titleContainer}>
      <div class=${styles.titleCategory}>All</div>
      <div class=${styles.postNum}>123 posts</div>
    </div>

    <div class=${styles.postBody}>
      <div class=${styles.categoryList}>
        <div class=${styles.category}>All</div>
        <div class=${styles.category}>category</div>
        <div class=${styles.category}>category</div>
        <div class=${styles.category}>category</div>
        <div class=${styles.category}>category</div>
        <div class=${styles.category}>category</div>

      </div>
      <div class=${styles.postContentsContainer}>
        <div class=${styles.postContentsTitle}>
          제목
        <div/>
        <p class=${styles.postContentsText}>
          contents
        </p>
        <div class=${styles.postContentsBottomContainer}>
          <div>date</div>
          <div>category</div>
        </div>
      </div>
    </div>  
  </div>`;
  return Layout(content);
}
