import { Component } from 'react'

// import Box from "@material-ui/core/Box";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import AdminSitebar from "../Sitebar/AdminSitebar";
import Button from "@material-ui/core/Button";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import Typography from "@material-ui/core/Typography";
import API_URL from "../../environment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

import { Service, ServiceStatus } from '../types';


interface MHEProps extends Service {
  sessionToken: string;
  statusView: ServiceStatus;
  fetchServiceRequests: (type?: ServiceStatus) => void;
}

interface MHEState {
  // statusView: ServiceStatus;
}

export default class ManageHoursEntry extends Component<MHEProps, MHEState> {

  constructor (props: MHEProps) {
    super(props)
    this.state = {
      // statusView: 'Approved'
    }
  }

  async handleSubmit (newStatus: ServiceStatus) {
    // id.preventDefault();

    const response = await fetch(`${API_URL}/service/status/${this.props.id}`, {
      method: "PUT",
      body: JSON.stringify({
        service: {
          status: newStatus,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })

    if (response.status === 200) {
        console.log("Service status update submission was successful");
        // this.state.setUpdate(true);
        this.props.fetchServiceRequests(this.props.statusView);
    } else {
        console.log("Service status update submission failed");
    }
    return response.json();
    
  };


  renderUpdateButtons () {

    const swatches = {
      approve: {
        status: 'Approved',
        style: {
          backgroundColor: "#06d6a0",
          marginTop: "5px",
          color: "white",
          marginBottom: "5px"
        },
        icon: faCheckSquare
      },
      deny: {
        status: 'Denied',
        style: {
          backgroundColor: "#ef476f",
          height: "40px",
          color: "white"
        },
        icon: faTimesCircle
      },
      pend: {
        status: 'Pending',
        style: {
          backgroundColor: "#ffd166",
          marginRight: "20px",
          marginLeft: "10px",
          width: "80px",
          height: "40px",
        },
        icon: faUndo
      }
    }

    const makeButton = (swatch: any) => (
      <Button
        className="buttonMargin"
        style={swatch.style}
        variant="contained"
        onClick={() => { this.handleSubmit(swatch.status); }} >
        <FontAwesomeIcon
          style={{ fontSize: "20px" }}
          icon={swatch.icon} />
      </Button>
    )

    switch (this.props.status) {
      case 'Pending':
        return [ makeButton(swatches.approve), makeButton(swatches.deny) ]
      case 'Approved':
        return [ makeButton(swatches.pend), makeButton(swatches.deny) ]
      case 'Denied':
        return [ makeButton(swatches.pend), makeButton(swatches.approve) ]

    }
  }


  render() {
    return (
      <>
        <TableRow
          style={{
            height: "45px",
            marginRight: "3px",
            marginLeft: "3px",
          }}
        >
          <TableCell
            align="left"
            style={{ marginLeft: "50px" }}
          ></TableCell>

          <TableCell></TableCell>

          <TableCell align="left" style={{ fontSize: "11px", width: "100px" }}>
            {this.props.hours}
            {" hour(s) "} <br></br> {"on "}{this.props.date}{" "}
            <br></br>
            <br></br>
          </TableCell>
          <TableCell style={{ fontSize: "12px" }}>
            {" "}
            <h4 style={{ marginRight: "0px" }}>
              {
                this.props.studentUser?.firstName
              }{" "}
              {
                this.props.studentUser?.lastName
              }
              {""}{" "}
            </h4>{" "}
            {this.props.description}
          </TableCell>
          
          <TableCell align="center" className="tableWidth">
            {this.renderUpdateButtons()}
          </TableCell>
        
        </TableRow>
        <TableRow></TableRow>
      </>
    )
  }
}