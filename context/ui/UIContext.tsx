import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const UIContext = createContext({} as ContextProps);
