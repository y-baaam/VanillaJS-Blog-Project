import styles from "./header.css";

function Header() {
  return `
  <header class=${styles.header}>
    <a href="/" data-link class=${styles.logo}>Blog</a>
  </header>`;
}
export default Header;
