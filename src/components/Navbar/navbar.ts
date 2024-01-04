import styles from "./navbar.css";
function Navbar() {
  return `
    <nav class=${styles.navbar}>
      <ul>
        <li><a href="/" data-link>홈</a></li>
        <li><a href="/about" data-link>소개</a></li>
        <li><a href="/post" data-link>포스트</a></li>
        <li><a href="/guestBook" data-link>방명록</a></li>
      </ul>
    </nav>`;
}
export default Navbar;
