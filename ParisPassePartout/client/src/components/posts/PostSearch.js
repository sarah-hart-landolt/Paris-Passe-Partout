import React, { useContext, useState } from 'react';
import { Form, Input, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Collapse, CardHeader, Card, CardImg, Modal } from 'reactstrap';
import { PostContext } from '../../providers/PostProvider';
import SearchResult from './SearchResult';


const PostSearch = () => {
    const { searchPosts } = useContext(PostContext)
    const [open, show] = useState(false)
    const [results, set] = useState([])
    const search = e => {
        searchPosts(e.target.value)
            .then(results => set(results))
        if (e.target.value !== '') {
            show(true)
        }
        else {
            show(false)
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Form>
                    <Input placeholder="Search..." onChange={search} onFocus={(e) => e.target.value = ""} />
                    <Dropdown nav isOpen={open} style={{ width: '0', height: '0', margin: '0' }}>
                        <DropdownMenu style={{ marginTop: '5px' }}>
                            {
                                results.length
                                    ? results.map((r) => {
                                        return <SearchResult result={r} show={show} />
                                    })
                                    : <div className="alert alert-secondary m-3" role="alert" style={{ width: '318px' }}>No results found.</div>
                            }
                        </DropdownMenu>
                    </Dropdown>
                </Form>
            </div>
        </div>
    )

}

export default PostSearch