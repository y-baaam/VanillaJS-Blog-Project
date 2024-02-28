export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
};

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured);
}

export async function getAllPosts(): Promise<Post[]> {
  const url = "../../content/posts.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const posts: Post[] = await response.json();
    return posts.sort((a, b) => (a.date > b.date ? -1 : 1)); // 날짜 순대로 정렬
  } catch (error) {
    console.error("Failed to fetch posts: ", error);
    return [];
  }
}
