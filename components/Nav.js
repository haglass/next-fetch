import Link from "next/link";
import React from "react";
import navStyle from "../styles/Nav.module.css";
const Nav = () => {
  return (
    <nav className={navStyle.nav}>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/photos">
            <a>Cat Photos</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
