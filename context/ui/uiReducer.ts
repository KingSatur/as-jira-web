import { UIState } from "./UIProvider";

type UIActionType = { type: "Open" } | { type: "Close" };

export const uiReducer = (state: UIState, action: UIActionType) => {
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
    default:
      return state;
  }
};
