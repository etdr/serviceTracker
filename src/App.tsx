import React from "react";
import "./App.css";
import Signup from "./Components/Home/Signup";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Chart from "./Components/StudentView/StudentDashboard/StudentViewDashboard/Chart";
import Login from "./Components/Home/Login";
import SelectRole from "./Components/Home/SelectRole";
import StudentPin from "./Components/Home/StudentPin";
import AdminSignup from "./Components/Home/AdminSignup";
import TeacherPin from "./Components/Home/TeacherPin";
import MyDashboard from "./Components/StudentView/StudentDashboard/MyDashboard";
import AddServiceHours from "./Components/StudentView/StudentDashboard/AddServiceHours";
import UpdateServiceHours from "./Components/StudentView/StudentDashboard/UpdateServiceHours";
import ViewEvents from "./Components/StudentView/ViewEvents";
import AdminDash from "./Components/AdminView/AdminDash";
import EventSchedule from "./Components/AdminView/Events/EventSchedule";
import ManageAccounts from "./Components/AdminView/ManageAccounts";

type myState = {
  sessionToken: any;
  updateToken: any;
  email: any;
  firstName: string;
  lastName: string;
  password: any;
  studentAccount: any;
  teacherAccount: any;
  eventInformation: any;
  setEmail: (e:string) => void; //setEmail is a function that takes a string and returns nothing
  setPassword: (e:any) => void; 
};

class App extends React.Component<{}, myState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: "hello",
      updateToken: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      studentAccount: [],
      teacherAccount: [],
      eventInformation: [],
      setEmail: (email)=>{this.setState({email: email})},
      setPassword: (pass)=>{this.setState({password: pass})}
      
     
    };
    console.log("[App.js] Constructor");
  }

  static getDerivedStateFromProps(props: any, state: any) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  //Here we are calling the setState() method and updating our value of session token
  collectToken = () => {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    } else {
      console.log("goodbye");
    }
  };

  //pass as props?
  updateToken = (newToken: any) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
    console.log(newToken);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
  };

  protectedViews = () => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
      <MyDashboard />
    ) : (
      <Login
        updateToken={this.state.updateToken}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        email={this.state.email}
        setEmail={this.state.setEmail}
        password={this.state.password}
        sessionToken={this.state.sessionToken}
        setPassword={this.state.setPassword}
        
      />
    );
  };

  componentDidMount() {
    console.log("[App.js] component did mount");
    this.collectToken();
  }

  render() {
    console.log("[App.js] render");

    return (
      <div>
        {console.log(this.state.sessionToken)}

        <BrowserRouter>
          <Switch>
          {this.state.sessionToken === localStorage.getItem("token") ? (
                   <Route exact path="/mydashboard">
                   <MyDashboard />
                 </Route>
            ) : (
              <Route exact path="/">
              <Login
                updateToken={this.state.updateToken}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                password={this.state.password}
                sessionToken={this.state.sessionToken}
                setEmail={this.state.setEmail}
                setPassword={this.state.setPassword}
              />
            </Route> 
            )}
             {/* <Route exact path="/">
              <Login
                updateToken={this.state.updateToken}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                password={this.state.password}
                sessionToken={this.state.sessionToken}
              />
            </Route>  */}
            <Route exact path="/selectrole">
              <SelectRole />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/adminsignup">
              <AdminSignup />
            </Route>
            <Route exact path="/studentpin">
              <StudentPin />
            </Route>
            <Route exact path="/teacherpin">
              <TeacherPin />
            </Route>
            <Route exact path="/chart">
              <Chart />
            </Route>
            {/* <Route exact path="/mydashboard">
              <MyDashboard />
            </Route> */}
            <Route exact path="/addservice">
              <AddServiceHours />
            </Route>
            <Route exact path="/editservice">
              <UpdateServiceHours />
            </Route>
            <Route exact path="/events">
              <ViewEvents />
            </Route>
            <Route exact path="/admindash">
              <AdminDash />
            </Route>
            <Route exact path="/adminevent">
              <EventSchedule />
            </Route>
            <Route exact path="/manageaccounts">
              <ManageAccounts />
            </Route>
       
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
