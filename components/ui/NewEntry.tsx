import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";

import SaveOutlined from "@mui/icons-material/SaveOutlined";
import Add from "@mui/icons-material/Add";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context";

export const NewEntry = () => {
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");

  const [isTouched, setIsTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);

  const onSave = () => {
    if (inputValue.trim().length < 1) return;
    addNewEntry(inputValue);
    setInputValue("");
    setIsTouched(false);
    setIsAddingEntry(false);
  };

  return (
    <Box sx={{ marginBottom: 2, padding: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New entry"
            autoFocus
            multiline
            label="New entry"
            helperText={
              inputValue?.length <= 0 && isTouched && "Enter new value"
            }
            error={isTouched && inputValue?.length === 0}
            value={inputValue}
            onChange={({ target: { value } }) => setInputValue(value)}
            onBlur={() => setIsTouched(true)}
          ></TextField>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setIsAddingEntry(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onSave}
              endIcon={<SaveOutlined />}
            >
              Add new entry
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<Add />}
          onClick={() => {
            setIsTouched(false);
            setIsAddingEntry(true);
          }}
          fullWidth
          variant="outlined"
        >
          Add entry
        </Button>
      )}
    </Box>
  );
};
