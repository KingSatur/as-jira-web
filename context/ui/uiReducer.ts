import { UIState } from "./UIProvider";

type UIActionType =
  | { type: "Open" }
  | { type: "Close" }
  | { type: "Change Adding Entry Status"; payload: boolean }
  | { type: "Start dragging" }
  | { type: "End dragging" };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action?.type) {
    case "Open":
      return {
        ...state,
        sidemenuOpen: true,
      };
    case "Close":
      return {
        ...state,
        sidemenuOpen: false,
      };
    case "Change Adding Entry Status":
      return {
        ...state,
        isAddingEntry: action?.payload,
      };
    case "Start dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "End dragging":
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};
