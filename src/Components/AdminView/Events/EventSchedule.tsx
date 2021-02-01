import React, { Component } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AddEvents from "./AddEvents";
import UpdateEvent from "./UpdateEvents";
import Box from "@material-ui/core/Box";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import AdminSitebar from "../../Sitebar/AdminSitebar";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import API_URL from "../../../environment";

import EventScheduleItem from './EventScheduleItem'
import { Event, Events } from '../../types'

//This component shows the Events that are currently scheduled
//This component also has links to EDIT EVENTS & ADD EVENTS
// Delete functionality is also built in here

type AcceptedProps = {
  sessionToken: string;
  backArrowToggle: any;
  clearToken: () => void;
  setBackArrowToggle: (e: any) => void;
  // setIsAdminTrue: (e: any) => void;
};

type myState = {
  // eventInfo: any;
  // setEventInfo: (e: any) => void;
  // eventId: any;
  // setEventId: (e: any) => void;
  // date: any;
  // setDate: (e: any) => void;
  // title: any;
  // setTitle: (e: any) => void;
  // description: any;
  // setDescription: (e: any) => void;
  // location: any;
  // setLocation: (e: any) => void;
  // hours: any;
  // setHours: (e: any) => void;

  // setOpen: (e: any) => void;
  // open: any;
  // setOpen2: (e: any) => void;
  // open2: any;
  // oneEvent: any;
  // setOneEvent: (e: any) => void;
  // eventInfoIndex: any;
  // setEventInfoIndex: (e: any) => void;
  events: Events;

  addEventOpen: boolean;
};

class EventSchedule extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      // hours: "",
      // setHours: (entry) => {
      //   this.setState({ hours: entry });
      // },
      // location: "",
      // setLocation: (entry) => {
      //   this.setState({ location: entry });
      // },
      // description: "",
      // setDescription: (entry) => {
      //   this.setState({ description: entry });
      // },
      // eventInfoIndex: [],
      // setEventInfoIndex: (entry) => {
      //   this.setState({ eventInfoIndex: entry });
      // },
      // date: "",
      // setDate: (entry) => {
      //   this.setState({ date: entry });
      // },
      // title: "",
      // setTitle: (entry) => {
      //   this.setState({ title: entry });
      // },
      // oneEvent: [],
      // eventInfo: [],
      // setOneEvent: (entry) => {
      //   this.setState({ oneEvent: entry });
      // },
      // setEventInfo: (entry) => {
      //   this.setState({ eventInfo: entry });
      // },
      // eventId: 900,
      // setEventId: (entry) => {
      //   this.setState({ eventId: entry });
      // },
      // open: false,
      // setOpen: (entry) => {
      //   this.setState({ open: entry });
      // },
      // open2: false,
      // setOpen2: (entry) => {
      //   this.setState({ open2: entry });
      // },
      events: [],

      addEventOpen: false
    };

    this.toggleAddEventOpen = this.toggleAddEventOpen.bind(this)
  }

  //This function opens up ADD EVENTS modal
  toggleAddEventOpen () {
    console.log('toggling add event')
    this.setState({ addEventOpen: !this.state.addEventOpen });
  };

  // //This function opens up the UPDATE EVENTS modal
  // handleClickOpen2 = () => {
  //   this.state.setOpen2(true);
  // };

  // //This function closes the ADD EVENTS modal
  // handleClickClose = () => {
  //   this.state.setOpen(false);
  // };

  //When the component loads:
  //1. Admin is set as true. AKA If a user refreshes the page, they will be
  //redirected to admin landing
  //2. Events are fetched, so the table can be populated
  componentDidMount() {
    // this.props.setIsAdminTrue(true);
    this.fetchEvents();
  }

  //This function deletes a specific event when the user clicks trashcan
  //After deleting the event, fetchEvents() is called, to get updated info


  //This fetch is specifically used to populate the chart
  fetchEvents () {
    fetch(`${API_URL}/events`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json: Events) => {
        // console.log(json);
        this.setState({ events: json });
      });
  };

  //This fetch is called when the button is clicked and pulls info for individual event
  //Notice that it takes an argument that is specified down in the return
  //------This allow us to actually select a specific event
  //After the fetch is run, we update the state of all our variables
  //------This ensures that we have the most up-to-date info
  //------ when autopopulating our PUT form
  //-------It also makes sure that if a user only updates one detail
  //-------the rest of the items will have a value and not be blank

  // fetchEventRequests = (id: any) => {
  //   fetch(`${API_URL}/events/${id}`, {
  //     method: "GET",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: this.props.sessionToken,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       // console.log(json);
  //       // console.log(json.date);
  //       // this.state.setOneEvent(json);
  //       // this.state.setDate(this.state.eventInfoIndex.date);
  //       // this.state.setTitle(this.state.eventInfoIndex.title);
  //       // this.state.setDescription(this.state.eventInfoIndex.description);
  //       // this.state.setLocation(this.state.eventInfoIndex.location);
  //       // this.state.setHours(this.state.eventInfoIndex.hours);
  //     });
  // };

  render() {
    return (
      <div>
        {" "}

        <div></div>
        <div className="viewEvents responsiveMarginTopAdmin"  >

          <Box style={{ background: "#fafafa", padding: "0px", marginLeft: "auto" }}>
            <Typography
              className="adminTitle "
              component="h2"
              variant="h5"
              style={{ textAlign: "center", height: "50px", paddingLeft: "30px", color: "black" }}
            >
              Upcoming Events
        </Typography>

            <Box >

              <div
                style={{ width: "100%", display: "flex" }}
                className="toRight"
              >

                <Button
                  variant="contained"
                  style={{ backgroundColor: "#5390d9", color: "white", width: "150px" }}
                  onClick={this.toggleAddEventOpen} >
                  <AddBoxIcon onClick={this.toggleAddEventOpen} />
                  <h5 style={{ color: "white", marginLeft: "5px" }}>Add Event</h5>
                </Button>
              </div>
            </Box>
          </Box>
          {this.state.events.length > 0
            ? this.state.events.map((event: Event, index: number) => (
                <EventScheduleItem {...event} key={index} sessionToken={this.props.sessionToken} fetchEvents={this.fetchEvents} />
              ))
            : (
              <div style={{ marginTop: "30px" }}>
                You currently have no events scheduled.
                {/* I needed to put AddEvents here as well. Otherwise, the modal won't open unless a user has already created events */}
                <AddEvents
                  fetchEvents={this.fetchEvents}
                  open={this.state.addEventOpen}
                  // eventInfo={this.state.eventInfo}
                  toggle={this.toggleAddEventOpen}
                  sessionToken={this.props.sessionToken}
                />
              </div>
            )
          }

        </div>
      </div>
    );
  }
}

export default EventSchedule;
