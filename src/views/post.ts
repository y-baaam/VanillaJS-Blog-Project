import Layout from "../components/Layout/layout";
import { apiHandler } from "../api/post";

export default function Post() {
  apiHandler().then((data) => {
    console.log(data);
  });

  const content = `<div>블로그 페이지
  // <img src='./public/ggg.jpg'/>
  </div>`;
  return Layout(content);
}
