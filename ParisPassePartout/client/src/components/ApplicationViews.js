import React, { useContext, useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginRegister from "./LoginRegister";
// import PostList from "./posts/PostList";
// import MyPostList from "./myPosts/MyPostsList";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import "../App.css";

// import TagList from "./tag/TagList";
// import { CategoryList } from "./categories/CategoryList";
// import PostDetails from "./posts/PostDetails";
import AddPost from "./posts/AddPost";
// import { UserProfileList } from "./userProfiles/UserProfileList";
import { UserProfilePage } from "./userProfile/UserProfilePage";
import { OtherUserProfilePage } from "./userProfile/OtherUserProfilePage";
import SubscriptionList from "./feed/SubscriptionList";
import PostCollectionList from "./postCollections/PostCollectionList";

export default function ApplicationViews() {
  const { isLoggedIn, isAdmin, isActivated } = useContext(UserProfileContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <div className="mainContainer">
      <main>
        <Switch>
          {/* <Route path="/" exact>
          {isLoggedIn ? <SubscriptionList /> : <Redirect to="/welcome" />}
        </Route>
        <Route path="/tags">
          {isLoggedIn ?  <TagList /> : <Redirect to="/welcome" />}
        </Route> */}

          <Route path="/feed" exact>
            {isLoggedIn ? <SubscriptionList /> : <Redirect to="/welcome" />}
          </Route>

          {/* <Route path="/myposts" exact>
          {isLoggedIn ? <MyPostList /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/posts/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/welcome" />}
        </Route> */}

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

          <Route path="/welcome">
            <LoginRegister />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register" exact>
            <Register />
          </Route>

          {/* <Route path="/categories">
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userProfiles" exact>
          {isLoggedIn && isAdmin ? <UserProfileList /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/userProfiles/list/deactivated" exact>
          {isLoggedIn && isAdmin ? <DeactivatedList/> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/reactions" exact>
          {isLoggedIn && isAdmin ? <ReactionList/> : <Redirect to="/welcome" />}
        </Route>
         */}
        </Switch>
      </main>
    </div>
  );
}
