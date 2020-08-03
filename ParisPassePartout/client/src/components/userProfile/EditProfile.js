import React, { useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { CollectionContext } from "../../providers/CollectionProvider";


const EditProfile = () => {
    const [collectionName, setNameText] = useState();
    const {addCollection} = useContext(CollectionContext);
    



    const submitForm = (e) => {
        e.preventDefault();
    addCollection({
      name: collectionName
  })
  .then(refresh);
  toggle()
  };
   

  return (
      
    <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for="collectionName">Name Your Collection</Label>
            <Input type="text" required id="collectionName" placeholder="ex: Paris Nightlife" onChange={e => setNameText(e.target.value)}  />
         
          </FormGroup>
          <FormGroup>
          <Button color="primary">Save</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          </FormGroup>
          </Form>
        
        
  );
};

export default AddCollection;
