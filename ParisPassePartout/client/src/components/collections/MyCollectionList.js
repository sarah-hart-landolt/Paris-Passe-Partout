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
import { Collection } from "./Collection";
import AddCollection from "./AddCollection";


const MyCollectionsList = () => {
  const { getCollectionsByUserId } = useContext(CollectionContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const [myCollections, setMyCollections] = useState([]);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    getCollectionsByUserId(userProfile.id).then(setMyCollections);
    // eslint-disable-next-line
  }, []);

  const refresh = () => {
    getCollectionsByUserId(userProfile.id).then(setMyCollections);
  };

  return (
    <>
      <section>
        <Button onClick={toggle}>Create New Collection</Button>
        <Modal isOpen={modal} fade={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>Create a new collection!</ModalHeader>
          <ModalBody>
            <AddCollection toggle={toggle} refresh={refresh} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>

        <CardColumns>
          <div>
            {myCollections.map((collection) => {
              return <Collection collection={collection} refresh={refresh} />;
            })}
          </div>
          
        </CardColumns>
      </section>
    </>
  );
};

export default MyCollectionsList;
