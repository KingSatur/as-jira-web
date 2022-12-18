import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "[Entries] - Add"; payload: Entry }
  | { type: "[Entries] - Update"; payload: Entry }
  | { type: "[Entries] - Refresh data"; payload: Entry[] };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entries] - Add":
      return {
        ...state,
        entries: [...state?.entries, action?.payload],
      };

    case "[Entries] - Update":
      return {
        ...state,
        entries: state?.entries?.map((entry) => {
          if (entry._id === action?.payload?._id) {
            return {
              ...entry,
              status: action?.payload?.status,
              description: action?.payload?.description,
            };
          }
          return entry;
        }),
      };
    case "[Entries] - Refresh data":
      return {
        ...state,
        entries: [...action?.payload],
      };

    default:
      return state;
  }
};
