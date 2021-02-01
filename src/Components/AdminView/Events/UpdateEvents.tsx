import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Redirect } from "react-router-dom";
import API_URL from "../../../environment";

import { Event } from '../../types'

//This component is the EDIT EVENTS modal where event info is updated

interface AcceptedProps extends Event {
  // date: any;
  // setDate: (e: any) => void;
  // oneEvent: any;
  sessionToken: string;
  // eventInfo: any;
  // setOpen2: (e: any) => void;
  fetchEvents: () => void;
  open: boolean;
  toggle: () => void;
  // eventInfoIndex: any;
  // title: any;
  // hours: any;
  // setHours: (e: any) => void;
  // location: any;
  // setLocation: (e: any) => void;
  // description: any;
  // setTitle: (e: any) => void;
  // setDescription: (e: any) => void;
};

interface UpdateEventState {
  // eventUpdate: boolean;
  // setEventUpdate: (e: any) => void;
  date: string;
  title: string;
  description: string;
  hours: number;
  location: string;
};

class UpdateEvent extends React.Component<AcceptedProps, UpdateEventState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      date: this.props.date,
      title: this.props.title,
      description: this.props.description,
      hours: this.props.hours,
      location: this.props.location
    };
  }

  //This is fetch is called when a user clicks "SUBMIT"
  //This fetch updates the values of a specific event
  //this.props.oneEvent.id ( given value in EventSchedule.tsx)
  // is how I am able to select a specific entry
  //Notice that the values of each variable come from the variables defined
  //in EventSchedule.tsx
  //After the fetch- redirected to /adminEvent, open2 is set to false
  //this closing the modal, and fetchEvents() updates contents of table
  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`${API_URL}/events/${this.props.id}`, {
      method: "PUT",
      body: JSON.stringify({
        events: {
          date: this.props.date,
          title: this.props.title,
          description: this.props.description,
          hours: this.props.hours,
          location: this.props.location,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Event update submission was successful");
        // this.state.setEventUpdate(true);

        this.props.fetchEvents();
        this.props.toggle();
      } else {
        console.log("Event update submission failed");
      }
      return response.json();
    });
  };

  // checkForEventEntry = () => {
  //   if (this.state.eventUpdate) {
  //     return <Redirect to="/adminDash" />;
  //   }
  // };

  //This function closes the EDIT EVENTS modal
  // handleClickClose = () => {
  //   this.props.setOpen2(false);
  // };

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle id="form-dialog-title">
          <Typography
            className="adminTitle"
            component="h2"
            variant="h5"
            style={{ textAlign: "center" }}
          >
            Update Event
          </Typography>
        </DialogTitle>
        <form onSubmit={this.handleSubmit} noValidate>
          <DialogContent>
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
                    // this.props.eventInfoIndex holds this events specific information
                    //this was stored in EventSchedule.tsx when the user clicked the edit icon
                    //Notice, how I can not dig into the contents using dot notation
                    defaultValue={this.state.date}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12}>
                <FormControl style={{ minWidth: 160 }}>
                  <TextField
                    autoComplete="off"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title of Event"
                    type="text"
                    fullWidth
                    onChange={(e) => {
                      this.setState({ title: e.target.value });
                    }}
                    defaultValue={this.state.title}
                  />
                  <TextField
                    autoComplete="off"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Location"
                    type="text"
                    fullWidth
                    onChange={(e) => {
                      this.setState({ location: e.target.value });
                    }}
                    defaultValue={this.state.location}
                  />
                </FormControl>{" "}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Event Description"
                  type="text"
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                  defaultValue={this.state.description}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  style={{
                    minWidth: 160,
                    marginBottom: "25px",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Number of Hours
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => {
                      this.setState({ hours: e.target.value as number });
                    }}
                    defaultValue={this.state.hours}
                    //   value={age}
                    //   onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>{" "}
              </Grid>
            </Grid>

            <DialogActions>
              <Button
                onClick={this.props.toggle}
              >
                Cancel
              </Button>

              <Button type="submit">Submit</Button>
            </DialogActions>
            <Grid container justify="flex-end"></Grid>
          </DialogContent>{" "}
        </form>
        {/* {this.checkForEventEntry()} */}
      </Dialog>
    );
  }
}

export default UpdateEvent;
