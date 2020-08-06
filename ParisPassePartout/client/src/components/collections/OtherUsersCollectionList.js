import React from "react";
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
