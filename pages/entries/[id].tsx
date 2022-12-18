import React, { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Layout } from "../../components/layout";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from "@mui/material";

import { GetServerSideProps } from "next";
import { Entry, EntryStatus } from "../../interfaces";
import mongoose from "mongoose";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { useRouter } from "next/router";

const validStatus: EntryStatus[] = ["pending", "progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry?.description || "");
  const [status, setStatus] = useState<EntryStatus>(entry?.status);
  const [isTouched, setIsTouched] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && isTouched,
    [inputValue, isTouched]
  );

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target?.value);
  };

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event?.target?.value as EntryStatus);
  };

  const router = useRouter();

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updateEntryDto: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updateEntryDto, true);
    router.push("/");
  };

  return (
    <Layout title={inputValue?.substring(0, 20) + "...."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry:${inputValue}`}
              subheader={`Created  .... ago`}
            ></CardHeader>
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 2 }}
                fullWidth
                placeholder="New entry"
                autoFocus
                multiline
                label="New Entry"
                onChange={onTextFieldChanged}
                value={inputValue}
                onBlur={() => setIsTouched(true)}
                helperText={isNotValid && "Enter a value"}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>State: {""}</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus?.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    ></FormControlLabel>
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                fullWidth
                variant="contained"
                onClick={onSave}
                disabled={inputValue?.length <= 0}
              >
                Save entry
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  if (!mongoose.isValidObjectId(id)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const entry = await dbEntries.getEntryById(id);

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
