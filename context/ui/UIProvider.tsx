import React, { FC, PropsWithChildren, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

export const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openDrawer = () => {
    dispatch({ type: "Open" });
  };

  const closeDrawer = () => {
    dispatch({ type: "Close" });
  };

  const setIsAddingEntry = (value: boolean) => {
    dispatch({ type: "Change Adding Entry Status", payload: value });
  };

  const startDragging = () => {
    dispatch({ type: "Start dragging" });
  };

  const endDragging = () => {
    dispatch({ type: "End dragging" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openDrawer,
        closeDrawer,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
