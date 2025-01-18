import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";
import setUpInterceptors from "./api/setUpInterceptors";
// import { Toaster } from "./components/ui/toaster";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <App />
        <Toaster richColors />
        {/* <RouterProvider router={router} /> */}
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);

setUpInterceptors();
