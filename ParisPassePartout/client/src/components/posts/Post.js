import React, { useContext, useState, useEffect } from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,  Modal,
    ModalHeader,
    ModalBody, Button, ModalFooter,
  } from 'reactstrap';
import "./Pin.css";
import { useParams, useHistory } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import AddPostCollection from "../postCollections/AddPostCollection";




const Post = ({post, rp, refresh}) => {
    const [modal, setModal] = useState(false);
    const [collectionModal, setCollectionModal] = useState(false);
    const history = useHistory();
    const [isShown, setIsShown] = useState(false);  
    const { deletePost, editPost } = useContext(PostContext);
    

    const toggleAddModal = () => setCollectionModal(!collectionModal);


    const postDetails= () => {
      history.push(`/pins/${post.id}`);
    }

    
    return (
        <>
            <Card className="pinCard" onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
                <CardImg onClick={postDetails} className="googlePhoto" top width="100%" src={post.imageLocation} alt="Card image cap" />
                <CardBody>
                    <CardTitle><h4>{post.name}</h4></CardTitle>
                    <CardSubtitle>Author: {post.userProfile.displayName}</CardSubtitle>

                    {(post.category.isDeleted === false) && 
                    <CardText>Category: {post.category.name}</CardText>
                    }
                </CardBody>
                {isShown && (
            <div className="pinButtons">
              <Button onClick={() =>
                window.confirm(
                  "Are you sure you wish to delete this pin?"
                ) && deletePost(post.id).then(rp)
              }>Delete</Button>
               <Button onClick={toggleAddModal
              }>Add to Collection</Button>
            </div>
          )}
            </Card>
            <Modal isOpen={collectionModal} fade={false} toggle={toggleAddModal}>
          <ModalHeader toggle={toggleAddModal}>Create a new collection!</ModalHeader>
          <ModalBody>
            <AddPostCollection post={post} toggle={toggleAddModal} refresh={rp} refreshrefresh={refresh}/>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
         
        </>

    )
}

export default Post