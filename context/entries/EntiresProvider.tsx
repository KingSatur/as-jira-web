import React, { FC, PropsWithChildren, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces/entry";
import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
  entries: Entry[];
}

export const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      createdAt: Date.now(),
      description:
        "[Finished] Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae dolorem qui facilis laboriosam alias veritatis amet pariatur consequuntur at repellat eum deleniti cupiditate impedit explicabo, distinctio ea voluptate eveniet consectetur.",
      status: "finished",
    },
    {
      _id: uuidv4(),
      createdAt: Date.now(),
      description:
        "[pending] Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae dolorem qui facilis laboriosam alias veritatis amet pariatur consequuntur at repellat eum deleniti cupiditate impedit explicabo, distinctio ea voluptate eveniet consectetur.",

      status: "pending",
    },
    {
      _id: uuidv4(),
      createdAt: Date.now(),
      description:
        "[progress] Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae dolorem qui facilis laboriosam alias veritatis amet pariatur consequuntur at repellat eum deleniti cupiditate impedit explicabo, distinctio ea voluptate eveniet consectetur.",
      status: "progress",
    },
  ],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const entry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };
    dispatch({ type: "[Entries] - Add", payload: entry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entries] - Update", payload: entry });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
