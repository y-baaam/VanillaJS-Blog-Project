import styles from "./navbar.css";
function Navbar() {
  return `
    <nav class=${styles.navbar}>
      <ul>
        <li><a href="/" data-link>홈</a></li>
        <li><a href="/about" data-link>소개</a></li>
        <li><a href="/blog" data-link>블로그</a></li>
      </ul>
    </nav>`;
}
export default Navbar;
