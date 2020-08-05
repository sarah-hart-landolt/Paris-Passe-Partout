import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { CardColumns } from "reactstrap";
import { CollectionContext } from "../../providers/CollectionProvider";
import { useParams, useHistory } from "react-router-dom";
import PostCollection from "./PostCollection";
import {MDBContainer, MDBRow} from "mdbreact";




const PostCollectionList = () => {
const { getCollectionById } = useContext(CollectionContext)
const [oneCollection, setOneCollection] = useState();

const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
const { id } = useParams();
const collectionId= parseInt(id)

  useEffect(() => {
    getCollectionById(collectionId).then(setOneCollection);
  }, []);

  const refresh = () => {
    getCollectionById(collectionId).then(setOneCollection);

  };

  return (
    <>
       <MDBContainer className="pageContainer">
        <MDBRow>
      <section>
        <Button onClick={toggle}>Create New Collection</Button>
        <Modal isOpen={modal} fade={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>Create a new collection!</ModalHeader>
          <ModalBody>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>

        <CardColumns>
          <div>
            {oneCollection?.postCollectionList.map((pc) => {
              return <PostCollection pc={pc} post={pc.post} refresh={refresh} />;
            })}
          </div>
        </CardColumns>
      </section>
      </MDBRow>
      </MDBContainer>

    </>
  );
};

export default PostCollectionList;
