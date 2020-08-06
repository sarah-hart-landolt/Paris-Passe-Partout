import React, { useState, useContext } from "react";
import {
  Link,
  NavLink as RRNavLink,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "../index.css";
import UPSearch from "./userProfile/UPSearch";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const [isClicked, setIsClicked]= useState("")

  return (
    <div className="navBar">
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          Paris Passe Partout
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn && (
              <>
                <NavItem >
                  <NavLink onClick={()=>setIsClicked("Home")} tag={RRNavLink} to="/">
                    {(isClicked === "Home") ? 
                    
                    <svg aria-label="Home" class="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path></svg>
                  :
                    <svg
                      aria-label="Home"
                      class="_8-yf5 "
                      fill="#262626"
                      height="22"
                      viewBox="0 0 48 48"
                      width="22"
                    >
                      <path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path>
                    </svg>
}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} onClick={()=>setIsClicked("Map")} to="/map">
                  {(isClicked === "Map") ? 
                  <svg aria-label="Find People" class="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path clip-rule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm12.2 13.8l-7 14.8c-.1.3-.4.6-.7.7l-14.8 7c-.2.1-.4.1-.6.1-.4 0-.8-.2-1.1-.4-.4-.4-.6-1.1-.3-1.7l7-14.8c.1-.3.4-.6.7-.7l14.8-7c.6-.3 1.3-.2 1.7.3.5.4.6 1.1.3 1.7zm-15 7.4l-5 10.5 10.5-5-5.5-5.5z" fill-rule="evenodd"></path></svg>
                  :
                    <svg
                      aria-label="Find People"
                      class="_8-yf5 "
                      fill="#262626"
                      height="22"
                      viewBox="0 0 48 48"
                      width="22"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>

}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <UPSearch />
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/welcome"></NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            {isLoggedIn && (
              <>
          
                <NavLink
                 onClick={()=>setIsClicked("Profile")}
                  tag={RRNavLink}
                  to={`/user/${userProfile.displayName}`}
                  aria-current="page"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  {userProfile.imageLocation ? (
                    <img
                      src={userProfile.imageLocation}
                      className="rounded-circle z-depth-0"
                      style={{ height: "35px", padding: 0 }}
                      alt=""
                    />
                  ) : (
                    <img
                      alt=""
                      src="https://www.pngitem.com/pimgs/m/24-248235_user-profile-avatar-login-account-fa-user-circle.png"
                      className="rounded-circle z-depth-0"
                      style={{ height: "35px", padding: 0 }}
                    ></img>
                  )}
                </NavLink>{" "}
             
              </>
            )}
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    to="/welcome"
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
