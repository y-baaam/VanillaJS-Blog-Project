import styles from "./postItem.css";
import { getFeaturedPosts } from "../../api/posts";

export default async function PostItem() {
  const posts = await getFeaturedPosts();
  return posts
    .map(
      (post) => `
    <div class=${styles["post__item"]}>
      <a class=${styles["post__item--link"]} href=${post.path}>
        <div class=${styles["post__item--title"]}>
          ${post.title}
        </div>
        <p class=${styles["post__item--description"]}>
          ${post.description}
        </p>
        <div class=${styles["post__item--bottom"]}>
          <div class=${styles["post__item--date"]}>${post.date}</div>
          <div class=${styles["post__item--category"]}>${post.category}</div>
        </div>
      </a>
    </div>
  `
    )
    .join("");
}
