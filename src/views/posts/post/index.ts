import Layout from "@comp/Layout";
import markdownStyle from "@/styles/markdown-style.module.css";
import ErrorPage from "@views/error";
import PostNavigation from "@comp/PostNavigation";
import utterances from "@comp/utterances";
import TableOfContents, {
  TocItem,
  setupTocHighlight,
} from "@comp/TableOfContents";
import { getAllPosts } from "@/api/posts";
import { formatDate } from "@/util/formatDate";
import matter from "gray-matter";
import * as marked from "marked";

import hljs from "highlight.js";
import "./highlight.scss";

export default async function Post(): Promise<string | HTMLElement> {
  const path = window.location.pathname;
  const postId = path.split("/").pop(); // URL의 마지막 부분을 postId로 사용합니다.

  // posts.json에서 올바른 파일명을 찾기
  let postContentURL: string;
  let navigationHtml: string;
  try {
    const posts = await getAllPosts();
    const post = posts.find((p) => p.path === path);
    navigationHtml = PostNavigation(
      posts.filter((p) => p.public),
      path
    );

    if (post) {
      // path에서 파일명 추출 (예: "/posts/1-compile" -> "1-compile")
      const fileName = post.path.split("/").pop();
      postContentURL = `/content/posts/${fileName}.md`;
    } else {
      throw new Error(`Post not found for path: ${path}`);
    }
  } catch (error) {
    console.error("Failed to load posts.json", error);
    return ErrorPage();
  }

  let postContent;
  try {
    const response = await fetch(postContentURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    postContent = await response.text();
  } catch (error) {
    console.error("failed to fetch post content", error);
    return ErrorPage();
  }
  // gray-matter를 사용하여 프론트매터와 마크다운 본문을 분리
  const { data: frontMatter, content: markdownContent } = matter(
    postContent as string
  );

  // marked를 사용하여 마크다운을 HTML로 변환
  const htmlContent: string = marked.marked(markdownContent) as string;

  const rawHtml = document.createElement("div");
  rawHtml.innerHTML = htmlContent;
  rawHtml.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });

  rawHtml.querySelectorAll("table").forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.className = markdownStyle["tableWrapper"];
    table.replaceWith(wrapper);
    wrapper.appendChild(table);
  });

  const tocItems: TocItem[] = [];
  rawHtml.querySelectorAll("h2, h3").forEach((heading, index) => {
    heading.id = `heading-${index}`;
    tocItems.push({
      id: heading.id,
      text: heading.textContent ?? "",
      level: heading.tagName === "H2" ? 2 : 3,
    });
  });
  const toc = TableOfContents(tocItems);

  // 이미지 Lazy Loading 및 애니메이션 적용
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100");
        observer.unobserve(img);
      }
    });
  });

  rawHtml.querySelectorAll("img").forEach((img) => {
    img.setAttribute("loading", "lazy");
    img.classList.add("opacity-0", "transition-opacity", "duration-1000");
    observer.observe(img);
  });

  const readingMinutes = Math.max(
    1,
    Math.round((rawHtml.textContent ?? "").length / 500)
  );

  document.title = `영범 블로그 | ${frontMatter.title}`;

  const content = `
  <section class="w-full p-4">
  <div class="text-7xl">${frontMatter.emoji}</div>
    <header class="mt-4">
      <a href="/posts?category=${encodeURIComponent(frontMatter.categories)}" data-link class="text-accent hover:underline inline-block text-body-bold font-GmarketSansMedium">${frontMatter.categories}</a>
      <div class="text-title mt-2">${frontMatter.title}</div>
      <div class="text-muted text-caption1 pt-2">${formatDate(frontMatter.date)} · 약 ${readingMinutes}분</div>
    </header>
    <hr class="mt-6 mb-6 border-0 border-t border-solid border-line"/>
    ${toc.inline}
    ${toc.side}
    <div class=${markdownStyle["markdown"]}>${rawHtml.innerHTML}</div>
    ${navigationHtml}
    <div id="post-comments" class="mt-12"></div>
  </section>`;
  const layoutElement = Layout(content) as HTMLElement;
  document.body.appendChild(layoutElement);

  // 해시 이동은 popstate를 일으켜 라우터가 페이지를 다시 그리므로 직접 스크롤한다
  layoutElement.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
      "a[data-toc]"
    );
    if (!link) return;
    e.preventDefault();
    layoutElement
      .querySelector(`#${link.dataset.toc}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  setupTocHighlight(layoutElement, tocItems);
  utterances("y-baaam/VanillaJS-Blog-Project", "comment", "post-comments");

  layoutElement.querySelectorAll("img").forEach((img) => {
    observer.observe(img);
  });

  return layoutElement;
}
