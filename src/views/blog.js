import Layout from "../components/Layout/layout.js";
import { apiHandler } from "../api/post.js";

export default function Blog() {
  apiHandler().then((data) => {
    console.log(data);
  });

  const content = `<div>블로그 페이지</div>`;
  return Layout(content);
}
