import React from "react";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AdminSitebar from "../Sitebar/AdminSitebar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";


import API_URL from "../../environment";

import { TeacherUser, StudentUsers, StudentUser } from '../types'
import ManageAccount from "./ManageAccount";

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

type MyState = {
  // firstName: string;
  // lastName: string;
  // email: string;
  // password: string;
  // setFirstName: (e: any) => void;
  // setLastName: (e: any) => void;
  // setEmail: (e: any) => void;
  // setPassword: (e: any) => void;
  studentAccounts: StudentUsers;
  // setStudentAccounts: (e: any) => void;
  // userId: any;
  // setUserId: (e: any) => void;
  // setOpen: (e: any) => void;
  open: boolean;
  // oneStudent: any;
  // setOneStudent: (e: any) => void;
};

class ManageAccounts extends React.Component<AcceptedProps, MyState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      // oneStudent: [],
      // setOneStudent: (entry) => {
      //   this.setState({ oneStudent: entry });
      // },
      // firstName: "",
      // lastName: "",
      // email: "",
      // password: "",
      // setFirstName: (entry) => {
      //   this.setState({ firstName: entry });
      // },
      // setLastName: (entry) => {
      //   this.setState({ lastName: entry });
      // },
      // setEmail: (entry) => {
      //   this.setState({ email: entry });
      // },
      // setPassword: (entry) => {
      //   this.setState({ password: entry });
      // },

      // userId: 800,
      // setUserId: (entry) => {
      //   this.setState({ userId: entry });
      // },
      open: false,
      // setOpen: (entry) => {
      //   this.setState({ open: entry });
      // },

      studentAccounts: [],
      // setStudentAccounts: (entry) => {
      //   this.setState({ studentAccounts: entry });
      // },
    };

    this.fetchTeacherData = this.fetchTeacherData.bind(this)
  }

  // handleClickOpen () {
  //   this.setState({ open: true });
  // };

  // handleClickClose = () => {
  //   this.state.setOpen(false);
  // };

  componentDidMount() {
    // this.props.arrowHandler();
    // this.props.setBackArrowToggle(true);
    // this.props.setIsAdminTrue(true);

    this.fetchTeacherData();
  }


  //This fetch gets all information linked to the classId that is logged in. I then took the list of students and set it to the variable studentData. This is the variable I will use to map over the page.
  fetchTeacherData () {
    fetch(`${API_URL}/user/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json: StudentUsers) => {
        // console.log(json);
        // console.log(json.classId);
        this.setState({ studentAccounts: json });
        // console.log(this.state.studentAccounts);
      });
  };

  // fetchSpecificStudent = (id: any) => {
  //   fetch(`${API_URL}/user/${id}`, {
  //     method: "GET",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: this.props.sessionToken,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log(json);
  //       console.log(json.date);
  //       this.state.setOneStudent(json);
  //       this.state.setFirstName(this.state.userId.firstName);
  //       this.state.setLastName(this.state.userId.lastName);
  //       this.state.setEmail(this.state.userId.email);
  //       this.state.setPassword(this.state.userId.password);
  //     });
  // };



  render() {
    return (
      <Box>
 

        <Container
          maxWidth="lg"
          style={{ height: "100vh", paddingLeft:"0"}}
          className="studentAccounts manageAccountMarginTop"
        >
          {" "}
          <Typography
            className="adminTitle "
            component="h2"
            variant="h5"
            style={{
              textAlign: "center",
              paddingTop: "30px",
              color: "black",
            }}
          >
            Student Accounts
          </Typography>
          {this.state.studentAccounts.length > 0 ? (
            this.state.studentAccounts.map((user: StudentUser, index: number) => (
              <ManageAccount 
                {...user}
                sessionToken={this.props.sessionToken}
                fetchTeacherData={this.fetchTeacherData}
                setBackArrowToggle={this.props.setBackArrowToggle} />
            ))
          ) : (
            <div>You don't currently have any students. </div>
          )}
        </Container>
      </Box>
    );
  }
}

export default ManageAccounts;
