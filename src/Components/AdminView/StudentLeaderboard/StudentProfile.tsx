import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import ServiceEntry from "./ServiceEntry";

import { StudentUser } from './types'

type StudentProfileProps = {
  sessionToken: string;
  toggleOpen: () => void;
  open: boolean;
  user: StudentUser;
  fetchUsers: () => void;
  handleTotalHours: () => void;
};

// type StudentProfileState = {

//   currentStatus: string;
// };


class StudentProfile extends React.Component<StudentProfileProps> {
  constructor(props: StudentProfileProps) {
    super(props);
    this.state = {
      currentStatus: ""
    };
  }

  componentDidMount() {
    // this.props.fetchUsers();

  }



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
            {this.props.user.firstName}{" "}
            {this.props.user.lastName}
          </Typography>
        </DialogTitle>
        <form noValidate>
          <DialogContent style={{ padding: " 0px 15px" }}>
            <TableContainer style={{ marginTop: "15px" }}>
              <Table style={{ width: "auto" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date </TableCell>
                    <TableCell>Description</TableCell>

                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.props.user.services.length > 0
                      ? this.props.user.services.sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime()).map((service: any, index: any) =>
                          <ServiceEntry service={service} sessionToken={this.props.sessionToken} />)
                      : null
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                // this.props.fetchUsers();
                this.props.toggleOpen();
                // console.log(this.props.open);
              }}
            >
              CLOSE
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default StudentProfile;
