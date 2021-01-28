import React from "react";
import {
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Switch,
  TextField,
} from "@material-ui/core";

const maxCharactersForPrint = 150;

export const PrintOptionsEditor = ({
  submitForPrint,
  setSubmitForPrint,
  printDescription,
  setPrintDescription,
  description,
  setDirty,
}) => {
  return (
    <Card>
      <CardContent>
        <FormControlLabel
          control={
            <Switch
              checked={submitForPrint}
              onChange={(e) => {
                setSubmitForPrint(e.target.checked);
                setDirty(true);
              }}
              name="submitForPrint"
              color="primary"
            />
          }
          label="Submit this event to printed WhatWhereWhen guide"
        />
        <FormHelperText>
          Due to limited space, only a very small number of events can be
          printed.
        </FormHelperText>
        {submitForPrint && description.length > maxCharactersForPrint && (
          <>
            <TextField
              fullWidth
              multiline
              label={`Print description (limited to ${maxCharactersForPrint} characters)`}
              variant="outlined"
              value={printDescription}
              onChange={(e) => {
                setPrintDescription(
                  e.target.value.substr(0, maxCharactersForPrint)
                );
                setDirty(true);
              }}
              style={{ marginTop: "2rem" }}
            />
            <FormHelperText>
              For the printed guide, we need a description that is{" "}
              {maxCharactersForPrint} characters or less. You have typed{" "}
              {printDescription.length}
            </FormHelperText>
          </>
        )}
      </CardContent>
    </Card>
  );
};
