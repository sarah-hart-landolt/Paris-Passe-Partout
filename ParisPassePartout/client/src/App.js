import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from "./providers/PostProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { SubscriptionProvider } from "./providers/SubscriptionProvider";
import { CollectionProvider } from "./providers/CollectionProvider";
import { PostCollectionProvider } from "./providers/PostCollectionProvider";
import { CommentProvider } from "./providers/CommentProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <PostProvider>
            <CommentProvider>
              <CollectionProvider>
                <PostCollectionProvider>
                  <SubscriptionProvider>
                    <CategoryProvider>
                      <Header />
                      <ApplicationViews />
                    </CategoryProvider>
                  </SubscriptionProvider>
                </PostCollectionProvider>
              </CollectionProvider>
            </CommentProvider>
          </PostProvider>
        </UserProfileProvider>
      </Router>
    </div>
  );
}

export default App;
