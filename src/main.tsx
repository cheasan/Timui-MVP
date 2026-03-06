  
  import { createRoot } from "react-dom/client";
  import { TelegramProvider } from "./telegram/TelegramProvider";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <TelegramProvider>
      <App />
    </TelegramProvider>
  );
  