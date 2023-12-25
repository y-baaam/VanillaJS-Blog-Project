import Header from "../Header/header";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";

export default function Layout(content: string) {
  return `${Header()}
  ${Navbar()}
  ${content}
  ${Footer()}`;
}
