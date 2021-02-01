import { Component } from 'react'
import { Route } from 'react-router-dom'

import MyDashboard from './StudentDashboard/MyDashboard'
import AddServiceHours from './StudentDashboard/AddServiceHours'
import ViewEvents from './ViewEvents'

import { StudentUser } from '../types'

interface StudentViewProps {
  backArrowToggle: boolean;
  setBackArrowToggle: any;

  user: StudentUser;
  sessionToken: string;
  clearToken: () => void;
}




export default class StudentView extends Component<StudentViewProps, {}> {



  render () {
    return (
      <>
        <Route exact path="/student/dashboard">
          <MyDashboard
            user={this.props.user}
            
            // indexNumber={this.state.indexNumber}
            // setIndexNumber={this.state.setIndexNumber}
            // specificEntry={this.state.specificEntry}
            // // setSpecificEntry={this.state.setSpecificEntry}
            // isAdmin={this.state.isAdmin}
            
            sessionToken={this.props.sessionToken}
            backArrowToggle={this.props.backArrowToggle}
            // arrowHandler={this.arrowHandler}
            // key={this.state.sessionToken}
            // setIsAdminFalse={this.state.setIsAdminFalse}
            clearToken={this.props.clearToken}
            // serviceRequests={this.state.serviceRequests}
            // setServiceRequests={this.state.setServiceRequests}
            setBackArrowToggle={this.props.setBackArrowToggle}
          />
        </Route>

        <Route exact path="/student/add-service">
          <AddServiceHours
            setBackArrowToggle={this.props.setBackArrowToggle}
            // setIsAdminFalse={this.state.setIsAdminFalse}

            backArrowToggle={this.props.backArrowToggle}
            // arrowHandler={this.arrowHandler}
            clearToken={this.props.clearToken}
            sessionToken={this.props.sessionToken}
          // date= {this.state.date}
          // typeOfService= {this.state.typeOfService}
          // description= {this.state.description}
          // hours= {this.state.hours}
          // status={this.state.status}
          // studentUserId={this.state.studentUserId}
          // setDate={this.state.setDate}
          // setTypeOfService={this.state.setTypeOfService}
          // setDescription={this.state.setDescription}
          // setHours={this.state.setHours}
          // setStatus={this.state.setStatus}
          />
        </Route>

        <Route exact path="/events">
          <ViewEvents
            setBackArrowToggle={this.props.setBackArrowToggle}
            // setIsAdminFalse={this.state.setIsAdminFalse}
            // isAdmin={this.state.isAdmin}
            backArrowToggle={this.props.backArrowToggle}
            // arrowHandler={this.arrowHandler}
            clearToken={this.props.clearToken}
            sessionToken={this.props.sessionToken}

          />
        </Route>
      </>
    )
  }
}