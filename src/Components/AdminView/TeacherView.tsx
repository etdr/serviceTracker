import { Component } from 'react'
import { Route } from 'react-router-dom'

import AdminDash from './AdminDash'
import EventSchedule from './Events/EventSchedule'
import ManageAccounts from './ManageAccounts'
import ManageHoursTable from './ManageHours'

import { TeacherUser } from '../types'

interface TeacherViewProps {
  backArrowToggle: boolean;
  setBackArrowToggle: any;

  user: TeacherUser;
  sessionToken: string;
  clearToken: () => void;
}



export default class TeacherView extends Component<TeacherViewProps, {}> {


  render () {
    return (
      <>
      <Route path="/teacher">
                <AdminDash
                  // setIsAdminTrue={this.state.setIsAdminTrue}
                  setBackArrowToggle={this.props.setBackArrowToggle}
                  sessionToken={this.props.sessionToken}
                  teacherAccount={this.props.user}
                  backArrowToggle={this.props.backArrowToggle}
                  // arrowHandler={this.arrowHandler}
                  // key={this.state.sessionToken}
                  clearToken={this.props.clearToken}
                  // isAdmin={this.state.isAdmin}
                />
              </Route>
          {/* <Route exact path="/teacher/manage-events">
          <EventSchedule
            // setIsAdminTrue={this.state.setIsAdminTrue}
            setBackArrowToggle={this.props.setBackArrowToggle}
            backArrowToggle={this.props.backArrowToggle}
            // arrowHandler={this.arrowHandler}
            clearToken={this.props.clearToken}
            sessionToken={this.props.sessionToken}
          />
          </Route>
          <Route exact path="/teacher/manage-accounts">
          <ManageAccounts
            // setIsAdminTrue={this.state.setIsAdminTrue}
            teacherAccount={this.props.user}
            backArrowToggle={this.props.backArrowToggle}
            // arrowHandler={this.arrowHandler}
            clearToken={this.props.clearToken}
            sessionToken={this.props.sessionToken}
            setBackArrowToggle={this.props.setBackArrowToggle}
          // classCode={this.state.user.classId}
          />
          </Route>

          <Route exact path="/teacher/manage-hours">
          <ManageHoursTable
            // setIsAdminTrue={this.state.setIsAdminTrue}
            teacherAccount={this.props.user}
            backArrowToggle={this.props.backArrowToggle}

            clearToken={this.props.clearToken}
            sessionToken={this.props.sessionToken}
            setBackArrowToggle={this.props.setBackArrowToggle}
          // classCode={this.state.user.classId}
          />
          </Route> */}
          </>
    )
  }
}