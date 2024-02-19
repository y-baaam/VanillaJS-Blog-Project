import Layout from "../../components/Layout/layout";
import styles from "./posts.css";
import { getAllPosts } from "../../api/posts";

export default async function Post() {
  const posts = await getAllPosts();
  console.log(posts);

  const content = `
  <div class="${styles["posts"]}">
    <div class="${styles["posts__header"]}">
      <div class="${styles["posts__header--title"]}">All</div>
      <div class="${styles["posts__header--num"]}">123 posts</div>
    </div>

    <div class="${styles["posts__body"]}">
      <div class="${styles["posts__category--list"]}">
        <div class="${styles["posts__category"]}">All</div>
        <div class="${styles["posts__category"]}">category</div>
        <div class="${styles["posts__category"]}">category</div>
        <div class="${styles["posts__category"]}">category</div>
        <div class="${styles["posts__category"]}">category</div>
        <div class="${styles["posts__category"]}">category</div>
      </div>
      <div class="${styles["posts__item"]}">
        <div class="${styles["posts__item--title"]}">
          제목
        </div>
        <p class="${styles["posts__item--text"]}">
          contents
        </p>
        <div class="${styles["posts__item--bottom"]}">
          <div class="${styles["posts__item--date"]}">date</div>
          <div class="${styles["posts__item--category"]}">category</div>
        </div>
      </div>
    </div>  
  </div>`;
  return Layout(content);
}
