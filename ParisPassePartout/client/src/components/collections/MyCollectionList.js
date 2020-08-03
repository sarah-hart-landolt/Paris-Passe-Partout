import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { CardColumns } from "reactstrap";
import { Collection } from "./Collection";
import AddCollection from "./AddCollection";


const MyCollectionsList = ({myCollections, refresh}) => {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
