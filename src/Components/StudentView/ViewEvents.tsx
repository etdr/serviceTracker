import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Sitebar from '../Sitebar/Sitebar';
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import API_URL from "../../environment";

import Event from './StudentDashboard/Event'
import { Event as EventType, Events } from '../types'


type AcceptedProps = {   
 
  // setIsAdminFalse: any;
  // isAdmin:any;
  sessionToken: string;
  backArrowToggle: any;
  // arrowHandler: any;
  clearToken: any;
  setBackArrowToggle: (e: any) => void;
};

type myState = {
  eventsInfo: Events;
  // setEventInfo: (e: any) => void;
};

class ViewEvents extends React.Component  <AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      eventsInfo: [],
      // setEventInfo: (entry) => {
      //   this.setState({ eventsInfo: entry });
      // },
    };
  }

  componentDidMount(){
    this.props.setBackArrowToggle(true);
    this.fetchService();
    // this.props.setIsAdminFalse(false);
    // if (!this.props.sessionToken) {
    //   return <Redirect to="/" />;
    // } else if (this.props.isAdmin === false) {
    //   return <Redirect to="/myDashboard" />;
    // } else {
    //   return <Redirect to="/admindash" />;
    // }
  }

  fetchService = () => {
    fetch(`${API_URL}/events/studentview`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ eventsInfo: json });
      });
  };

  
    render() { 
        return (   <div>
          {" "}
          {/* <Sitebar
            backArrowToggle={this.props.backArrowToggle}
            // arrowHandler={this.props.arrowHandler}
            clearToken={this.props.clearToken}
            sessionToken={this.props.sessionToken}
          />{" "} */}
          {/* <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            Upcoming Service Opportunities
          </h2> */}
         
          <div className="viewEvents">
            
            <Box style={{ background: "#5390d9", color:"white", padding: "0px", width: "100%" }}>
              <Box >
                {" "}
              <h2 style={{marginLeft:"25px"}}>Upcoming Events</h2>
                {/* <ButtonGroup
                  style={{ color: "black" }}
                  className="toRight"
                  disableElevation
                  variant="contained"
                  aria-label="text primary button group"
                >
                  <Link to="/addevents">
                    <Button style={{ color: "black", marginLeft: "60px" }}>
                     
                    </Button>
                  </Link>
                </ButtonGroup> */}
              </Box>
            </Box>
            {this.state.eventsInfo.length > 0 ? (
              this.state.eventsInfo.map((event: EventType, index: number) => (
                // https://kevinyckim33.medium.com/jsx-spread-operator-component-props-meaning-3c9bcadd2493
                <Event {...event} />
              ))
            ) : (
              <div style={{marginTop: "30px"}}> There are no upcoming events. </div>
            )}
          </div>
        </div>
      );
    }
  }
 
export default ViewEvents;