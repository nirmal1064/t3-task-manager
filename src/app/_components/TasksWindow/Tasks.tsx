"use client";
import { useMemo } from "react";
import { useTasks } from "../providers/TaskProvider";
import TaskCard from "./TaskCard";

export default function Tasks() {
  const { tasks, taskPageType } = useTasks();
  // const tasksToDisplay = useMemo(() => {
  //   if (taskPageType === "ALL") {
  //     return tasks;
  //   } else {
  //     return tasks.filter((task) => task.status === taskPageType);
  //   }
  // }, []);

  const tasksToDisplay = useMemo(
    () =>
      taskPageType === "ALL"
        ? tasks
        : tasks.filter((task) => task.status === taskPageType),
    [taskPageType, tasks],
  );

  return (
    <div className="flex flex-wrap gap-4">
      {tasksToDisplay.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
