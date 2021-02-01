import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Box from "@material-ui/core/Box";
import Sitebar from "../../Sitebar/Sitebar";
import Chart from "../../StudentView/StudentDashboard/StudentViewDashboard/Chart";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ViewEvents from "../ViewEvents";
import API_URL from "../../../environment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from "@material-ui/core/Hidden";

import * as T from '../../types'

type AcceptedProps = {
  user: T.StudentUser;
  sessionToken: string;

  // indexNumber: any;
  // firstName: string;
  // lastName: string;
  
  // key: any;
  backArrowToggle: any;
  arrowHandler?: any;
  setBackArrowToggle: (e: any) => void;
  clearToken: any;
  
  // setIsAdminFalse: any;
  // serviceRequests: any;
  // setServiceRequests: (e: any) => void;
  // setIndexNumber: (e: any) => void;
  // setSpecificEntry: (e: any) => void;
  // specificEntry: any;
};

interface MyDashState {
  serviceRequests: T.Services;
}

class MyDashboard extends React.Component<AcceptedProps, MyDashState> {

  constructor (props: AcceptedProps) {
    super(props)
    this.state = {
      serviceRequests: []
    }

    this.fetchServiceRequests = this.fetchServiceRequests.bind(this)
  }


  componentDidMount() {
    this.props.setBackArrowToggle(false);
    this.fetchServiceRequests();
  }


  fetchServiceRequests () {
    fetch(`${API_URL}/service`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {

        console.log(json)
        this.setState({ serviceRequests: json }); //taking information from the server and setting it to our state

      });
  };


  calcTotal (status?: T.ServiceStatus) {
    if (!status)
      return this.state.serviceRequests
        .map(s => s.hours)
        .reduce((a, h) => a + h, 0)
    return this.state.serviceRequests
      .map(s => s.status === status ? s.hours : 0)
      .reduce((a, h) => a + h, 0)
  }



  render() {
    return (
      <>
        <Sitebar
          backArrowToggle={this.props.backArrowToggle}
          // arrowHandler={this.props.arrowHandler}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}
        />
        <Grid container className="studentContainer" component="main">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              className="signupTitle marginStudentDash"
              component="h2"
              variant="h5"
            >
              Student Dashboard
            </Typography>
          </Grid>

          {/* <Grid item xs={false} sm={false} md={1} lg={1}>   </Grid> */}

          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div className="blueDiv">
              <Box className="progressCircle">
                <CircularProgressbar
                  styles={{
                    path: { stroke: "#06d6a0" },
                    text: { fill: "black" },
                  }}
                  value={(this.calcTotal('Approved') / 30) * 100}
                  text={`${this.calcTotal('Approved')}/30` }
                
                />
                <Grid container component="main">
                
                  
                  </Grid>
                  <Hidden xsDown>  <Card style={{marginTop:"20px", backgroundColor: "#fafafa"}}>
      <CardContent>
    
    
        <Typography color="textSecondary" variant="body2" component="p">
         Current Totals
          <br/><br/>
            {this.calcTotal('Approved')}  Approved 
          <br/>
            {this.calcTotal('Denied')}  Denied 
          <br/>
            {this.calcTotal('Pending')}  Pending 
          <br/>
         
        </Typography>
      </CardContent>
  
    </Card></Hidden>
                
             
              </Box>
            </div>
          </Grid>

          <Grid
            style={{ backgroundColor: "#fafafa" }}
            item
            xs={12}
            sm={6}
            md={6}
            lg={7}
          >
            <Box className="studentDash">
          
              <Box className="studentChart">
                <ViewEvents
                  setBackArrowToggle={this.props.setBackArrowToggle}
                  // setIsAdminFalse={this.props.setIsAdminFalse}
                  // isAdmin={this.props.isAdmin}
                  backArrowToggle={this.props.backArrowToggle}
                  // arrowHandler={this.arrowHandler}
                  clearToken={this.props.clearToken}
                  sessionToken={this.props.sessionToken}
                />
                <Chart
                  serviceRequests={this.state.serviceRequests}
                  fetchServiceRequests={this.fetchServiceRequests}
                  // setServiceRequests={this.props.setServiceRequests}
                  sessionToken={this.props.sessionToken}
                  // setIndexNumber={this.props.setIndexNumber}
                  // indexNumber={this.props.indexNumber}
                  // specificEntry={this.props.specificEntry}
                  // setSpecificEntry={this.props.setSpecificEntry}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

      </>
    );
  }
}

export default MyDashboard;
