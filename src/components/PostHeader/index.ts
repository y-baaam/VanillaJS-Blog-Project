import { Post } from "@/api/posts";
import { filterPostsByCategory } from "@/util/filterPostsByCategory";

export default function PostHeader(
  posts: Post[],
  selectedCategory: string | null
) {
  const filteredPosts = filterPostsByCategory(posts, selectedCategory);
  return `
  <div class="px-4 mb-4 text-title font-GmarketSansMedium">
    Posts <span class="text-body font-GmarketSansLight text-muted">${filteredPosts.length}</span>
  </div>
  `;
}
