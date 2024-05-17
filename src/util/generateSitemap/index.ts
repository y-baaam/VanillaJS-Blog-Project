import * as glob from "glob";
import * as fs from "fs";
import * as path from "path";

type SitemapUrl = {
  url: string;
  changefreq: string;
  priority: number;
};

const routes: Record<string, string> = {
  "/": "daily",
  "/posts": "daily",
  "/posts/:id": "daily",
  "/guestBook": "daily",
};

const postsJsonPath = path.resolve(
  __dirname,
  "../../../public/content/posts.json"
);

// 동적 URL 생성
function createDynamicUrlsFromPosts(): SitemapUrl[] {
  const posts = JSON.parse(fs.readFileSync(postsJsonPath, "utf-8"));
  return posts.map((post: any) => ({
    url: post.path,
    changefreq: "daily",
    priority: 0.8,
  }));
}

// 정적 URL 생성
function createStaticUrlsFromRoutes(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  for (const route in routes) {
    if (route.includes(":id")) {
      // .md 파일들을 검색하여 실제 포스트 경로로 동적 URL 생성
      const postFiles = glob.sync("public/content/posts/**/*.md");
      postFiles.forEach((file) => {
        const relativePath = path.relative("public/content/posts", file);
        const postId = relativePath.replace(/\.md$/, "");
        const url = route.replace(":id", postId);
        urls.push({ url, changefreq: routes[route], priority: 0.8 });
      });
    } else {
      urls.push({ url: route, changefreq: routes[route], priority: 0.8 });
    }
  }
  return urls;
}

function generateSitemap() {
  const staticUrls = createStaticUrlsFromRoutes();
  const dynamicUrls = createDynamicUrlsFromPosts();
  const allUrls = [...staticUrls, ...dynamicUrls];
  const sitemapContent = createSitemapContent(allUrls);
  saveSitemap(sitemapContent);
}

function createSitemapContent(urls: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (urlObj) => `
    <url>
      <loc>https://www.y-baam.net${urlObj.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${urlObj.changefreq}</changefreq>
      <priority>${urlObj.priority}</priority>
    </url>
  `
    )
    .join("")}
</urlset>`;
}

function saveSitemap(content: string) {
  fs.writeFileSync("public/sitemap.xml", content, "utf8");
}

generateSitemap();
