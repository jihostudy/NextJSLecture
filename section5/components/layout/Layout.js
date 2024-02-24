import React from "react";
// Components
import MainHeader from "./MainHeader";

const Layout = (props) => {
  return (
    <React.Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
