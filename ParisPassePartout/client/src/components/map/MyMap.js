import React, { useContext, useState, useRef, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { PostContext } from "../../providers/PostProvider";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,  Modal,
  ModalHeader,
  ModalBody, Button, Form, ModalFooter,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';


export const MyMap = () => {
    const { cuPosts, getUserPosts} = useContext(PostContext);
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
                <Button outline
                  className="marker-btn"
                  onClick={e => {
                    e.preventDefault();
                    setSelectedPost(post);
                  }}
                >
                  <i class={post.category.icon} aria-hidden="true"></i>
                </Button>
              </Marker>
            ))}
    
            {selectedPost ? (
              <Popup
                latitude={selectedPost.latitude}
                longitude={selectedPost.longitude}
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
        </div>
      );
}
