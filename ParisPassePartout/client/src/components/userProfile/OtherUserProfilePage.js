import React, {useContext, useEffect, useState} from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./UserProfilePage.css";
import { CardColumns, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import OtherUsersPost from "../posts/OtherUsersPost";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import SubscribeButton from "../feed/SubscribeButton";
import OtherUsersCollectionsList from "../collections/OtherUsersCollectionList";
import classnames from "classnames";
import {CollectionContext} from "../../providers/CollectionProvider";



export const OtherUserProfilePage = () => {
  const { ouPosts, getOtherUserPosts } = useContext(PostContext);
  const { getUserProfileById } = useContext(UserProfileContext);
  const { getCollectionsByUserId } = useContext(CollectionContext);
  const [otherUserProfile, setOUProfile] = useState(false)
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [collections, setCollections] = useState([]);

  const {id} = useParams()
  const profileId = parseInt(id);


  useEffect(() => {
    getOtherUserPosts(profileId);
    // eslint-disable-next-line
  }, [profileId]);
  
  useEffect(() => {
    getCollectionsByUserId(profileId).then(setCollections);
    // eslint-disable-next-line
  }, [profileId]);

  useEffect(() => {
    getUserProfileById(profileId).then(setOUProfile);
    // eslint-disable-next-line
  }, [profileId]);





  return (
    <MDBContainer className="pageContainer">
        <MDBRow className="profileContainer" >

<div className="" md="3">
  <img
    className="profilePic rounded-circle z-depth-0 _4dMfM"
    src={otherUserProfile.imageLocation}
  />
</div>
<div md="6" className="profileInfo">
  <div className="nameContainer"><h1 className="upName">{otherUserProfile.displayName}</h1>
</div>
  <div className="profileTitle">{otherUserProfile.fullName}</div>
  <div>{otherUserProfile.description}</div>
  <div>"I love Paris"</div>
          {otherUserProfile.id && 
           <div><SubscribeButton userProfile={otherUserProfile} /></div>
          }
</div>

</MDBRow>
      {/* <MDBRow>
        <MDBCol md="3">
          <img
            className="profilePic rounded-circle z-depth-0"
            src={otherUserProfile.imageLocation}
          />
        </MDBCol>
        <MDBCol md="6">
          <div>{otherUserProfile.displayName}</div>
          <div>{otherUserProfile.fullName}</div>
          <div>"I love Paris"</div>
          {otherUserProfile.id && 
           <div><SubscribeButton userProfile={otherUserProfile} /></div>
          }
        </MDBCol>
      </MDBRow> */}
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            {otherUserProfile.firstName}'s Pins
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            {otherUserProfile.firstName}'s Collections
          </NavLink>
        </NavItem>
      </Nav>
     
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <MDBRow>
        <CardColumns>
          {ouPosts.map((post) => {
            return <OtherUsersPost post={post} />;
          })}
        </CardColumns>{" "}
      </MDBRow>
        </TabPane>
        <TabPane tabId="2">
          <OtherUsersCollectionsList collections={collections} />
        </TabPane>
      </TabContent>
      
    </MDBContainer>
  );
};
