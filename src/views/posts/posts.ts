import Layout from "../../components/Layout/layout";
import styles from "./posts.css";
import PostItem from "../../components/PostItem/postItem";
import { getFeaturedPosts } from "../../api/posts";

export default async function Posts() {
  const postItems = await PostItem();
  const postsLength = (await getFeaturedPosts()).length;

  const content = `
  <section class=${styles["posts"]}>
    <div class=${styles["posts__header"]}>
      <div class=${styles["posts__header__title"]}>title</div>
      <div class=${styles["posts__header__num"]}>${postsLength} posts</div>
    </div>

    <div class=${styles["posts__body"]}>
      <div class=${styles["posts__category-list"]}>
        <div class=${styles["posts__category"]}>All</div>
        <div class=${styles["posts__category"]}>category</div>
        <div class=${styles["posts__category"]}>category</div>
        <div class=${styles["posts__category"]}>category</div>
        <div class=${styles["posts__category"]}>category</div>
        <div class=${styles["posts__category"]}>category</div>
      </div>
      ${postItems}
    </div>  
  </section>`;

  return Layout(content);
}
