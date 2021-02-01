
export type ServiceStatus = 'Approved' | 'Denied' | 'Pending'

export type ServiceType = "Tutoring" | "Recycling" | "NJHS Sponsored Event" | "Volunteering" | "Other"

export interface Service {
  classId: number;
  createdAt: string;
  date: string;
  description: string;
  hours: number;
  id: number;
  status: ServiceStatus;
  studentUserId: number;
  typeOfService: ServiceType;
  updatedAt: string;
}

export interface TeacherUser {
  classId: number;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  updatedAt: string;
}

export type Services = Service[]

export interface StudentUser {
  classId: number;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  services: Services;
  teacherUser: TeacherUser;
  totalHours: number;
  updatedAt: string;
}

export type StudentUsers = StudentUser[]

export type User = StudentUser | TeacherUser

export type Event = {
  id: number;
  date: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  location: string;
  hours: number;
  description: string;
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