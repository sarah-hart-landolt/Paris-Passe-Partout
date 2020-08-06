import React, { useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const EditProfile = ({ toggle }) => {
  const { editUserProfile } = useContext(UserProfileContext);
  const [captionText, setCaptionText] = useState();
  const [displayName, setDisplayName] = useState();
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const submitEditForm = (e) => {
    e.preventDefault();
    editUserProfile({
      id: userProfile.id,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      description: captionText,
      imageLocation: userProfile.imageLocation,
      displayName: displayName ? displayName : userProfile.displayName,
      firebaseUserId: userProfile.firebaseUserId,
      email: userProfile.email,
      createDateTime: userProfile.createDateTime,
      isActivated: userProfile.isActivated
    }).then(toggle);
  };

  return (
    <Form onSubmit={submitEditForm}>
      <fieldset>
        <FormGroup>
          <Label for="captionText">Bio</Label>
          <Input
            id="captionText"
            type="textarea"
            defaultValue={userProfile.description}
            onChange={(e) => setCaptionText(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="displayName">User Name</Label>
          <Input
            required
            id="displayName"
            type="textarea"
            defaultValue={userProfile.displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button>Save Edit</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
};

export default EditProfile;
