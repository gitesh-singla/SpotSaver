import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./Contexts/UserContext.jsx";
import { DateContextProvider } from "./Contexts/DateContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <DateContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DateContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
