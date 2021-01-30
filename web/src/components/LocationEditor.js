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
  setDirty,
}) => {
  const options = [
    // [codename, label for radio button, prompt for text editor]
    ["camp", "Theme camp", "Camp name"],
    ["art", "Artwork", "Artwork name"],
    ["other", "Other", "Detailed location"],
  ];

  return (
    <Card style={{ marginBottom: "1rem" }}>
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
              setDirty(true);
            }}
          >
            <Grid container spacing={0}>
              {options.map((x) => {
                return (
                  <React.Fragment key={x[0]}>
                    <Grid item xs={12} sm={4}>
                      <FormControlLabel
                        value={x[0]}
                        control={<Radio color="primary" />}
                        label={x[1]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
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
                            setDirty(true);
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
