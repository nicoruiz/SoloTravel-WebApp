import { Container } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <Header />
      <Container>
        <main className={classes.main}>{props.children}</main>
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;
