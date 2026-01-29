// src/main.tsx
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CoinContextProvider from "./Context/Context.tsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider, ClerkLoading } from "@clerk/clerk-react";
import { MinimalSpinner } from "./Components/Spinner/Spinner";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={publishableKey}>
    <BrowserRouter>
      <CoinContextProvider>
        <ClerkLoading>
          <MinimalSpinner />
        </ClerkLoading>

        <App />
      </CoinContextProvider>
    </BrowserRouter>
  </ClerkProvider>,
);
