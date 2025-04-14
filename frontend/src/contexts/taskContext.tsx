import { createContext, useContext, useEffect, useState } from "react"
import { Task, TaskPayload } from "@/types"
import api from "@/services/api"
import { useAuth } from "@/contexts/authContext"
import { toast } from "sonner"

interface TaskContextType {
  tasks: Task[]
  fetchTasks: () => Promise<void>
  addTask: (payload: TaskPayload) => Promise<void>
  updateTask: (id: string, payload: Partial<TaskPayload>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

const TaskContext = createContext({} as TaskContextType)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      fetchTasks()
    }
  }, [token])

  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks")
      setTasks(data)
    } catch (err) {
      toast.error("Erro ao carregar tarefas")
    }
  }

  const addTask = async (payload: TaskPayload) => {
    try {
      const { data } = await api.post("/tasks", payload)
      setTasks((prev) => [...prev, data])
      toast.success("Tarefa criada com sucesso")
    } catch (err) {
      toast.error("Erro ao criar tarefa")
    }
  }

  const updateTask = async (id: string, payload: Partial<TaskPayload>) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, payload)
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)))
      toast.success("Tarefa atualizada")
    } catch (err) {
      toast.error("Erro ao atualizar tarefa")
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks((prev) => prev.filter((t) => t._id !== id))
      toast.success("Tarefa removida")
    } catch (err) {
      toast.error("Erro ao deletar tarefa")
    }
  }

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => useContext(TaskContext)
