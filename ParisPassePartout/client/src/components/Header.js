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
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "../index.css";
import UPSearch from "./userProfile/UPSearch";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => setIsOpen(!isOpen);
  const toggle = () => setIsOpen(!isOpen);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

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
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/feed">
                    Feed
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/myposts">
                    My Posts
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
                {" "}
                <Dropdown
                  as={Link}
                  id="menuDropdown"
                  isOpen={dropdownOpen}
                  toggle={toggleDropdown}
                >
                  <DropdownToggle color="link" size="md" caret>
                    <NavLink
                      tag={RRNavLink}
                      to={`/userProfiles/${userProfile.id}`}
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
                        ></img>
                      )}
                    </NavLink>{" "}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Manage :</DropdownItem>
                    <DropdownItem>
                      <NavLink tag={RRNavLink} to={`/user/${userProfile.displayName}`}>
                        Profile
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink tag={RRNavLink} to="/editProfile">
                        Settings
                      </NavLink>
                    </DropdownItem>
                    {/* <DropdownItem>
                      <NavLink tag={RRNavLink} to="/reactions">
                        Reactions
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink tag={RRNavLink} to="/userProfiles">
                        Users
                      </NavLink>
                    </DropdownItem> */}
                  </DropdownMenu>
                </Dropdown>
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
