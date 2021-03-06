import React, { useContext, useState, useRef, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { PostContext } from "../../providers/PostProvider";
import {
  CardImg,  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import "./MyMap.css"
import { MDBBtn } from "mdbreact";
import "mapbox-gl/dist/mapbox-gl.css"



export const MyMap = () => {
    const { cuPosts, getUserPosts} = useContext(PostContext);
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);


    useEffect(() => {
        getUserPosts();
      }, []);

    const [viewport, setViewport] = useState({
        latitude: 48.8566969,
        longitude: 2.3514616,
        width: "100vw",
        height: "100vh",
        zoom: 12
      });

   const [selectedPost, setSelectedPost] = useState(null);
    return (
        <div>
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/guccigrl1123/ckden8m0u58d61ipizyo3c8ov"
            onViewportChange={viewport => {
              setViewport(viewport);
            }}
          >
            {cuPosts.map(post => (
              <Marker
                key={post.id}
                latitude={post.latitude}
                longitude={post.longitude}
              >

                <MDBBtn 
                color={post.category.color}
                gradient={post.category.color}
                  className="marker-btn"
                  onClick={e => {
                    e.preventDefault();
                    setSelectedPost(post);
                  }}
                >
                  <i class={post.category.icon} id="mapIcon" aria-hidden="true"></i>
                </MDBBtn>
              </Marker>
            ))}
    
            {selectedPost ? (
              <Popup 
                latitude={selectedPost.latitude}
                longitude={selectedPost.longitude}
                onClick={toggleModal}
                onClose={() => {
                  setSelectedPost(null);
                }}
              >
                <div>
                  <h4>{selectedPost.name}</h4>
                  <p>{selectedPost.category.name}</p>
                  <p>{(selectedPost?.hasTried === true) ? "has tried" : "want to try"} </p>
                  <p><img style={{ height: "100px", padding: 0 }}src={selectedPost.imageLocation}/></p>

                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
          <Modal
            isOpen={modal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={toggleModal}
            contentClassName="custom-modal-style-product"
          >
            <ModalHeader toggle={toggleModal}>
              {selectedPost?.name}
          </ModalHeader>
            <ModalBody>
            <CardImg top width="100%" src={selectedPost?.imageLocation} alt="Card image cap" />
            <div>{selectedPost?.website}</div>
                      <div>{selectedPost?.zipCode}</div>
                      <div>{selectedPost?.address}</div>
                      <div>{selectedPost?.content}</div>                 
            </ModalBody>
          </Modal>
        </div>
      );
}
