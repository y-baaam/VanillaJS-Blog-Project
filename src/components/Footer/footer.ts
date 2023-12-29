import styles from "./footer.css";
function Footer() {
  return `
<footer class=${styles.footer}>
  <p>&copy; ${new Date().getFullYear()} 나의 블로그.</p>
</footer>
`;
}
export default Footer;
