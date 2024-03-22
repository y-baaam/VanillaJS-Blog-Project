import styles from "./index.css";

function Footer() {
  return `
<footer class=${styles["footer"]}>
  <p>© Powered by 
    <a href="https://github.com/y-baaam" class=${styles["footer__link"]}>young beom</a>
  </p>
</footer>
`;
}
export default Footer;
