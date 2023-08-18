import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SocketComponent from "./components/SocketComponent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          // element={<Navigate to={`documents/${uuidV4()}`} replace />}
          element={<Home />}
        />
        <Route path="/documents/:id" element={<SocketComponent />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
