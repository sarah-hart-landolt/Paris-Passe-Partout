import React, { useState, useEffect, useContext } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "./UserProfilePage.css";
import {
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Input,
  CardImg,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import PostList from "../posts/PostList";
import classnames from "classnames";
import MyCollectionsList from "../collections/MyCollectionList";
import { CollectionContext } from "../../providers/CollectionProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import EditProfile from "./EditProfile";

export const UserProfilePage = () => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [myCollections, setMyCollections] = useState([]);
  const { getCollectionsByUserId } = useContext(CollectionContext);

  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const handleClick = () => {
    history.push(`/addPin`);
  };

  const handleClick2 = () => {
    history.push(`/addcollection`);
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
      <MDBRow className="profileContainer">
        <div className="" md="3">
          <img
            className="profilePic rounded-circle z-depth-0 _4dMfM"
            src={userProfile.imageLocation}
          />
        </div>
        <div md="6" className="profileInfo">
          <div className="nameContainer">
            <h1 className="upName">{userProfile.displayName}</h1>
          </div>
          <div className="profileTitle">{userProfile.fullName}</div>
          <div>{userProfile.description}</div>
          <Button onClick={toggleModal}>Edit Profile</Button>
        </div>
      </MDBRow>

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
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>
            <svg
              class="gUZ pBj U9O kVc"
              height="20"
              width="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              aria-label=""
              role="img"
            >
              <path d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path>
            </svg>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={handleClick}>Add Pin</DropdownItem>
            <DropdownItem onClick={handleClick2}>Add Collection</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <MDBRow>
            <PostList refresh={refresh} />
          </MDBRow>
        </TabPane>
        <TabPane tabId="2">
          <MyCollectionsList myCollections={myCollections} refresh={refresh} />
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
          <CardImg
            top
            width="100%"
            src={userProfile.imageLocation}
            alt="Card image cap"
          />
          <EditProfile toggle={toggleModal} />
        </ModalBody>
      </Modal>
    </MDBContainer>
  );
};
