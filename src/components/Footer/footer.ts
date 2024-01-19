import styles from "./footer.css";
function Footer() {
  return `
<footer class=${styles.footer}>
  <p>© Powered by 
    <a href="https://github.com/y-baaam" class=${styles.link}>young beom</a>
  </p>
</footer>
`;
}
export default Footer;
