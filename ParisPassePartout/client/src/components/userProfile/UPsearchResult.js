import React, { useState } from 'react'
import { DropdownItem, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./UserProfilePage.css";


const UPsearchResult = ({ result, show }) => {
    const [collapse, showCollapse] = useState(false)

    return (
   
        <DropdownItem>
            <ListGroup onMouseEnter={() => showCollapse(true)} onMouseLeave={() => showCollapse(false)}>
            <Link to={`/user/other/${result.id}`} onClick={() => show(false)} >

                <ListGroupItem className="overflow-hidden">
                <img
            className="rounded-circle z-depth-0 _4dMfM"
            style={{ height: "35px", padding: 0 }}
            src={result.imageLocation}
          />
                {result.displayName}
                </ListGroupItem>
                </Link>

            </ListGroup>

        </DropdownItem>
    )
}

export default UPsearchResult