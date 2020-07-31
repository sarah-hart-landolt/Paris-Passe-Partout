import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from './providers/PostProvider';
import AddPost from './components/posts/AddPost';
import { CategoryProvider } from './providers/CategoryProvider';
import { SubscriptionProvider } from './providers/SubscriptionProvider';

function App() {
  
  return (
    <div className="App">
    <Router>
      <UserProfileProvider>
        <PostProvider>
          <SubscriptionProvider>
          <CategoryProvider>
          <Header />
          {/* <AddPost /> */}
          <ApplicationViews />
          </CategoryProvider>
          </SubscriptionProvider>
          </PostProvider>
      </UserProfileProvider>
    </Router>
    </div>
  );
}

export default App;