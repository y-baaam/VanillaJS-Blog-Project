import Layout from "@comp/Layout";
import { createRotatingText } from "@/util/rotatingText";
import { Post, getFeaturedPublicPosts } from "@/api/posts";
import PostItem from "@/components/PostItem";

export default async function Home() {
  console.log("test");
  document.title = `영범 블로그`;
  const posts: Post[] = (await getFeaturedPublicPosts()).slice(0, 5);
  const recentPosts = PostItem(posts);
  const rotatingWords = ["Frontend", "JavaScript", "React"];
  const content = `
    <main>
      <section class="flex justify-between flex-row md:text-title text-subTitle font-GmarketSansLight mt-20 mb-24">
        <div class="h-28 flex flex-col justify-between">
          <div>안녕하세요! 😀</div>
          <div class="w-full">
            <span class="relative" id="rotatingText"></span> <span class="md:-m-2 -m-1 animate-typing">|</span>
            <span>를 좋아하는</span>
          </div>
          <div>개발자 <strong class="font-GmarketSansLight">송영범</strong>입니다.</div>
        </div>

        <div class="h-28 flex flex-col justify-between text-subTitle">
          <a href="https://github.com/y-baaam" class="">github</a>
          <a href="https://www.linkedin.com/in/young-beom-song/" class="">linkedIn</a>
          <a href="https://docs.google.com/document/d/1SeWavGWvQ-pnENrYH4lW4BUPxzhawPvgNx0F3UWYiCs/edit?usp=sharing" class="">resume</a>
        </div>
      </section>

      <section>
        <div class="p-2 mb-4 w-44 border-2 border-solid border-white text-subHead-bold">Recent Posts</div>
        ${recentPosts}
      </section>
    </main>`;
  const layoutContent = Layout(content);

  // DOM에 컨텐츠가 추가된 후에 텍스트 회전 기능을 초기화합니다.
  setTimeout(() => {
    createRotatingText("rotatingText", rotatingWords);
  }, 0);

  return layoutContent;
}
