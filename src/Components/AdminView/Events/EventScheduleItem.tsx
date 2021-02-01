import { Component } from 'react'
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AddEvents from "./AddEvents";
import UpdateEvent from "./UpdateEvents";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";

import API_URL from "../../../environment";

import { Event } from '../../types'


interface ESIProps extends Event {
  sessionToken: string;
  fetchEvents: () => void;
}

interface ESIState {
  updateOpen: boolean;
}

export default class EventScheduleItem extends Component<ESIProps, ESIState> {
  constructor (props: ESIProps) {
    super(props)
    this.state = {
      updateOpen: false
    }
    this.toggleUpdateOpen = this.toggleUpdateOpen.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
  }

  toggleUpdateOpen () {
    this.setState({ updateOpen: !this.state.updateOpen })
  }

  async deleteEvent (id: number) {
    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      });
      const json = await response.json();
      console.log(json);


      this.props.fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };


  render() {
    return (
      <Accordion
        style={{ margin: "0px", backgroundColor: "white" }}
        square
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography style={{ marginLeft: "5px" }}>
            {this.props.date}



          </Typography>
          <Typography style={{ marginLeft: "55px" }}>

            {this.props.title} <br></br>


          </Typography>

          <div style={{ marginLeft: "auto" }}>
            {/* On this icon a few things are happening:
                  1. The modal opens. 
                  2. I'm storing the value of the index to a variable, so I can use this in UpdateEvents.tsx 
                  3. I'm sending the id of this entry to fetchEventRequests, so I can collect & store all info related to this id */}
            <EditIcon
              onClick={() => {
                this.toggleUpdateOpen()

                // this.state.setEventInfoIndex(
                //   this.state.eventInfo[index]
                // );
                // this.fetchEventRequests(
                //   this.state.eventInfo[index]?.id
                // );

              }}
            />
            {/* To get the delete icon working, I need to be able to access the id of the specific event. I do this by passing the id into the deleteEvent function as an argument.  */}
            <DeleteIcon
              onClick={() => {
                try {
                  this.deleteEvent(this.props.id);

                } catch (err) {
                  console.log(err);
                }
              }}
            />

            <div>
              <UpdateEvent
                {...this.props}
                // sessionToken={this.props.sessionToken}
                // fetchEvents={this.props.fetchEvents}
                open={this.state.updateOpen}
                toggle={this.toggleUpdateOpen}
              />
              {/* <AddEvents
                fetchEvents={this.fetchEvents}
                open={this.state.open}
                eventInfo={this.state.eventInfo}
                setOpen={this.state.setOpen}
                sessionToken={this.props.sessionToken}
              /> */}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ padding: "0px 30px" }}>
          <Typography>
            <p style={{ fontSize: "12px", marginRight: "45px" }}>
              Location: {this.props.location}

            </p>
          </Typography>
          <Typography>
            <p style={{ fontSize: "12px" }}>

              Hours:     {this.props.hours}
            </p>
          </Typography>
          {/* <Typography>
                    <p style={{ fontSize: "12px", marginLeft: "100px" }}>
                      Location:{" "}
                    </p>
                  </Typography> */}

        </AccordionDetails>
        <AccordionDetails>



        </AccordionDetails>

        <AccordionDetails style={{ padding: "0px 30px" }}>
          <Typography>
            <p style={{ fontSize: "12px" }}>Event Description:</p>
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography>
            <p style={{ fontSize: "12px", padding: "0px 15px" }}>
              {" "}
              {this.props.description}
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  }
}