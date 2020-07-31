import React, {useContext, useEffect, useState} from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./UserProfilePage.css";
import { Button, CardColumns } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import OtherUsersPost from "../posts/OtherUsersPost";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import SubscribeButton from "../feed/SubscribeButton";

export const OtherUserProfilePage = () => {
  const { ouPosts, getOtherUserPosts } = useContext(PostContext);
  const { getUserProfileById } = useContext(UserProfileContext);
  const [otherUserProfile, setOUProfile] = useState(false)


  const {id} = useParams()
  const profileId = parseInt(id);


  useEffect(() => {
    getOtherUserPosts(profileId);
    // eslint-disable-next-line
  }, []);
  debugger

  useEffect(() => {
    getUserProfileById(profileId).then(setOUProfile);
    // eslint-disable-next-line
  }, []);



  return (
    <MDBContainer className="pageContainer">
      <MDBRow>
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
          <div><SubscribeButton userProfile={otherUserProfile} /></div>
        </MDBCol>
      </MDBRow>
      {/* <Button onClick={handleClick}>Add Pin</Button> */}
      <MDBRow>
        <CardColumns>
          {ouPosts.map((post) => {
            return <OtherUsersPost post={post} />;
          })}
        </CardColumns>{" "}
      </MDBRow>
    </MDBContainer>
  );
};
