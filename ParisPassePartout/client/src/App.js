import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <div className="App">
    <Router>
      <UserProfileProvider>
          <Header />
          <ApplicationViews />
      </UserProfileProvider>
    </Router>
    </div>
  );
}

export default App;