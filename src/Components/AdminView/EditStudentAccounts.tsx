import React, { FormEvent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";

import API_URL from "../../environment";

import { StudentUser } from "../types";

interface AcceptedProps extends StudentUser {
  fetchTeacherData: any;

  sessionToken: string;
  
  toggle: () => void;
  open: boolean;
};

// type myState = {
//   // previousPassword: string;
 

//   // update: boolean;
//   // setUpdate: (e: any) => void;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// };

// might not be the most correct approach but it is illustrative of Partial types
type ESAState = Partial<StudentUser>

// type studentUser = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password?: string;
// };

class EditStudentAccounts extends React.Component<AcceptedProps, ESAState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      password: ''
    };
  }



  handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // const studentUser: Partial<StudentUser> = {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   email: this.state.email,
    //   password: this.state.password
    // };

    // if (this.props.password !== this.props.userId.password && this.props.password !== "") {
    //   studentUser.password = this.props.password;
    // } 
    
    // console.log(studentUser)
    fetch(`${API_URL}/user/${this.props.id}`, {
      method: "PUT",
      body: JSON.stringify({
        studentUser: this.state
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // this.state.setUpdate(true);

        this.props.fetchTeacherData();
        // this.props.setOpen(false);
      });
  };

  //WHY ISN'T THIS REDIRECT WORKING?
  // checkForUpdate = () => {
  //   if (this.state.update) {
  //     return <Redirect to="/adminDash" />;
  //   }
  //   console.log(this.state.update);
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
            Edit Student User Information
          </Typography>
        </DialogTitle>
        <form onSubmit={this.handleSubmit} noValidate>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="First Name"
              type="text"
              fullWidth
              onChange={(e) => {
                this.setState({ firstName: e.target.value });
              }}
              defaultValue={this.state.firstName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Last Name"
              type="text"
              fullWidth
              onChange={(e) => {
                this.setState({ lastName: e.target.value });
              }}
              defaultValue={this.state.lastName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              defaultValue={this.state.email}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              defaultValue={this.state.password} // empty by default
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.toggle}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
        {/* {this.checkForUpdate()} */}

      </Dialog>
    );
  }
}

export default EditStudentAccounts;
