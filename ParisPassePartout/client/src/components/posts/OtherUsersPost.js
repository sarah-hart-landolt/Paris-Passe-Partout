import React, { useContext, useState } from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,  Modal,
    ModalHeader,
    ModalBody, Button
  } from 'reactstrap';
import AddOthersPost from "./AddOthersPost";

const OtherUsersPost = ({post}) => {
    const [modal, setModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const toggleModal = () => setModal(!modal);
    const toggleAdd = () => setAddModal(!addModal);

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    
    return (
        <>
            <Card onClick={toggleModal}>
                <CardImg top width="100%" src={post.imageLocation} alt="Card image cap" />
                <CardBody>
                    <CardTitle><h4>{post.name}</h4></CardTitle>
                    <CardSubtitle>Author: {post.userProfile.displayName}</CardSubtitle>
                    {/* {(post.category.isDeleted === false) && 
                    <CardText>Category: {post.category.name}</CardText>
                    } */}
                </CardBody>
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
                      {(post.userProfileId !== currentUser.id) && 
                    <Button onClick={toggleAdd}>Save to my pins!</Button>
                    }
            </ModalBody>
          </Modal>

          <Modal
            isOpen={addModal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={toggleAdd}
            contentClassName="custom-modal-style-product"
          >
          <ModalHeader toggle={toggleAdd}>
              {post.name}
          </ModalHeader>
            <ModalBody>
            <AddOthersPost post={post} toggle={toggleAdd} />
            </ModalBody>
          </Modal>
        </>

    )
}

export default OtherUsersPost