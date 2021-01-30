import React from "react";
import {
  Card,
  CardContent,
  FormControl,
  Grid,
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
  url,
  setUrl,
  setDirty,
}) => {
  return (
    <Card style={{ marginBottom: "1rem" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                setDirty(true);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant="outlined" size="small">
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                value={type}
                onChange={(x) => {
                  setType(x.target.value);
                  setDirty(true);
                }}
                label="Type"
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
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <TextField
              fullWidth
              label="URL (optional)"
              variant="outlined"
              size="small"
              value={url}
              onFocus={(e) => e.currentTarget.select()}
              onChange={(e) => {
                setUrl(e.target.value);
                setDirty(true);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDirty(true);
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
