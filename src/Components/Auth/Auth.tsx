import { Component } from 'react'
import { Route } from 'react-router-dom'

import Login from '../Home/Login'
import Signup from '../Home/Signup'
import AdminSignup from '../Home/AdminSignup'
import StudentPin from '../Home/StudentPin'
import TeacherPin from '../Home/TeacherPin'
import SelectRole from '../Home/SelectRole'






export default class Auth extends Component<any, {}> {
  render () {
    return ( null
    //   <>
    //     <Route exact path="/">
    //     <Login
    //       updateToken={this.updateToken}
    //       // firstName={this.state.firstName}
    //       // lastName={this.state.lastName}
    //       // email={this.state.email}
    //       // password={this.state.password}
    //       sessionToken={this.state.sessionToken}
    //       // setEmail={this.state.setEmail}
    //       // setPassword={this.state.setPassword}
    //       // classCode={this.state.classCode}
    //       // setClassCode={this.state.setClassCode}
    //       // collectToken={this.collectToken}
    //       // isAdmin={this.state.isAdmin}
    //       // setIsAdminTrue={this.state.setIsAdminTrue}
    //       // setIsAdminFalse={this.state.setIsAdminFalse}
    //       // setTeacherProfile={this.state.setTeacherProfile}
        
    //     />
    //   </Route>
    //   <Route exact path="/selectrole">
    //     <SelectRole />
    //   </Route>
    //   <Route exact path="/signup">
    //     <Signup
    //       updateToken={this.updateToken}
    //       // firstName={this.state.firstName}
    //       // lastName={this.state.lastName}
    //       // email={this.state.email}
    //       // password={this.state.password}
    //       sessionToken={this.state.sessionToken}
    //       // setEmail={this.state.setEmail}
    //       // setPassword={this.state.setPassword}
    //       // classCode={this.state.classCode}
    //       // setClassCode={this.state.setClassCode}
    //       // setFirstName={this.state.setFirstName}
    //       // setLastName={this.state.setLastName}
    //       // setIsAdminFalse={this.state.setIsAdminFalse}
    //       setUser={this.setUser}
    //     />
    //   </Route>
    //   <Route exact path="/adminsignup">
    //     <AdminSignup
    //       updateToken={this.updateToken}
    //       // firstName={this.state.firstName}
    //       // lastName={this.state.lastName}
    //       // email={this.state.email}
    //       // password={this.state.password}
    //       sessionToken={this.state.sessionToken}
    //       // setEmail={this.state.setEmail}
    //       // setPassword={this.state.setPassword}
    //       // classCode={this.state.classCode}
    //       // setClassCode={this.state.setClassCode}
    //       // setFirstName={this.state.setFirstName}
    //       // setLastName={this.state.setLastName}
    //       // teacherAccount={this.state.teacherAccount}
    //       // setTeacherProfile={this.state.setTeacherProfile}
    //       setUser={this.setUser}
    //     />
    //   </Route>
    //   <Route exact path="/studentpin">
    //     <StudentPin
    //       classCode={this.state.user!.classId}
    //       // setClassCode={this.state.setClassCode}
    //     />
    //   </Route>
    //   <Route exact path="/teacherpin">
    //     <TeacherPin
    //       sessionToken={this.state.sessionToken}
    //       teacherAccount={this.state.user as T.TeacherUser} />
    //   </Route>
    // </>
    )
  }
}

