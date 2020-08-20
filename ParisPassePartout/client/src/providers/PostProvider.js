import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [cuPosts, setCUPosts] = useState([]);
    const [ouPosts, setOUPosts] = useState([]);

    
    const { getToken } = useContext(UserProfileContext);
    
    const getAllPosts = () => {
        getToken().then((token) => 
        fetch("/api/post", {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
        }).then((res) => res.json())
          .then(setPosts));
      }
      const getUserPosts = () => (
        getToken().then((token) =>
        fetch(`/api/post/myposts`, {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
          }))
            .then((res) => res.json())
            .then(setCUPosts)  
      )

      const getOtherUserPosts = (id) => (
        getToken().then((token) =>
        fetch(`/api/post/myposts/${id}`, {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
          }))
            .then((res) => res.json())
            .then(setOUPosts)  
      )

      const getPostById = (id) => (
        getToken().then((token) => 
        fetch(`/api/post/${id}`, {
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          }
        }).then((res) => res.json()))
      )

      const addPost = (post) => (
        getToken().then((token) =>
        fetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(post),
        }))
      );

      const deletePost = (id) => (
        getToken().then((token) =>
            fetch(`/api/post/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }).then(getAllPosts))
      );

      const editPost = (post) => (
        getToken().then((token) =>
            fetch(`/api/post/${post.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify(post)
                }).then(getAllPosts))
      );

      const searchPosts = (searchString) => {
        return getToken().then((token) =>
            fetch(`/api/post/search?searchString=${searchString}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()));
    };

     
    return (
    <PostContext.Provider value={{ posts, getAllPosts, getUserPosts, cuPosts, getPostById, addPost, deletePost, editPost, searchPosts, getOtherUserPosts, ouPosts}}>
        {props.children}
    </PostContext.Provider>
    );
}