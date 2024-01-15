"use client";
import { FaHome } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { IoCheckmarkDone } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { useTasks } from "../providers/TaskProvider";

export default function Menu() {
  const { taskPageType, setTaskPageType } = useTasks();

  return (
    <ul className="w-full cursor-pointer text-center">
      <li
        className={`list-item ${taskPageType === "ALL" ? "bg-zinc-700" : "hover:bg-zinc-600"} p-1`}
        onClick={() => setTaskPageType("ALL")}
      >
        <div className="flex items-center justify-center gap-2">
          <FaHome />
          <span>All Tasks</span>
        </div>
      </li>
      <li
        className={`list-item ${taskPageType === "TODO" ? "bg-zinc-700" : "hover:bg-zinc-600"} p-1`}
        onClick={() => setTaskPageType("TODO")}
      >
        <div className="flex items-center justify-center gap-2">
          <LuListTodo />
          <span>Todo Tasks</span>
        </div>
      </li>
      <li
        className={`list-item ${taskPageType === "IN_PROGRESS" ? "bg-zinc-700" : "hover:bg-zinc-600"} p-1`}
        onClick={() => setTaskPageType("IN_PROGRESS")}
      >
        <div className="flex items-center justify-center gap-2">
          <GrInProgress />
          <span>In Progress</span>
        </div>
      </li>
      <li
        className={`list-item ${taskPageType === "COMPLETED" ? "bg-zinc-700" : "hover:bg-zinc-600"} p-1`}
        onClick={() => setTaskPageType("COMPLETED")}
      >
        <div className="flex items-center justify-center gap-2">
          <IoCheckmarkDone />
          <span>Completed</span>
        </div>
      </li>
    </ul>
  );
}
