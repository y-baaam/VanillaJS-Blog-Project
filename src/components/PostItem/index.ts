import styles from "./index.module.css";
import { Post } from "@/api/posts";
export default function PostItem(posts: Post[]) {
  return posts
    .map(
      (post) => `
    <div class="p-4" data-category=${post.category}>
      <a class=${styles["post__item__link"]} href=${post.path}>
        <h4 class="my-2 text-subTitle-bold">
          ${post.title}
        </h4>
        <p class="text-caption1 mb-4">
          ${post.description}
        </p>
        <div class="flex flex-row justify-between">
          <div class="text-caption2">${post.date}</div>
          <div class="text-caption2">${post.category}</div>
        </div>
      </a>
    </div>
  `
    )
    .join("");
}
