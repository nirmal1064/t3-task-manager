"use client";

import { SlPlus } from "react-icons/sl";
import { useModal } from "../providers/ModalProvider";
import { useTasks } from "../providers/TaskProvider";

const taskStatusValues = {
  ALL: "ALL TASKS",
  TODO: "TASKS TO DO",
  IN_PROGRESS: "TASKS IN PROGRESS",
  COMPLETED: "COMPLETED TASKS",
};

export default function Header() {
  const { setIsOpen } = useModal();
  const { taskPageType } = useTasks();

  return (
    <div className="flex justify-between">
      <h1 className="text-2xl">{taskStatusValues[taskPageType]}</h1>
      <SlPlus
        className="cursor-pointer text-2xl"
        onClick={() => setIsOpen(true)}
      />
    </div>
  );
}
