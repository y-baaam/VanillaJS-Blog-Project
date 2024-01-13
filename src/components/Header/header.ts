import styles from "./header.css";

function Header() {
  return `
  <header class=${styles.header}>
    <div class=${styles.headerInnerContainer}>
      <a href="/" data-link class=${styles.logo}>Blog</a>
      <nav class=${styles.navbar}>
        <ul>
          <li><a href="/post" data-link class=${styles.headLink}>post</a></li>
          <li><a href="/about" data-link class=${styles.headLink}>about</a></li>
          <li><a href="/guestBook" data-link class=${styles.headLink}>guestbook</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}
export default Header;
