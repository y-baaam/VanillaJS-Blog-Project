import styles from "./index.css";

function Header() {
  return `
  <header class=${styles["header__wrapper"]}>
    <div class=${styles["header__container"]}>
      <a href="/" data-link class=${styles["header__logo"]}>Blog</a>
      <nav class=${styles["header__navbar"]}>
        <ul>
          <li><a href="/post" data-link class=${styles["header__link"]}>post</a></li>
          <li><a href="/guestBook" data-link class=${styles["header__link"]}>guestbook</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}
export default Header;
