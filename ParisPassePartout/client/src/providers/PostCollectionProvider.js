import React, { createContext, useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostCollectionContext = createContext();

export function PostCollectionProvider(props) {
  const { getToken } = useContext(UserProfileContext);
  const [pCS, setPCs] = useState([]);

  const apiUrl = "/api/postcollection/";

  const getAllPCs = () => {
    getToken().then((token) =>
    fetch(apiUrl, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(setPCs))
}

 
    const addPostCollection= (pc) => {
      return getToken().then((token) =>
        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pc),
        }).then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Unauthorized");
        })
      );
    };

    const editPC = (pc) => {
     return getToken().then((token) =>
          fetch(apiUrl + `${pc.id}`, {
              method: "PUT",
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                  },
                  body: JSON.stringify(pc)
              }).then(resp => {
                  if (resp.ok)
                   {
                      return resp.json();
                  }
                  throw new Error("Unauthorized");
              }))
            }

    const deletePostCollection= (id) => {
      return getToken().then((token) =>
        fetch(apiUrl + `${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      );
    };

   

  return (
    <PostCollectionContext.Provider
      value={{
        addPostCollection,
        deletePostCollection,
        getAllPCs,
        setPCs,
        editPC,
        pCS

      }}
    >
      {props.children}
    </PostCollectionContext.Provider>
  );
}