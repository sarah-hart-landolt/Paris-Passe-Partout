import React, { useContext, useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import "../App.css";
import AddPost from "./posts/AddPost";
import { UserProfilePage } from "./userProfile/UserProfilePage";
import { OtherUserProfilePage } from "./userProfile/OtherUserProfilePage";
import SubscriptionList from "./feed/SubscriptionList";
import PostCollectionList from "./postCollections/PostCollectionList";
import {MyMap} from "./map/MyMap";
import Post from "./posts/Post";
import AddCollection from "./collections/AddCollection";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <div className="mainContainer"
    >
      <main>
        <Switch>
  

          <Route path="/" exact>
            {isLoggedIn ? <SubscriptionList /> : <Redirect to="/welcome" />}
          </Route>

          <Route path="/addPin" exact>
            {isLoggedIn ? <AddPost /> : <Redirect to="/welcome" />}
          </Route>

          <Route path="/user/:userProfile" exact>
            {isLoggedIn ? <UserProfilePage /> : <Redirect to="/welcome" />}
          </Route>

          <Route path="/user/other/:id" exact>
            {isLoggedIn ? <OtherUserProfilePage /> : <Redirect to="/welcome" />}
          </Route>

          <Route path="/postcollection/:id" exact>
            {isLoggedIn ? <PostCollectionList /> : <Redirect to="/welcome" />}
          </Route>
          <Route path="/pin" exact>
            {isLoggedIn ? <Post /> : <Redirect to="/welcome" />}
          </Route>

          <Route path="/addcollection" exact>
            {isLoggedIn ? <AddCollection /> : <Redirect to="/welcome" />}
          </Route>

          <Route path="/welcome">
            <LoginRegister />
          </Route>

          <Route path="/map">
            <MyMap/>
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register" exact>
            <Register />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
