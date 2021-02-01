import { Component } from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import { Event as EventType } from '../../types'


export default class Event extends Component<EventType, {}> {



  render() {
    return (
      <Accordion style={{ margin: ".5px" }} key={this.props.id} square>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >

          <Typography style={{ marginLeft: "15px" }}>
            {this.props.date}

          </Typography>
          <Typography style={{ marginLeft: "45px" }}>

            {this.props.title}
          </Typography>
          <div style={{ marginLeft: "auto" }}>

          </div>
        </AccordionSummary>
        <AccordionDetails style={{ padding: "0px 30px" }}>


          <Typography>
            <p style={{ fontSize: "12px", marginRight: "100px" }}>Location: {this.props.location} </p>
            <p style={{ fontSize: "12px" }}>Hours: {this.props.hours} </p>
          </Typography>
          <Typography>

          </Typography>
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
            <p style={{ fontSize: "12px", padding: "0px 15px" }}> {this.props.description}</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  }
}