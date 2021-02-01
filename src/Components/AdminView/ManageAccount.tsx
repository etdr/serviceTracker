import { Component } from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import API_URL from "../../environment";
import EditStudentAccounts from './EditStudentAccounts'
import { StudentUser } from '../types';

interface ManageAccountProps extends StudentUser {
  sessionToken: string;
  fetchTeacherData: () => void;
  setBackArrowToggle: any;
}

interface ManageAccountState {
  editOpen: boolean;
}

export default class ManageAccount extends Component<ManageAccountProps, ManageAccountState> {
  constructor (props: ManageAccountProps) {
    super(props)
    this.state = {
      editOpen: false
    }
    this.deleteEntry = this.deleteEntry.bind(this)
  }


  toggleEditOpen () {
    this.setState({ editOpen: !this.state.editOpen })
  }

  //This function takes the argument id which is passed into the deleteEntryAsync2 function on line 140. The argument being passed into this function is the id associated with user name

  async deleteEntry () {
    try {
      const response = await fetch(`${API_URL}/user/${this.props.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      });
      const json = await response.json();
      console.log(json);

      this.props.setBackArrowToggle(true);
      this.props.fetchTeacherData();
    } catch (err) {
      console.log(err);
    }
  };
  


  render () {
    return (
      <Box style={{ padding: "0px" }} width="auto" className="manageAccountMarginLeft" key={this.props.id}>
        <List style={{ padding: "3px" }} component="nav" aria-label="main mailbox folders"></List>
        <ListItem style={{ backgroundColor: "white" }} className="accountRows" button>


          <ListItemText style={{ padding: "0px" }}>
            <h4 style={{ display: "inline" }}>
              {" "}
              {this.props.firstName +
                " " +
                this.props.lastName}{" "}
            </h4>
            <div style={{ display: "inline" }}>
              {" "}


            </div>{" "}
            {" "}
            <br></br>
            {this.props.email}

          </ListItemText>

          <div style={{ padding: "0px" }}>
            <EditStudentAccounts
              {...this.props}
              fetchTeacherData={this.props.fetchTeacherData}
              open={this.state.editOpen}
              toggle={this.toggleEditOpen}
              sessionToken={this.props.sessionToken}
            />
          </div>

          <EditIcon

            onClick={this.toggleEditOpen}
          />
          <DeleteIcon
            style={{ marginRight: "0px" }}
            onClick={this.deleteEntry}
          />

        </ListItem>
      </Box>
    )
  }
}