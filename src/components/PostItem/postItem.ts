import styles from "./postItem.css";
import { Post } from "@/api/posts";
export default function PostItem(posts: Post[]) {
  return posts
    .map(
      (post) => `
    <div class=${styles["post__item"]} data-category=${post.category}>
      <a class=${styles["post__item__link"]} href=${post.path}>
        <h4 class=${styles["post__item__title"]}>
          ${post.title}
        </h4>
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
