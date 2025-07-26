import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import MenuContext from "./context/MenuContext.jsx";
import WindowContext from "./context/WindowContext.jsx";
import UserProvider from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <WindowContext>
        <MenuContext>
          <UserProvider>
            <App />
          </UserProvider>
        </MenuContext>
      </WindowContext>
    </AppContextProvider>
  </StrictMode>
);
