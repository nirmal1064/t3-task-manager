"use client";

import { type Task, type TaskStatus } from "@prisma/client";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type Props = { tasks: Task[]; children: ReactNode };

// const useTaskState = (initialTasks: Task[]) => useState<Task[]>(initialTasks);

// export const TaskContext = createContext<ReturnType<
//   typeof useTaskState
// > | null>(null);

type TasksPageType = TaskStatus | "ALL";

type TaskContextType = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  taskPageType: TasksPageType;
  setTaskPageType: Dispatch<SetStateAction<TasksPageType>>;
};

export const TaskContext = createContext({} as TaskContextType);

export const useTasks = () => {
  const tasks = useContext(TaskContext);
  if (!tasks) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return tasks;
};

export default function TaskProvider({ children, tasks: serverTasks }: Props) {
  const [tasks, setTasks] = useState(serverTasks);
  const [taskPageType, setTaskPageType] = useState<TasksPageType>("ALL");

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        taskPageType,
        setTaskPageType,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
