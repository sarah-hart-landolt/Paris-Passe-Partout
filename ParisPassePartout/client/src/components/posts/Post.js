import React, { useContext, useState } from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,  Modal,
    ModalHeader,
    ModalBody
  } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Post = ({post}) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);


    // const history = useHistory();
    // const handleClick = () => {
    //     history.push(`/posts/${post.id}`);
    // }    
    
    return (
        <>
            <Card onClick={toggleModal}>
                <CardImg top width="100%" src={post.imageLocation} alt="Card image cap" />
                <CardBody>
                    <CardTitle><h4>{post.name}</h4></CardTitle>
                    <CardSubtitle>Author: {post.userProfile.displayName}</CardSubtitle>
                    {(post.category.isDeleted === false) && 
                    <CardText>Category: {post.category.name}</CardText>
                    }
                    {/* <Button outline size="sm" onClick={handleClick}>Details</Button> */}
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
            </ModalBody>
          </Modal>
        </>

    )
}

export default Post