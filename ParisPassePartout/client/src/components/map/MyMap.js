import React, { useContext, useState, useRef, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { PostContext } from "../../providers/PostProvider";


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
        zoom: 10
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
                <button
                  className="marker-btn"
                  onClick={e => {
                    e.preventDefault();
                    setSelectedPost(post);
                  }}
                >
                  <img src="/skateboarding.svg" alt="Skate Park Icon" />
                </button>
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
                  <h2>{selectedPost.name}</h2>
                  <p>{selectedPost.category.name}</p>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
        </div>
      );
}
