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


const MyCollectionsList = ({myCollections}) => {


  return (
    <>
      <section>

        <CardColumns>
          <div>
            {myCollections.map((collection) => {
              return <Collection collection={collection}  />;
            })}
          </div>
          
        </CardColumns>
      </section>
    </>
  );
};

export default MyCollectionsList;
