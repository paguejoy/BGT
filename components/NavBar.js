import { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";

//import Link component from nextjs
import Link from "next/link";

import UserContext from "../userContext";

export default function NavBar() {
  const { user } = useContext(UserContext);
  // console.log(user);

  return (
    <Navbar expand="lg" variant="dark">
      <Link href="/">
        <a className="navbar-brand">BTG </a>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/">
            <a className="nav-link" role="button">Home</a>
          </Link>

          <Link href="/about">
            <a className="nav-link" role="button">About</a>
          </Link>
          {user.email 
            ? (
            <>
              <Link href="/profile">
                <a className="nav-link" role="button">Profile</a>
              </Link>
              <Link href="/categories">
                <a className="nav-link" role="button">Category</a>
              </Link>
              <Link href="/records">
                <a className="nav-link" role="button">Records</a>
              </Link>
              <Link href="/search">
                <a className="nav-link" role="button">Search</a>
              </Link>
              <Link href="/charts">
                <a className="nav-link" role="button">Charts</a>
              </Link>

              <Link href="/logout">
                <a className="nav-link" role="button">Logout</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register">
                <a className="nav-link" role="button">
                  Register
                </a>
              </Link>
              <Link href="/login">
                <a className="nav-link" role="button">
                  Log in
                </a>
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
