import { List, Paper } from "@mui/material";
import React, { DragEvent, FC, useContext, useMemo } from "react";
import { EntriesContext } from "../../context";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";
import { UIContext } from "../../context/ui/UIContext";
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesToVisualize = useMemo(
    () => entries.filter((entrie) => entrie.status === status),
    [entries]
  );

  const onDropEntry = (e: DragEvent) => {
    const id = e?.dataTransfer.getData("id");
    const entry = entries.find((ent) => ent._id === id)!;
    updateEntry({ ...entry, status });
    endDragging();
  };

  const onDragOver = (e: DragEvent) => {
    e?.preventDefault();
  };

  return (
    <div
      className={isDragging ? styles.dragging : ""}
      onDrop={onDropEntry}
      onDragOver={onDragOver}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          backgroundColor: "transparent",
          overflow: "auto",
          padding: 2,
        }}
      >
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: "all .3s" }}>
          {entriesToVisualize.map((entrie) => (
            <EntryCard key={entrie?._id} entry={entrie} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
