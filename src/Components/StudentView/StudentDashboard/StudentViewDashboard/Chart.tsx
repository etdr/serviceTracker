import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import Chip from "@material-ui/core/Chip";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
// import { SettingsPowerRounded } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddBoxIcon from "@material-ui/icons/AddBox";
// import API_URL from "../../../../environment";
import Hidden from "@material-ui/core/Hidden";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
// import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
// import { faUndo } from "@fortawesome/free-solid-svg-icons";

import ChartEntry from './ChartEntry'
import { Services, Service } from '../../../types'

type AcceptedProps = {
  sessionToken: string;
  serviceRequests: Services;
  fetchServiceRequests: () => void;
};

type myState = {
  open: any;
  setOpen: (e: any) => void;
};

export default class Chart extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      // itemId: 100,
      open: false,
      setOpen: (e) => {
        this.setState({ open: e });
      },
    };
  }

  componentDidMount() {
    this.props.fetchServiceRequests();
    // console.log(this.props.serviceRequests);
  }
  

  render() {
    return (
      <TableContainer
        // style={{ paddingLeft: "15px", paddingRight: "15px" }}
        style={{marginTop:"15px"}}
        component={Paper}
      >
       
            
            <Box style={{ background: "#ef476f",color:"white", padding: "0px", width: "100%"}}>
              <Box >
                {" "}
              <h2 style={{marginLeft:"25px"}}>Service Hours </h2>
      
              <Box
            className="studentChart"
            style={{ background: "white", padding: "0px" }}
          >
           
            
            <Box className="toRight">
              
              
              {" "}
              <ButtonGroup
                style={{ background: "white" }}
                className="toRight"
                disableElevation
                variant="contained"
                aria-label="text primary button group"
              >
                
                <Link to="/addservice">
                  <Button style={{ color: "#ef476f" }}>
                    <AddBoxIcon style={{marginRight: "5px"}} /> Add Entry
                  </Button>
                </Link>
            
              </ButtonGroup>
            </Box>
          </Box>
              
              
              
          
              </Box>
            </Box>
        <Table aria-label="collapsible table">
         
          <TableHead>
         
            <TableRow >
              <TableCell />

              <IconButton size="small">
                <TableCell></TableCell>
              </IconButton>
              <TableCell>Date of Service</TableCell>
              <TableCell>Service Type</TableCell>
             <Hidden xsDown> <TableCell align="center">Hours</TableCell></Hidden>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.serviceRequests.length > 0
               ? this.props.serviceRequests.map((service: Service, index: number) =>
                   <ChartEntry
                     {...service}
                     sessionToken={this.props.sessionToken}
                     fetchServiceRequests={this.props.fetchServiceRequests}
                     open={true} />)
               : null}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
