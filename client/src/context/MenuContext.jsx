import { useState, createContext } from "react";

// Crée le contexte
export const Menu = createContext();

export default function MenuContext({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Menu.Provider value={{ isOpen, setIsOpen }}>{children}</Menu.Provider>
  );
}
