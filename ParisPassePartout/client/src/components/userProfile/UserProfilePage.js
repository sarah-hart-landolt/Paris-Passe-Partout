import React, { useState, useEffect, useContext } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./UserProfilePage.css";
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Form, FormGroup, Modal, ModalBody, ModalHeader, Label, Input, CardImg } from "reactstrap";
import { useHistory } from "react-router-dom";
import PostList from "../posts/PostList";
import classnames from "classnames";
import MyCollectionsList from "../collections/MyCollectionList";
import {CollectionContext} from "../../providers/CollectionProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import EditProfile from "./EditProfile";

export const UserProfilePage = () => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [myCollections, setMyCollections] = useState([]);
  const { getCollectionsByUserId } = useContext(CollectionContext);
  const { editUserProfile } = useContext(UserProfileContext);

  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const handleClick = () => {
    history.push(`/addPin`);
  };

  useEffect(() => {
    getCollectionsByUserId(userProfile.id).then(setMyCollections);
    // eslint-disable-next-line
  }, []);


  const refresh = () => {
    getCollectionsByUserId(userProfile.id).then(setMyCollections);
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
          <div>{userProfile.description}</div>
        </MDBCol>
      </MDBRow>
      <Button onClick={toggleModal}>Edit Profile</Button>
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
            <PostList refresh={refresh}/>
          </MDBRow>
        </TabPane>
        <TabPane tabId="2">
          <MyCollectionsList myCollections={myCollections} refresh={refresh}/>
        </TabPane>
      </TabContent>
      <Modal
            isOpen={modal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={toggleModal}
            contentClassName="custom-modal-style-product"
          >
            <ModalHeader toggle={toggleModal}>
              {userProfile.displayName}
          </ModalHeader>
            <ModalBody>
            <CardImg top width="100%" src={userProfile.imageLocation} alt="Card image cap" />
            <EditProfile toggle={toggleModal}/>
            </ModalBody>
          </Modal>
    </MDBContainer>

    
  );
};
