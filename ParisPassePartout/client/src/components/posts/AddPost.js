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


const AddPost = () => {
  const { addPost } = useContext(PostContext);
  const [results, setResults] = useState();
  const [captionText, setCaptionText] = useState();
  const { categories, getCategories } = useContext(CategoryContext);
  const category = useRef();
  const history = useHistory();


  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */ (document.getElementById(
        "autocomplete"
      )),
      {
        types: ["establishment"],
        componentRestrictions: { country: "fr" },
        location: { lat: 48.864716, lng: 2.349014 },
        radius: "500",
      }
    );
    autocomplete.addListener("place_changed", onPlaceChanged);

    function onPlaceChanged() {
      var place = autocomplete.getPlace();
      console.log(place);
      setResults(place);
    }
  }, []);


  const submitForm = (e) => {
    const categoryId = parseInt(category.current.value);
    e.preventDefault();
    addPost({
      name: results.name,
      content: captionText,
      imageLocation: results.photos[0].getUrl({maxWidth: 12000, maxHeight: 12000}),
      categoryId: categoryId,
      longitude: results.geometry.location.lng(),
      latitude: results.geometry.location.lat(),
      address:results.formatted_address, 
      status: results.business_status,
      zipCode: results.address_components[6].long_name,
      phone: results.international_phone_number,
      website: results.website

    }).then(() => {
      history.push("/user/:userProfile")
  });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <input
          id="autocomplete"
          placeholder="Enter a place in Paris"
          type="text"
        />
        <div className="container pt-4">
          <div className="row justify-content-center">
            <Card id="googlePin" className="col-sm-12 col-lg-6">
              <CardBody>
                <Form onSubmit={submitForm}>
                  <fieldset>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <div>{results?.name}</div>
                    </FormGroup>
                    <FormGroup>
                      <Label for="address">Address</Label>
                      <div>{results?.formatted_address}</div>
                      <div>{results?.address_components[6].long_name}</div>
                      <div>{results?.business_status}</div>
                      <div>{results?.international_phone_number}</div>
                    </FormGroup>
                    <FormGroup>
                      <Label for="captionText">Write a caption</Label>
                      <Input
                        required
                        id="captionText"
                        type="textarea"
                        onChange={(e) => setCaptionText(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="website">Website</Label>
                      <div>{results?.website}</div>
                    </FormGroup>
                    <FormGroup>
                      <Label for="photo">Photo</Label>
                      <img
                        className="googlePhoto"
                        // src={((results?.photos[0].html_attributions[0]).split("\""))[2]}
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
                      <Button>Add Pin</Button>
                    </FormGroup>
                  </fieldset>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
        <div>{results?.geometry.location.lat()}</div>
        <div>{results?.geometry.location.lng()}</div>

        {/* {results?.photos.map((photo) => <img src={photo.getUrl()} />)} */}
        {/* <fieldset className="input--addEmoji">
        <select
        //   defaultValue=""
        //   ref={photo}
        //   name="emoji"
        //   id="emoji"
        //   className="form-control"
        >
          <option value="0">Select a photo</option>
          {results?.photos.map((photo) => (
            <option key={photo.getUrl} value={photo.getUrl}>
               <img src={photo.getUrl()} alt="Logo" /> 
            </option>
          ))} 
        </select>
      </fieldset> */}
      </div>
    </div>
  );
};

export default AddPost;