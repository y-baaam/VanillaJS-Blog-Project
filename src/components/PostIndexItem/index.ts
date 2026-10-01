import { Post } from "@/api/posts";
import { formatDate } from "@/util/formatDate";

export default function PostIndexItem(posts: Post[]) {
  return posts
    .map(
      (post) => `
    <a href="${post.path}" data-link class="group block py-3 border-b border-solid border-line sm:grid sm:grid-cols-[96px_1fr_auto] sm:gap-4 sm:items-baseline">
      <div class="sm:hidden text-caption2 text-muted">${formatDate(post.date)} · <span class="text-accent font-GmarketSansMedium">${post.category}</span></div>
      <span class="hidden sm:block text-caption1 text-muted">${formatDate(post.date)}</span>
      <span class="block mt-1 sm:mt-0 min-w-0 font-GmarketSansMedium text-white-200 group-hover:text-accent">${post.title}</span>
      <span class="hidden sm:block text-caption1 font-GmarketSansMedium text-accent">${post.category}</span>
    </a>
  `
    )
    .join("");
}
