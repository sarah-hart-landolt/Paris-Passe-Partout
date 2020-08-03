import React, { useState } from 'react'
import { DropdownItem, CardHeader, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

const UPsearchResult = ({ result, show }) => {
    const [collapse, showCollapse] = useState(false)

    return (
        <DropdownItem>
            <Card onMouseEnter={() => showCollapse(true)} onMouseLeave={() => showCollapse(false)}>
                <Link to={`/user/other/${result.id}`} onClick={() => show(false)} >
                    <CardHeader className="overflow-hidden">{result.displayName}</CardHeader>
                </Link>
            </Card>
        </DropdownItem>
    )
}

export default UPsearchResult