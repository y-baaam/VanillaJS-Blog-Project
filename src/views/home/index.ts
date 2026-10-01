import Layout from "@comp/Layout";
import { createRotatingText } from "@/util/rotatingText";
import { Post, getFeaturedPublicPosts } from "@/api/posts";
import PostItem from "@/components/PostItem";

export default async function Home() {
  document.title = `영범 블로그`;
  const posts: Post[] = (await getFeaturedPublicPosts()).slice(0, 5);
  const recentPosts = PostItem(posts);
  const rotatingWords = ["Frontend", "JavaScript", "React", "Explore"];
  const content = `
    <main class="px-4">
      <section class="flex flex-col md:flex-row justify-between md:text-title text-subTitle font-GmarketSansLight mt-8 md:mt-20 mb-12 md:mb-24 gap-6 md:gap-0">
        <div class="h-auto md:h-28 flex flex-col justify-between">
          <div>안녕하세요! 😀</div>
          <div class="w-full">
            <span class="relative text-accent" id="rotatingText"></span> <span class="md:-m-2 -m-1 animate-typing">|</span>
            <span>를 좋아하는</span>
          </div>
          <div>개발자 <strong class="font-GmarketSansLight">송영범</strong>입니다.</div>
        </div>

        <div class="h-auto md:h-28 flex flex-col justify-between text-subTitle gap-2 md:gap-0">
          <a href="https://github.com/y-baaam" class="text-muted hover:text-white-200">github ↗</a>
          <a href="https://www.linkedin.com/in/young-beom-song/" class="text-muted hover:text-white-200">linkedIn ↗</a>
          <a href="https://www.rallit.com/resumes/52341@dudqja3674/%EC%86%A1%EC%98%81%EB%B2%94" class="text-muted hover:text-white-200">resume ↗</a>
        </div>
      </section>

      <section>
        <div class="flex justify-between items-baseline mb-2">
          <span class="text-caption1 tracking-widest font-GmarketSansMedium text-muted">RECENT POSTS</span>
          <a href="/posts" data-link class="text-caption1 font-GmarketSansMedium text-accent hover:underline">전체 글 보기 →</a>
        </div>
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
