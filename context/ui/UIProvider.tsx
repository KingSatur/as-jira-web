import React, { FC, PropsWithChildren, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
}

export const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openDrawer = () => {
    dispatch({ type: "Open" });
  };

  const closeDrawer = () => {
    dispatch({ type: "Close" });
  };

  return (
    <UIContext.Provider value={{ ...state, openDrawer, closeDrawer }}>
      {children}
    </UIContext.Provider>
  );
};
