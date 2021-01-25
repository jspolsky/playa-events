import React from "react";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { eventTypes } from "./EventDialog";

export const NameAndDescriptionEditor = ({
  title,
  setTitle,
  type,
  setType,
  description,
  setDescription,
}) => {
  return (
    <Card style={{ marginBottom: "1rem" }}>
      <CardContent>
        <TextField
          fullWidth
          autoFocus
          label="Event name"
          variant="outlined"
          size="small"
          value={title}
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></TextField>
        <FormControl
          variant="outlined"
          style={{ marginTop: "2rem" }}
          size="small"
        >
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={type}
            onChange={(x) => {
              setType(x.target.value);
            }}
            label="Type"
            style={{ minWidth: "8rem" }}
          >
            {eventTypes.map((et) => {
              return (
                <MenuItem
                  value={et.code}
                  key={et.code}
                >{`${et.emoji} ${et.full}`}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          multiline
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          style={{ marginTop: "2rem" }}
        />
      </CardContent>
    </Card>
  );
};
