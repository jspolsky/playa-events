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
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={2}>
                <FormControlLabel
                  value="camp"
                  control={<Radio color="primary" />}
                  label="Theme camp"
                />
              </Grid>
              <Grid item xs={10}>
                {locationType === "camp" ? (
                  <TextField
                    fullWidth
                    id="campLocation"
                    label="Camp name"
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
              <Grid item xs={2}>
                <FormControlLabel
                  value="art"
                  control={<Radio color="primary" />}
                  label="Artwork"
                />
              </Grid>
              <Grid item xs={10}>
                {locationType === "art" ? (
                  <TextField
                    fullWidth
                    id="artLocation"
                    label="Artwork name"
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
              <Grid item xs={2}>
                <FormControlLabel
                  value="other"
                  control={<Radio color="primary" />}
                  label="Other"
                />
              </Grid>
              <Grid item xs={10}>
                {locationType === "other" ? (
                  <TextField
                    fullWidth
                    id="otherLocation"
                    label="Detailed location"
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
            </Grid>
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};
