import React, { useContext, useState, useRef, useEffect } from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,  Modal,
    ModalHeader,
    ModalBody, Button, Form, ModalFooter,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { PostCollectionContext } from "../../providers/PostCollectionProvider";




const PostCollection = ({post, refresh, pc}) => {
    const [modal, setModal] = useState(false);
    const [collectionModal, setCollectionModal] = useState(false);
    const { deletePostCollection } = useContext(PostCollectionContext)

    const [isShown, setIsShown] = useState(false);  
    const [editModal, setEditModal] = useState(false);
    const [captionText, setCaptionText] = useState();
    const { deletePost, editPost } = useContext(PostContext);
    const { categories, getCategories } = useContext(CategoryContext);
    const category = useRef();
    const toggleModal = () => setModal(!modal);
    const toggleAddModal = () => setCollectionModal(!collectionModal);

    const toggleEditModal = () => setEditModal(!editModal);



    useEffect(() => {
      getCategories();
    }, []);

    const submitEditForm = (e) => {
      const categoryId = parseInt(category.current.value);
      e.preventDefault();
      editPost({
      id: post.id,
      name: post.name,
      content: captionText? captionText : post.content,
      imageLocation: post.imageLocation,
      categoryId: categoryId? categoryId: post.categoryId,
      longitude: post.longitude,
      latitude: post.latitude,
      address: post.address, 
      status: post.status,
      zipCode: post.zipCode,
      phone: post.phone,
      website: post.website,
  
      }).then(toggleEditModal).then(refresh);
    };
    
    return (
        <>
            <Card className="pinCard" onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
                <CardImg onClick={toggleModal} className="googlePhoto" top width="100%" src={post.imageLocation} alt="Card image cap" />
                <CardBody>
                    <CardTitle><h4>{post.name}</h4></CardTitle>
                    {/* <CardSubtitle>Author: {post.userProfile.displayName}</CardSubtitle>
                    {(post.category.isDeleted === false) && 
                    <CardText>Category: {post.category.name}</CardText>
                    } */}
                </CardBody>
                {isShown && (
            <div className="pinButtons">
              <Button onClick={() =>
                window.confirm(
                  "Are you sure you wish to remove this pin?"
                ) && deletePostCollection(pc.id).then(refresh)
              }>Remove from Collection</Button>
             
            </div>
          )}
            </Card>

            <Modal
            isOpen={modal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={toggleModal}
            contentClassName="custom-modal-style-product"
          >
            <ModalHeader toggle={toggleModal}>
              {post.name}
          </ModalHeader>
            <ModalBody>
            <CardImg top width="100%" src={post.imageLocation} alt="Card image cap" />
            <div>{post.website}</div>
                      <div>{post.zipCode}</div>
                      <div>{post.address}</div>
                      <div>{post.content}</div>
                      <Button onClick={toggleEditModal}>Edit</Button>

                 
            </ModalBody>
          </Modal>
          <Modal
            isOpen={editModal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={toggleEditModal}
            contentClassName="custom-modal-style-product"
          >
            <ModalHeader toggle={toggleEditModal}>
              {post.name}
          </ModalHeader>
            <ModalBody>
            <CardImg top width="100%" src={post.imageLocation} alt="Card image cap" />
            <Form onSubmit={submitEditForm}>
                  <fieldset>
                    <FormGroup>
                      <Label for="captionText">Edit caption</Label>
                      <Input
                        required
                        id="captionText"
                        type="textarea"
                        defaultValue={post.content}
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
                      <Button>Save Edit</Button>
                    </FormGroup>
                  </fieldset>
                </Form>
            </ModalBody>
          </Modal>

       
        </>

    )
}

export default PostCollection