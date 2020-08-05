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


const OtherUsersCollectionsList = ({collections}) => {


  return (
    <>
      <section>

        <CardColumns>
          <div>
            {collections?.map((collection) => {
              return <Collection collection={collection}  />;
            })}
          </div>
          
        </CardColumns>
      </section>
    </>
  );
};

export default OtherUsersCollectionsList;
