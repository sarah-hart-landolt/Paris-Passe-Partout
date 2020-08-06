import React, { useState } from 'react'
import { DropdownItem, Collapse, CardHeader, Card, CardImg, CardBody, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const SearchResult = ({ result, show }) => {
    const [collapse, showCollapse] = useState(false)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    return (
        <DropdownItem>
            <Card onMouseEnter={() => showCollapse(true)} onMouseLeave={() => showCollapse(false)}>
                <Link to={`/posts/${result.id}`} onClick={() => show(false)} >

                    <CardHeader className="overflow-hidden">{result.name}</CardHeader>
                </Link>s
            </Card>
        </DropdownItem>
    )
}

export default SearchResult