import { Post } from "@/api/posts";
import { filterPostsByCategory } from "@/util/filterPostsByCategory";

export default function PostHeader(
  posts: Post[],
  selectedCategory: string | null
) {
  const filteredPosts = filterPostsByCategory(posts, selectedCategory);
  const content = `
  <div class="flex flex-col justify-center text-center">
    <div class="text-title-bold">${selectedCategory}</div>
    <div class="p-3">${filteredPosts.length} posts</div>
  </div>
  `;

  return content;
}
