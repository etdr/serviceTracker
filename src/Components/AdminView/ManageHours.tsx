import React from "react";

import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AdminSitebar from "../Sitebar/AdminSitebar";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import API_URL from "../../environment";

import ManageHoursEntry from './ManageHoursEntry'
import { TeacherUser, Services, Service, ServiceStatus } from "../types";


type AcceptedProps = {
  sessionToken: string;
  backArrowToggle: any;
  // classCode?: any;
  teacherAccount: TeacherUser;
  // arrowHandler: any;
  clearToken: () => void;
  setBackArrowToggle: (e: any) => void;
  // setIsAdminTrue: (e: any) => void;
};

type myState = {
  statusView: ServiceStatus;
  // status?: any;
  // open: boolean;
  // itemId: any;
  serviceRequests: Services;
  // setServiceRequests: (e: any) => void;
  // setOpen: (e: any) => void;
  // update: boolean;
  // setUpdate: (e: any) => void;
};

export default class ManageHoursTable extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      statusView: "Pending",
      // status: "Pending",
      serviceRequests: [],
      // open: false
      // setServiceRequests: (e) => {
      //   this.setState({ serviceRequests: e });
      // },
      // update: false,
      // setUpdate: (e) => {
      //   this.setState({ update: e });
      // },
      // setStatusView: (e) => {
      //   this.setState({ statusView: e });
      // },

      // itemId: 100,
      // open: false,
      // setOpen: (e) => {
      //   this.setState({ open: e });
      // },
    };

    this.fetchServiceRequests = this.fetchServiceRequests.bind(this)
  }

  componentDidMount() {
    this.fetchServiceRequests();
    // this.props.setBackArrowToggle(true);
    // this.props.setIsAdminTrue(true);
  }





  
  // handleSubmit2 = (id: any) => {
  //   // id.preventDefault();

  //   fetch(`${API_URL}/service/status/${id}`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       service: {
  //         status: "Denied",
  //       },
  //     }),
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: this.props.sessionToken,
  //     }),
  //   }).then((response) => {
  //     if (response.status === 200) {
  //       console.log("Service status update submission was successful");
  //       this.fetchServiceRequests("Pending");
  //     } else {
  //       console.log("Service status update submission failed");
  //     }
  //     return response.json();
  //   });
  // };

  // handleSubmit3 = (id: any) => {
  //   // id.preventDefault();

  //   fetch(`${API_URL}/service/status/${id}`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       service: {
  //         status: "Pending",
  //       },
  //     }),
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: this.props.sessionToken,
  //     }),
  //   }).then((response) => {
  //     if (response.status === 200) {
  //       console.log("Service status update submission was successful");

  //       // currentStatus === "Approved"
  //       //   ? this.fetchServiceRequests("Approved")
  //       //   : this.fetchServiceRequests("Denied");
  //     } else {
  //       console.log("Service status update submission failed");
  //     }
  //     return response.json();
  //   });
  // };

  fetchServiceRequests (type?: ServiceStatus) {

    const url = `${API_URL}/service/status/${type || 'Pending'}`

    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json: Services) => {
        // console.log(json);
        this.setState({ serviceRequests: json });
        // console.log(this.state.serviceRequests);
      });
  };



  render() {
    return (
      <TableContainer
        // style={{ paddingLeft: "15px", paddingRight: "15px" }}
        className="manageHoursMarginTop"
        style={{  height: "100vh"}}
        // component={Paper}
      >


        <Box
          style={{
            color: "black",
            padding: "0px",
            margin: "10px",
          }}
        >
          <Box style={{ marginTop: "0px" }}>
      
        <Typography
          className="adminTitle"
          component="h2"
          variant="h5"
          style={{ textAlign: "center", marginBottom:"5px",  color: "black" }}
        >Manage Hours
        </Typography>
            <Box
              className="studentChart"
              style={{ paddingTop: "10px", textAlign: "center" }}
            >
              <FormControl style={{ width: "200px" }}>
                {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={"Pending"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    this.fetchServiceRequests(e.target.value as ServiceStatus);
                    this.setState({ statusView: e.target.value as ServiceStatus });
                  }}
                >
                  <MenuItem value={"Pending"}>Pending</MenuItem>
                  <MenuItem value={"Approved"}>Approved</MenuItem>
                  <MenuItem value={"Denied"}>Denied</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Table style={{ marginLeft: "10px" }}>
          <TableHead>
            <TableRow>
              <TableCell />

              {/* <TableCell>Name</TableCell> */}
              <TableCell></TableCell>
              <TableCell align="left"> </TableCell>
              <TableCell align="left">Description</TableCell>

              <TableCell align="center">Update Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.serviceRequests.length > 0 ? (
              this.state.serviceRequests.map((service: any, index: any) => (
                <ManageHoursEntry
                  {...service}
                  sessionToken={this.props.sessionToken}
                  statusView={this.state.statusView}
                  fetchServiceRequests={this.fetchServiceRequests} />
              ))
            ) : (
              <div></div>
            )}
          </TableBody>
        </Table>
        {/* {console.log(this.state.status)}

        {console.log(this.state.statusView)} */}
      </TableContainer>
    );
  }
}

