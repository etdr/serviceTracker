import React, { Component, FormEvent } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import API_URL from "../../environment";

import { StudentUser, StudentAuthResponse } from '../types'

//This component is where a STUDENT would create an account

type AcceptedProps = {
  sessionToken: string | null;
  updateToken: (newToken: string | null) => void;
  setUser: (user: StudentUser | null) => void;
  // setEmail: any;
  // setPassword: any;
  // classCode?: any;
  // setClassCode?: any;
  // setFirstName?: any;
  // setLastName?: any;
  // setIsAdminFalse: (e: any) => void;
};

interface SignupState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  classCode: string;
}



//This is the copyright function. It is not currently being shown on screen.

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © ServiceTracker "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Signup extends React.Component<AcceptedProps, SignupState> {

  constructor (props: AcceptedProps) {
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      classCode: ''
    }
  }



  //This fetch CREATES a student user. They are then linked to the correct group through the class code.
  handleSubmit (event: FormEvent) {
    event.preventDefault();
    fetch(`${API_URL}/user/signup`, {
      method: "POST",
      body: JSON.stringify({
        studentUser: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          classId: this.state.classCode
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json: StudentAuthResponse) => {
        this.props.updateToken(json.sessionToken);
        this.props.setUser(json.user)
      });
  };

  //This function checks to see if an account has been successfully created (ie student has session token)
  //It then pushes the user to the proper viewpoint
  // checkForToken = () => {
  //   if (!this.props.sessionToken || this.props.firstName === undefined) {
  //     return <Redirect to="/signup" />;
  //   }
  //   return <Redirect to="/myDashboard" />;
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
              component="h1"
              style={{ marginTop: "35px" }}
              variant="h4"
            >
              Student Sign-Up
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
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Code"
                    label="Enter Class Code "
                    type="password"
                    id="password"
                    autoComplete="off"
                    onChange={(e) => {
                      this.setState({ classCode: e.target.value });
                    }}
                    defaultValue={this.state.classCode}
                  />
                </Grid>

                <Grid item xs={12}></Grid>
              </Grid>
              {/* <Link to="/mydashboard"> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#ef476f", color: "white" }}
              >
                Sign Up
              </Button>
              {/* </Link> */}

              <Grid container justify="flex-end">
                <Grid item className="smallMarginTop">
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

export default Signup;
