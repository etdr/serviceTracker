import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import API_URL from "../../environment";

import { TeacherUser, TeacherAuthResponse } from '../types'

//This component is where an ADMIN would create an account

//This function displays copyright information.
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © ServiceTracker "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

type AcceptedProps = {
  sessionToken: string | null;
  updateToken: (newToken: string | null) => void;
  setUser: (user: TeacherUser | null) => void;
  // email: any;
  // firstName: string;
  // lastName: string;
  // password: any;
  // setEmail: any;
  // setPassword: any;
  // classCode?: any;
  // setClassCode?: any;
  // setFirstName?: any;
  // setLastName?: any;
  // setTeacherProfile: (e: any) => void;
  // teacherAccount: any;
};

interface AdminSignupState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

class AdminSignup extends React.Component<AcceptedProps, AdminSignupState> {
  
  constructor (props: AcceptedProps) {
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    }
  }
  
  
  //This fetch CREATES an Admin account.
  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`${API_URL}/teacheruser/signup`, {
      method: "POST",
      body: JSON.stringify({
        teacherUser: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json: TeacherAuthResponse) => {
        // if (json !== undefined) {
        //   this.props.setTeacherProfile(json); //taking information from the server and setting it to our state
        // } else {
        //   this.props.setTeacherProfile([]);
        // }
        this.props.updateToken(json.sessionToken);
        this.props.setUser(json.user)
      });
  };

  //If an Admin account is properly created with a session token the user is redirected to the proper page
  // checkForToken = () => {
  //   if (!this.props.sessionToken || this.state.firstName === undefined) {
  //     return <Redirect to="/adminsignup" />;
  //   }
  //   return <Redirect to="/admindash" />;
  // };

  render() {
    return (
      <Grid container component="main" style={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={6} md={5} lg={5} className="newLanding" />

        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div className="formPadding">
            <Typography
              className="signupTitle"
              style={{ marginTop: "100px" }}
              component="h1"
              variant="h4"
            >
              Admin Signup
            </Typography>
            <br></br>
            <form onSubmit={this.handleSubmit} noValidate>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
              
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoComplete="off"
                    autoFocus
                    onChange={(e) => {
                      this.setState({ firstName: e.target.value });
                    }}
                    defaultValue={this.state.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="off"
                    onChange={(e) => {
                      this.setState({ lastName: e.target.value });
                    }}
                    defaultValue={this.state.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="off"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    defaultValue={this.state.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    defaultValue={this.state.password}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              {/* <Link to="/teacherpin"> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#ef476f", color: "white" }}
              >
                Admin Sign Up
              </Button>
              {/* </Link> */}

              <Grid container justify="flex-end">
                <Grid
                  item
                  style={{ marginBottom: "12px" }}
                  className="smallMarginTop"
                >
                  <Link to="/">{"Already have an account? Sign in"}</Link>
                </Grid>
              </Grid>
            </form>
     
          </div>
        </Container>

        {/* <div
          style={{
            backgroundColor: "#222222",
            color: "#222222",
            position: "fixed",
            bottom: "0",
            width: "100%",
            height: "30px",
          }}
        >
          <Copyright />
        </div> */}
        {/* {this.checkForToken()} */}
      </Grid>
    );
  }
}

export default AdminSignup;
