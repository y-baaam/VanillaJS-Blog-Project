import styles from "./postItem.css";
import { getFeaturedPosts } from "../../api/posts";

export default async function PostItem() {
  const posts = await getFeaturedPosts();
  return posts
    .map(
      (post) => `
    <div class=${styles["post__item"]}>
      <a class=${styles["post__item__link"]} href=${post.path}>
        <div class=${styles["post__item__title"]}>
          ${post.title}
        </div>
        <p class=${styles["post__item__description"]}>
          ${post.description}
        </p>
        <div class=${styles["post__item__bottom"]}>
          <div class=${styles["post__item__date"]}>${post.date}</div>
          <div class=${styles["post__item__category"]}>${post.category}</div>
        </div>
      </a>
    </div>
  `
    )
    .join("");
}
