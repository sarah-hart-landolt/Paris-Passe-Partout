import React from "react";
import { CardColumns } from "reactstrap";
import { Collection } from "./Collection";


const MyCollectionsList = ({myCollections, refresh}) => {


  return (
    <>
      <section>

        <CardColumns>
          <div>
            {myCollections?.map((collection) => {
              return <Collection collection={collection} refresh={refresh} />;
            })}
          </div>
          
        </CardColumns>
      </section>
    </>
  );
};

export default MyCollectionsList;
