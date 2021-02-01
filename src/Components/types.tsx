


interface BaseUser {
  classId: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  updatedAt: string;
  teacher: boolean;
}

export interface TeacherUser extends BaseUser { }

export interface StudentUser extends BaseUser {
  services: Services;
  teacherUser: TeacherUser;
}

export type StudentUsers = StudentUser[]

export type User = StudentUser | TeacherUser







export type ServiceStatus = 'Approved' | 'Denied' | 'Pending'

export type ServiceType = "Tutoring" | "Recycling" | "NJHS Sponsored Event" | "Volunteering" | "Other"

export interface Service {
  classId: string;
  createdAt: string;
  date: string;
  description: string;
  hours: number;
  id: number;
  status: ServiceStatus;
  studentUser?: StudentUser;
  studentUserId: number;
  typeOfService: ServiceType;
  updatedAt: string;
}

export type Services = Service[]






export type Event = {
  id: number;
  date: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  location: string;
  hours: number;
  description: string;
  teacher?: TeacherUser;
}

export type Events = Event[]



// ===== SERVER RESPONSES ======================================================

interface AuthResponse {
  message: string;
  sessionToken: string;
}

export interface StudentAuthResponse extends AuthResponse {
  user: StudentUser;
}

export interface TeacherAuthResponse extends AuthResponse {
  user: TeacherUser;
}


// export interface FetchEventsResponse {

// }

// alias
export type TeacherFetchAllResponse = StudentUsers