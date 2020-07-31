import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
} from "reactstrap";
import "./Pin.css";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory } from "react-router-dom";


const AddOthersPost = ({post}) => {
  const { addPost } = useContext(PostContext);
  const [captionText, setCaptionText] = useState();
  const { categories, getCategories } = useContext(CategoryContext);
  const category = useRef();
  const history = useHistory();


  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  const submitForm = (e) => {
    const categoryId = parseInt(category.current.value);
    e.preventDefault();
    addPost({
      name: post.name,
      content: captionText,
      imageLocation: post.imageLocation,
      categoryId: categoryId,
      longitude: post.longitude,
      latitude: post.latitude,
      address: post.address, 
      status: post.status,
      zipCode: post.zipCode,
      phone: post.phone,
      website: post.website,
      originalPostId: post.id 

    }).then(() => {
      history.push("/user/:userProfile")
  });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="container pt-4">
          <div className="row justify-content-center">
            <Card id="googlePin" className="col-sm-12 col-lg-6">
              <CardBody>
                <Form onSubmit={submitForm}>
                  <fieldset>
                    <FormGroup>
                      <h3>{post.name}</h3>
                    </FormGroup>
                    <FormGroup>
                      <div><img className="googlePhoto" src={post.imageLocation} /></div>
                    </FormGroup>
                    <FormGroup>
                      <Label for="captionText">Write your own caption</Label>
                      <Input
                        required
                        id="captionText"
                        type="textarea"
                        onChange={(e) => setCaptionText(e.target.value)}
                      />
                    </FormGroup>
                     <FormGroup>
                      <fieldset className="input--addCategory">
                        <select
                          defaultValue=""
                          ref={category}
                          name="category"
                          id="category"
                          className="form-control"
                        >
                          <option value="0">Select a Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </fieldset>
                    </FormGroup>

                    <FormGroup>
                      <Button>Save {post.userProfile.displayName}'s Pin</Button>
                    </FormGroup>
                  </fieldset>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOthersPost;
