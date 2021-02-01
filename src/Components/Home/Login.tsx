import React, { Component, FormEvent } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import API_URL from "../../environment";
import Hidden from "@material-ui/core/Hidden";
import World from "../../Assets/undraw_the_world_is_mine_nb0e (1).svg";
import { TeacherAuthResponse, StudentAuthResponse, User } from "../types";

//This component appears on the page as soon as a user arrives to the site

//This function is not currently being called.
//It contains the copyright.

function Copyright() {
  return (
    <div>
      <Typography variant="body2" align="center"></Typography>
      <Typography variant="body2" align="center">
        {"Copyright © ServiceTracker "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

type AcceptedProps = {
  sessionToken: string | null;
  updateToken: (newToken: string | null) => void;
  setUser: (user: User) => void;
  // setEmail: any;
  // setPassword: any;
  // classCode?: any;
  // setClassCode?: any;
  // setFirstName?: any;
  // setLastName?: any;
  // collectToken: any;
  // isAdmin: any;
  // setIsAdminTrue: any;
  // setIsAdminFalse: any;
  // setTeacherProfile: (e: any) => void;
};

interface LoginState {
  email: string;
  // firstName: string;
  // lastName: string;
  password: string;
  
  redirect: string | null;
}

class Login extends React.Component<AcceptedProps, LoginState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      redirect: null,

      email: '',
      // firstName: '',
      // lastName: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitAsync = this.handleSubmitAsync.bind(this)
  }

  //Nested Fetches- This setup allows a student & a teacher to log in using the same form.
  //It takes the inputted information, determines if student or teacher, and then shows proper page
  handleSubmit (event: FormEvent) {
    event.preventDefault();
    fetch(`${API_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        studentUser: {
          // firstName: this.props.firstName,
          // lastName: this.props.lastName,
          email: this.state.email,
          password: this.state.password,
          // classId: this.props.classCode,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Login was successful");
        } else {
          console.log("Login in failed");
        }
        return response.json();
      })
      .then((json: StudentAuthResponse) => {
        // this.props.setIsAdminFalse(false);
        this.props.updateToken(json.sessionToken);
        if (this.props.sessionToken) {
          console.log("yes");
        } else {
          fetch(`${API_URL}/teacheruser/login`, {
            method: "POST",
            body: JSON.stringify({
              teacherUser: {
                email: this.state.email,
                password: this.state.password,
              },
            }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((response) => {
              if (response.status === 200) {
                console.log("Login was successful");
              } else {
                console.log("Login in failed");
              }
              return response.json();
            })
            .then((json) => {
              // this.props.setIsAdminTrue(true);

              // if (json !== undefined) {
              //   this.props.setTeacherProfile(json);
              // } else {
              //   this.props.setTeacherProfile([]);
              // }
              this.props.updateToken(json.sessionToken);
              this.props.setUser(json.teacherUser)
              this.setState({ redirect: '/teacher/dashboard' })
            });
        }
      });
  };

  async handleSubmitAsync (event: FormEvent) {
    event.preventDefault()

    try {
      const studentResponse = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify({
          studentUser: {
            email: this.state.email,
            password: this.state.password
          }
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })

      switch (studentResponse.status) {
        case 200:
          const studentJson: StudentAuthResponse = await studentResponse.json()
          this.props.updateToken(studentJson.sessionToken)
          this.props.setUser(studentJson.user)
          this.setState({ redirect: '/student/dashboard' })
          break

        case 502:
        case 500:
        default:
          const teacherResponse = await fetch(`${API_URL}/teacheruser/login`, {
            method: "POST",
            body: JSON.stringify({
              teacherUser: {
                email: this.state.email,
                password: this.state.password,
              },
            }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })

          switch (teacherResponse.status) {
            case 200:
              const teacherJson: TeacherAuthResponse = await teacherResponse.json()
              this.props.updateToken(teacherJson.sessionToken)
              this.props.setUser(teacherJson.user)
              this.setState({ redirect: '/teacher/dashboard' })
              break
            
            case 502:
            case 500:
            default:
              throw new Error('flagrant login failure')
          }
      }
    } catch (err) {
      console.log(err)
    }
  }

  //This function searches to see if the user has a session token.
  //It then checks the status of isAdmin and pushes user to the appropriate page
  // checkForToken = () => {
  //   if (!this.props.sessionToken || this.props.isAdmin === "") {
  //     return <Redirect to="/" />;
  //   } else if (this.props.isAdmin === false) {
  //     return <Redirect to="/myDashboard" />;
  //   } else {
  //     return <Redirect to="/admindash" />;
  //   }
  // };

  render() {
    if (this.state.redirect)
      return <Redirect to={this.state.redirect} />

    return (
      <Grid container component="main" style={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={6}
          md={5}
          lg={5}
          className="newLanding"
        ></Grid>

        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div className="formPadding">
            <Hidden smUp>
              <div
                style={{
                  width: "75vw",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img className="miniImage" src={World}></img>
              </div>
            </Hidden>
            <Typography
              className="marginHome signupTitle"
              style={{ marginBottom: "5px" }}
              component="h1"
              variant="h4"
            >
              ServiceTracker
            </Typography>
            <Hidden smUp>
              {" "}
              <Typography style={{ fontSize: "10px", textAlign: "center" }}>
                <p>
                  Easily tracks your hours, so you can focus on{" "}
                  <i>doing good.</i>
                </p>
              </Typography>
            </Hidden>
            <Hidden xsDown>
              {" "}
              <Typography style={{ fontSize: "13px", textAlign: "center" }}>
                {" "}
                Easily tracks your hours, so you can focus on <i>
                  doing good.
                </i>{" "}
              </Typography>
            </Hidden>

            <br></br>

            <form onSubmit={this.handleSubmitAsync} noValidate>
              <Grid container spacing={2}>
                {/* <Grid item xs={6} sm={6}></Grid>
                <Grid item xs={6} sm={6}></Grid> */}
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
              {/* <Link to="./admindash"> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#ef476f", color: "white" }}
              >
                Member Login
              </Button>
              <br></br>

              {/* </Link> */}

              <Grid container justify="flex-end">
                <Grid item className="smallMarginTop">
                  <Link to="/selectrole"> {"Need an account? Sign up"}</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        {/* 
        <div
          style={{
            // backgroundColor: "#222222",
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

export default Login;
