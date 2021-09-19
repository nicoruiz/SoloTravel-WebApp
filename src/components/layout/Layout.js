import Footer from "./Footer";
import Header from "./Header";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
