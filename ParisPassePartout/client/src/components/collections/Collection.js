import React, {useState, useContext} from "react";
import { Card, CardTitle, CardText, CardImg, CardImgOverlay, Button } from "reactstrap";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { CollectionContext } from "../../providers/CollectionProvider";


export const Collection = ({ collection, refresh }) => {
    const [isShown, setIsShown] = useState(false);  
    const { deleteCollection } = useContext(CollectionContext);


  const sarahParisArt =
    "https://images.squarespace-cdn.com/content/v1/53d8799de4b0873b56402a1e/1540136147061-15JM6O7Q1GF1LGDHW99F/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/AD32E3A6-56C2-452C-86C0-1CD7D9C94ADA.jpeg?format=1500w";
    return (
        
    <div>
      <Card className="pinCard" onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}inverse  >
                
      {collection.postCollectionList? 
       <CardImg
       className="img-fluid"
       width="100%"
       src={collection.postCollectionList[0]?.post.imageLocation}
       alt="Card image cap"
     />
     :
     <CardImg
     className="img-fluid"
     width="100%"
     src={sarahParisArt}
     alt="Card image cap"
   />

                    }
         
        <CardImgOverlay>
        {isShown && (
            <div className="pinButtons">
              <Button onClick={() =>
                window.confirm(
                  "Are you sure you wish to delete this collection?"
                ) && deleteCollection(collection.id).then(refresh)
              }>Delete</Button>
               <Button inverse tag={RRNavLink} to={`/postcollection/${collection.id}`}>View Collection</Button>
            </div>
          )}
          <CardTitle>{collection.name}</CardTitle>
          <CardText>
            <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </CardImgOverlay>
      </Card>
    </div>
  );
};
