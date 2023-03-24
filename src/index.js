import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthContextProvider } from "./firebase/AuthContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </>
    );