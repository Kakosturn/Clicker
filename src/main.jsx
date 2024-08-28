import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextProvider } from "./context/MainContext.jsx";
import { BuildingProvider } from "./context/BuildingContext.jsx";
import { PopulationProvider } from "./context/PopulationContext.jsx";
import { UpgradeProvider } from "./context/UpgradeContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <BuildingProvider>
        <PopulationProvider>
          <UpgradeProvider>
            <App />
          </UpgradeProvider>
        </PopulationProvider>
      </BuildingProvider>
    </ContextProvider>
  </React.StrictMode>
);
{
  /*
   */
}
