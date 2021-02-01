import React, { Component, FormEvent } from "react";

import Sitebar from "../../Sitebar/Sitebar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import API_URL from "../../../environment";

import { Redirect } from "react-router-dom";

import { Service, ServiceType } from '../../types'

//This component enables students to ADD service entries for approval

type AcceptedProps = {
  setBackArrowToggle: (e: any) => void;
  // setIsAdminFalse: any;
  // isAdmin: any;
  sessionToken: string;
  backArrowToggle: any;
  clearToken: () => void;
};

type myState = {
  // serviceUpdate: boolean;
  // setServiceUpdate: (e: any) => void;
  date: string;
  typeOfService: ServiceType | '';
  description: string;
  hours: number;
  // status: 
};

class AddServiceHours extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      // serviceUpdate: false,
      // setServiceUpdate: (e) => {
      //   this.setState({ serviceUpdate: e });
      // },
      date: '',
      typeOfService: '',
      description: '',
      hours: 1
    };
  }

  // ComponentDidMount: 
  //1) Keeps back arrow off of landing page sitebar 
  //2. If page refreshes, the user will be brought back to this page
  componentDidMount() {
    this.props.setBackArrowToggle(true);
    // this.props.setIsAdminFalse(false);
    // if (!this.props.sessionToken) {
    //   return <Redirect to="/" />;
    // } else if (this.props.isAdmin === false) {
    //   return <Redirect to="/myDashboard" />;
    // } else {
    //   return <Redirect to="/admindash" />;
    // }
  }

  //This submit enables a user to post a new service entry
  //In the fetch a few things are happening
  //1. Entry posts to database
  //2. serviceUpdate value is set to true- thus redirecting to /mydashboard
  //3. setting prop values back to zero
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetch(`${API_URL}/service`, {
      method: "POST",
      body: JSON.stringify({
        service: {
          date: this.state.date,
          typeOfService: this.state.typeOfService,
          description: this.state.description,
          hours: this.state.hours,
          // status: this.props.status,
          status: 'Pending'
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((response) => {
      if (response.status === 200) {
        // console.log("Service submission was successful");
        // this.state.setServiceUpdate(true);
        //set each prop to empty
        // this.props.setDate("");
        // this.props.setHours(0);
        // this.props.setTypeOfService("");
        // this.props.setDescription("");
      } else {
        console.log("Service submission failed");
      }
      return response.json();
    });
  };

  //When an entry is successful posted, the user
  //is brought back to student dashboard
  // checkForServiceEntry = () => {
  //   if (this.state.serviceUpdate) {
  //     return <Redirect to="/mydashboard" />;
  //   }
  // };

  render() {
    return (
      <div>
        <Sitebar
          backArrowToggle={this.props.backArrowToggle}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}
        />
        <Container
          style={{
            paddingLeft: "40px",
            paddingRight: "40px",
            marginTop: "100px",
          }}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <div style={{ marginTop: "25px" }}>
            <Typography component="h1" variant="h4" className="signupTitle">
              Add Service Entry
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
                      onChange={(e) => {
                        this.setState({ date: e.target.value });
                      }}
                      defaultValue={0}
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
                      onChange={(e) => {
                        this.setState({ typeOfService: e.target.value as ServiceType | '' });
                      }}
                      defaultValue={""}
                    >
                      <MenuItem value={"Tutoring"}>Tutoring</MenuItem>
                      <MenuItem value={"Recycling"}>Recycling</MenuItem>
                      <MenuItem value={"NJHS Sponsored Event"}>
                        NJHS Sponsored Event
                      </MenuItem>
                      <MenuItem value={"Volunteering"}>Volunteering</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
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
                      this.setState({ description: e.target.value });
                    }}
                    defaultValue={" "}
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
                      onChange={(e) => {
                        this.setState({ hours: e.target.value as number });
                      }}
                      defaultValue={0}
                    >
                      <MenuItem value={1}>1 hour</MenuItem>
                      <MenuItem value={2}>2 hours</MenuItem>
                      <MenuItem value={3}>3 hours</MenuItem>
                    </Select>
                  </FormControl>{" "}
                </Grid>
              </Grid>
              {/* <Link to="/mydashboard"> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#ef476f", color: "white" }}
              >
                <h3>Submit</h3>
              </Button>
              {/* </Link> */}
              <Grid container justify="flex-end"></Grid>
            </form>
          </div>
        </Container>
        {/* {console.log(this.props.typeOfService)}
        {console.log(this.props.hours)}
        {console.log(this.props.description)} */}
        {/* {this.checkForServiceEntry()} */}
      </div>
    );
  }
}

export default AddServiceHours;
