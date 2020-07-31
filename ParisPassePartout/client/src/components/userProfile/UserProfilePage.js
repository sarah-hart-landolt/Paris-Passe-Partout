import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./UserProfilePage.css"
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import PostList from "../posts/PostList";


export const UserProfilePage = () => {
const history = useHistory();

const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
const handleClick = () => {
    history.push(`/addPin`);
}
return (
<MDBContainer className= "pageContainer">
  <MDBRow>
    <MDBCol md="3"><img className="profilePic rounded-circle z-depth-0" src={userProfile.imageLocation}/></MDBCol>
    <MDBCol md="6">
        <div>{userProfile.displayName}</div>
        <div>{userProfile.fullName}</div> 
        <div>"I love Paris"</div></MDBCol>
  </MDBRow>
  <Button onClick={handleClick}>Add Pin</Button>
  <MDBRow>
      <PostList />
  </MDBRow>
</MDBContainer>
);
}

