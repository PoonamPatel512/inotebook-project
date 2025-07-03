import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import NoteState from "./context/notes/NoteState";
import AlertProvider from "./context/alert/AlertContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AlertProvider>
      <NoteState>
        <App />
      </NoteState>
    </AlertProvider>
  </StrictMode>
);
