import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Login from '../Home/Login'
import Signup from '../Home/Signup'
import AdminSignup from '../Home/AdminSignup'
import StudentPin from '../Home/StudentPin'
import TeacherPin from '../Home/TeacherPin'
import SelectRole from '../Home/SelectRole'
import { User } from '../types'


interface AuthProps {
  user: User | null;
  updateToken: (token: string | null) => void;
  sessionToken: string | null;
  setUser: (user: User | null) => void;
}




export default class Auth extends Component<AuthProps, {}> {
  render () {
    if (this.props.user)
      return <Redirect to={`/${this.props.user.teacher ? 'teacher' : 'student'}/dashboard`} />
    return (
      <>
      <Route path="/auth/login">
    <Login
      updateToken={this.props.updateToken}
      // firstName={this.state.firstName}
      // lastName={this.state.lastName}
      // email={this.state.email}
      // password={this.state.password}
      sessionToken={this.props.sessionToken}
      // setEmail={this.state.setEmail}
      // setPassword={this.state.setPassword}
      // classCode={this.state.classCode}
      // setClassCode={this.state.setClassCode}
      // collectToken={this.collectToken}
      // isAdmin={this.state.isAdmin}
      // setIsAdminTrue={this.state.setIsAdminTrue}
      // setIsAdminFalse={this.state.setIsAdminFalse}
      // setTeacherProfile={this.state.setTeacherProfile}
      setUser={this.props.setUser}
      // user={this.state.user}
    />
  </Route>
  <Route exact path="/auth/selectrole">
    <SelectRole />
  </Route>
  <Route exact path="/auth/signup">
    <Signup
      updateToken={this.props.updateToken}
      // firstName={this.state.firstName}
      // lastName={this.state.lastName}
      // email={this.state.email}
      // password={this.state.password}
      sessionToken={this.props.sessionToken}
      // setEmail={this.state.setEmail}
      // setPassword={this.state.setPassword}
      // classCode={this.state.classCode}
      // setClassCode={this.state.setClassCode}
      // setFirstName={this.state.setFirstName}
      // setLastName={this.state.setLastName}
      // setIsAdminFalse={this.state.setIsAdminFalse}
      setUser={this.props.setUser}
    />
  </Route>
  <Route exact path="/auth/teacher-signup">
    <AdminSignup
      updateToken={this.props.updateToken}
      // firstName={this.state.firstName}
      // lastName={this.state.lastName}
      // email={this.state.email}
      // password={this.state.password}
      sessionToken={this.props.sessionToken}
      // setEmail={this.state.setEmail}
      // setPassword={this.state.setPassword}
      // classCode={this.state.classCode}
      // setClassCode={this.state.setClassCode}
      // setFirstName={this.state.setFirstName}
      // setLastName={this.state.setLastName}
      // teacherAccount={this.state.teacherAccount}
      // setTeacherProfile={this.state.setTeacherProfile}
      setUser={this.props.setUser}
    />
  </Route>
  <Route exact path="/auth/studentpin">
    <StudentPin
      // classCode={this.state.user!.classId}
      // setClassCode={this.state.setClassCode}
    />
  </Route>
  <Route exact path="/auth/teacherpin/:pin">
    <TeacherPin
      // sessionToken={this.state.sessionToken}
      // teacherAccount={this.state.user as T.TeacherUser} />
      />
  </Route>
      </>
    )
  }
}

