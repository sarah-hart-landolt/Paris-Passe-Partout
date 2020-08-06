import React, { useContext, useState, useRef, useEffect } from "react";
import { Form, FormGroup, Button } from 'reactstrap';
import { CollectionContext } from "../../providers/CollectionProvider";
import { PostCollectionContext } from "../../providers/PostCollectionProvider";



const AddPostCollection = ({toggle, post, refreshrefresh}) => {
    const {addPostCollection} = useContext(PostCollectionContext)
    const { getCollectionsByUserId } = useContext(CollectionContext);
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const [myCollections, setMyCollections] = useState([]);
    const collection = useRef();

    
    useEffect(() => {
        getCollectionsByUserId(userProfile.id).then(setMyCollections);
        // eslint-disable-next-line
      }, []);

    const submitForm = (e) => {
        const collectionId = parseInt(collection.current.value);

        e.preventDefault();
    addPostCollection({
      postId: post.id,
      collectionId: collectionId
  }).then(refreshrefresh())
  toggle()
  };
   

  return (
      
    <Form onSubmit={submitForm}>
          <FormGroup>
          <fieldset className="input--addCollection">
                        <select
                          defaultValue=""
                          ref={collection}
                          name="collection"
                          id="collection"
                          className="form-control"
                        >
                          <option value="0">Select a Collection</option>
                          {myCollections.map((collection) => (
                            <option key={collection.id} value={collection.id}>
                              {collection.name}
                            </option>
                          ))}
                        </select>
                      </fieldset>
          </FormGroup>
          <FormGroup>
                      <Button>Add Pin</Button>
                    </FormGroup>
          </Form>
        
        
  );
};

export default AddPostCollection;
