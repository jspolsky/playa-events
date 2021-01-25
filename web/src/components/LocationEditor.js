import React from "react";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";

export const LocationEditor = ({
  location,
  setLocation,
  locationType,
  setLocationType,
}) => {
  const options = [
    ["camp", "Theme camp", "Camp name"],
    ["art", "Artwork", "Artwork name"],
    ["other", "Other", "Detailed location"],
  ];

  return (
    <Card>
      <CardContent>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Location</FormLabel>
          <RadioGroup
            aria-label="Location"
            name="locationtype"
            value={locationType}
            onChange={(e) => {
              setLocationType(e.target.value);
              setLocation("");
            }}
          >
            <Grid container spacing={0}>
              {options.map((x) => {
                return (
                  <React.Fragment key={x[0]}>
                    <Grid item xs={2}>
                      <FormControlLabel
                        value={x[0]}
                        control={<Radio color="primary" />}
                        label={x[1]}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      {locationType === x[0] ? (
                        <TextField
                          fullWidth
                          id={`${x[0]}Location`}
                          label={x[2]}
                          variant="outlined"
                          size="small"
                          value={location}
                          onChange={(e) => {
                            setLocation(e.target.value);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};
