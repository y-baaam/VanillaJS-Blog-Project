import Layout from "../../components/Layout/layout";
import styles from "./guest-book.css";
export default function GuestBook() {
  const content = `<div class=${styles.guestBookContainer}>방명록 페이지</div>`;
  return Layout(content);
}
