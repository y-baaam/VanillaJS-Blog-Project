import { Post } from "@/api/posts";
import { formatDate } from "@/util/formatDate";

export default function PostItem(posts: Post[]) {
  return posts
    .map(
      (post) => `
    <a href="${post.path}" data-link class="group block py-5 border-t border-solid border-line">
      <div class="text-caption2-bold font-GmarketSansMedium text-accent">${post.category} · ${formatDate(post.date)}</div>
      <h4 class="mt-2 text-subTitle font-GmarketSansMedium text-white-200 group-hover:text-accent">${post.title}</h4>
      <p class="mt-2 text-caption1 text-muted">${post.description}</p>
    </a>
  `
    )
    .join("");
}
