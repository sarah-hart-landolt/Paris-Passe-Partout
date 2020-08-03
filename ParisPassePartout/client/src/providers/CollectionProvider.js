import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CollectionContext = createContext();

export function CollectionProvider(props) {
  const apiUrl = "/api/collection/";
  const { getToken } = useContext(UserProfileContext);

  const [collections, setCollections] = useState([]);

  const getCollections = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setCollections)
    );

  const addCollection = (collection) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collection),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Unauthorized");
        })
        .then(getCollections)
    );
  };

  const getCollectionById = (id) => {
    return getToken().then((token) => 
    fetch(`/api/collection/${id}`, {
      method: "GET",
      headers: {
        Authorization:  `Bearer ${token}`
      }
    }).then((res) => res.json()))
}

  const getCollectionsByUserId = (userProfileId) => {
    return getToken().then((token) => 
     fetch(`/api/collection/pins/${userProfileId}`, {
       method: "GET",
       headers: {
         Authorization: `Bearer ${token}`
       }
     }).then((res) => res.json()));
   }
 
  const updateCollection = (collection) => {
    return getToken().then((token) =>
      fetch(apiUrl + `${collection.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collection),
      }).then(getCollections)
    );
  };
  const deleteCollection = (id) => {
    return getToken().then((token) =>
      fetch(apiUrl + `${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getCollections)
    );
  };

  return (
    <CollectionContext.Provider
      value={{ collections, getCollections, addCollection, updateCollection, deleteCollection, getCollectionsByUserId, getCollectionById }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
}