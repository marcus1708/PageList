import { createContext, useContext, useEffect, useState } from "react"
import { AuthResponse, LoginPayload, RegisterPayload, User } from "@/types"
import { useNavigate } from "react-router-dom"
import api from "@/services/api"

interface AuthContextType {
  user: User | null
  token: string | null
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      api.defaults.headers.common.Authorization = `Bearer ${storedToken}`
    }
  }, [])

  const login = async (payload: LoginPayload) => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`
    navigate("/tasks")
  }

  const register = async (payload: RegisterPayload) => {
    const { data } = await api.post<AuthResponse>("/auth/register", payload)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`
    navigate("/tasks")
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
