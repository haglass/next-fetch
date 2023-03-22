import React, { Children } from "react";
import HeaderInfo from "./HeaderInfo";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderInfo />
      <Nav />
      <div> {children}</div>
    </>
  );
};

export default Layout;
