import { Post } from "@/api/posts";
export default function PostItem(posts: Post[]) {
  return posts
    .map(
      (post) => `
    <div class="p-4 hover:bg-black-200 rounded-lg" data-category=${post.category}>
      <a class="no-underline text-white-200 visited:text-white-200" href=${post.path}>
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
