export interface User {
    _id: string
    name: string
    email: string
  }
  
  export interface Task {
    _id: string
    title: string
    description: string
    completed: boolean
    createdAt?: string
    updatedAt?: string
  }
  
  export interface AuthResponse {
    user: User
    token: string
  }
  
  export interface LoginPayload {
    email: string
    password: string
  }
  
  export interface RegisterPayload {
    name: string
    email: string
    password: string
  }
  