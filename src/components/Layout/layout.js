import Header from "../Header/header.js";
import Footer from "../Footer/footer.js";
import Navbar from "../Navbar/navbar.js";

export default function Layout(content) {
  return `${Header()}
  ${Navbar()}
  ${content}
  ${Footer()}`;
}
