import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import UserContextProvider from "./UserContext";
// import {disableReactDevTools} from '@fvilers/disable-react-devtools';

// if (process.env.NODE_ENV === 'productiond') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
