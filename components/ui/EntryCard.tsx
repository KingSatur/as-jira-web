import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { DragEvent, FC, useContext } from "react";
import { Entry } from "../../interfaces";
import { UIContext } from "../../context";
import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRouter } from "next/router";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { Box } from "@mui/system";
import { getFormatDistanteToNow } from "../../utils/dateFunctions";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const { deleteEntry } = useContext(EntriesContext);

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer?.setData("id", entry._id);

    startDragging();
  };

  const router = useRouter();

  const onDragEnd = () => {
    endDragging();
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry?.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            paddingRight: 2,
          }}
        >
          <IconButton onClick={() => deleteEntry(entry?._id)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
          <IconButton onClick={() => router.push(`/entries/${entry?._id}`)}>
            <EditOutlinedIcon color="secondary" />
          </IconButton>
          <Box flex={1} />
          <Typography variant="body2">
            {getFormatDistanteToNow(new Date(entry?.createdAt).getTime())}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
