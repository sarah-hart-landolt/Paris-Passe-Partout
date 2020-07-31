import React, { useState } from 'react'
import { DropdownItem, Collapse, CardHeader, Card, CardImg, CardBody, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const UPsearchResult = ({ result, show }) => {
    const [collapse, showCollapse] = useState(false)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    return (
        <DropdownItem>
            <Card onMouseEnter={() => showCollapse(true)} onMouseLeave={() => showCollapse(false)}>
                <Link to={`/posts/${result.id}`} onClick={() => show(false)} >

                    {/* {
                        result.imageLocation === "" || result.imageLocation === null
                            ?
                            <CardImg top />
                            :
                            <CardImg top src={result.imageLocation} alt={result.name} />
                    } */}
                    <CardHeader className="overflow-hidden">{result.displayName}</CardHeader>
                </Link>
                {/* <Collapse isOpen={collapse}>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <Link to={`/userProfiles/${userProfile.displayName}`} onClick={() => show(false)}><p className="text-left lead overflow-hidden">{result.userProfile?.displayName}</p></Link>
                            {
                                result.categoryId !== 0
                                    ?
                                    <p><Badge className="text-left ml-1 p-2 badge-secondary badge-outlined">{result.category?.name}</Badge></p>
                                    :
                                    ""
                            }
                            {

                                result.categoryId === 0
                                    ?
                                    <p><Badge className="text-left ml-1 p-2 badge-secondary badge-outlined">{result.category?.name}</Badge></p>
                                    :
                                    ""
                            }
                        </div>
                    </CardBody>
                </Collapse> */}
            </Card>
        </DropdownItem>
    )
}

export default UPsearchResult