import React, { Component } from "react";
import Sitebar from "../../Sitebar/Sitebar";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

type AcceptedProps = {
  setIsAdminFalse: any;
  isAdmin: any;
  sessionToken?: any;
  backArrowToggle: any;
  arrowHandler: any;
  clearToken: any;
  date: any;
  typeOfService: any;
  description: any;
  hours: any;
  status: any;
  studentUserId: any;
  setDate: (e: any) => void;
  setTypeOfService: (e: any) => void;
  setDescription: (e: any) => void;
  setHours: (e: any) => void;
  setStatus: (e: any) => void;
};
class AddServiceHours extends React.Component<AcceptedProps, {}> {
  componentDidMount() {
    this.props.arrowHandler();
    this.props.setIsAdminFalse(false);
    if (!this.props.sessionToken) {
      return <Redirect to="/" />;
    } else if (this.props.isAdmin === false) {
      return <Redirect to="/myDashboard" />;
    } else {
      return <Redirect to="/admindash" />;
    }
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/service/`, {
      method: "POST",
      body: JSON.stringify({
        service: {
          date: this.props.date,
          typeOfService: this.props.typeOfService,
          description: this.props.description,
          hours: this.props.hours,
          status: this.props.status,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Login was successful");
      } else {
        console.log("Login in failed");
      }
      return response.json();
    });
  };

  render() {
    return (
      <div>
        <Sitebar
          backArrowToggle={this.props.backArrowToggle}
          arrowHandler={this.props.arrowHandler}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}
        />
        <Container
          style={{ paddingLeft: "40px", paddingRight: "40px" }}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <div style={{ marginTop: "25px" }}>
            <Typography component="h1" variant="h5">
              Add Service
            </Typography>

            <br></br>
            <br></br>
            <form onSubmit={this.handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <form noValidate>
                    <TextField
                      id="date"
                      label="Date of Service"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12}>
                  <FormControl style={{ minWidth: 160 }}>
                    <InputLabel id="demo-simple-select-label">
                      Type of Service
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={age}
                      //   onChange={handleChange}
                    >
                      <MenuItem
                        value={"Tutoring"}
                        onClick={(e) => {
                          this.props.setTypeOfService("Tutoring");
                          console.log(this.props.typeOfService);
                        }}
                      >
                        Tutoring
                      </MenuItem>
                      <MenuItem value={"Recycling"}
                          onClick={(e) => {
                        this.props.setTypeOfService("Recycling");
                        console.log(this.props.typeOfService);
                      }}
                      
                      
                      >Recycling</MenuItem>
                      <MenuItem
                        value={"NJHS Sponsored Event"}
                      
                        onClick={(e) => {
                          this.props.setTypeOfService("NJHS Sponsored Event");
                          console.log(this.props.typeOfService);
                        }}
                      >
                        NJHS Sponsored Event
                      </MenuItem>
                      <MenuItem value={"Other"} 
                     onClick={(e) => {
                          this.props.setTypeOfService("Other");
                          console.log(this.props.typeOfService);
                        }}>
                        Other
                      </MenuItem>
                    </Select>
                  </FormControl>{" "}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="description"
                    label="Description of Service"
                    id="text"
                    onChange={(e) => {
                      this.props.setDescription(e.target.value);
                      console.log(this.props.description);
                    }}
                    defaultValue={this.props.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl style={{ minWidth: 160, marginBottom: "25px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Number of Hours
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={age}
                      //   onChange={handleChange}
                    >
                      <MenuItem value={10}>0.5</MenuItem>
                      <MenuItem value={20}>1</MenuItem>
                      <MenuItem value={30}>1.5</MenuItem>
                      <MenuItem value={30}>2</MenuItem>
                      <MenuItem value={30}>2.5</MenuItem>
                      <MenuItem value={30}>3</MenuItem>
                      <MenuItem value={30}>3.5</MenuItem>
                      <MenuItem value={30}>4</MenuItem>
                      <MenuItem value={30}>4.5</MenuItem>
                      <MenuItem value={30}>5</MenuItem>
                    </Select>
                  </FormControl>{" "}
                </Grid>
              </Grid>
              <Link to="/mydashboard">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Link>
              <Grid container justify="flex-end"></Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default AddServiceHours;
