import styles from "./header.css";

function Header() {
  return `
  <header class=${styles.header}>
    <h1 class=${styles.logo}>Blog</h1>
    <div class=${styles.navBar}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </header>`;
}
export default Header;
