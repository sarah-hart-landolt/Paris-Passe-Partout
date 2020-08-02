import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./UserProfilePage.css";
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useHistory } from "react-router-dom";
import PostList from "../posts/PostList";
import classnames from "classnames";
import MyCollectionsList from "../collections/MyCollectionList";

export const UserProfilePage = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const handleClick = () => {
    history.push(`/addPin`);
  };
  return (
    <MDBContainer className="pageContainer">
      <MDBRow>
        <MDBCol md="3">
          <img
            className="profilePic rounded-circle z-depth-0"
            src={userProfile.imageLocation}
          />
        </MDBCol>
        <MDBCol md="6">
          <div>{userProfile.displayName}</div>
          <div>{userProfile.fullName}</div>
          <div>"I love Paris"</div>
        </MDBCol>
      </MDBRow>
      <Button onClick={handleClick}>Add Pin</Button>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            My Pins
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            My Collections
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <MDBRow>
            <PostList />
          </MDBRow>
        </TabPane>
        <TabPane tabId="2">
          <MyCollectionsList/>
        </TabPane>
      </TabContent>
    </MDBContainer>
  );
};
