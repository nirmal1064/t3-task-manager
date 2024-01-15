import { type Task } from "@prisma/client";
import { BiSolidTrashAlt } from "react-icons/bi";
import { MdEditNote } from "react-icons/md";
import { useModal } from "../providers/ModalProvider";

type Props = { task: Task };

const bgColorForTaskStatus = {
  TODO: "bg-red-500",
  IN_PROGRESS: "bg-purple-500",
  COMPLETED: "bg-green-500",
};

export default function TaskCard({ task }: Props) {
  const { setIsOpen, setCurrentTask, setIsDeleteModalOpen } = useModal();

  function openModalForEdit() {
    setCurrentTask(task);
    setIsOpen(true);
  }

  function openModalForDelete() {
    setCurrentTask(task);
    setIsDeleteModalOpen(true);
  }

  return (
    <div className="box-border flex w-[calc(25%-1rem)] flex-col gap-2 rounded-md bg-[#333233] p-2">
      <h2 className="text-lg">{task.title}</h2>
      <p className="flex-1 text-clip whitespace-normal text-sm">
        {task.description}
      </p>
      <p className="mb-[-4px] text-xs text-gray-400">
        {task.deadLine && Intl.DateTimeFormat("en-IN").format(task.deadLine)}
      </p>
      <div className="flex items-center justify-between">
        <p
          className={`rounded-2xl text-sm ${bgColorForTaskStatus[task.status]} px-2 py-0.5`}
        >
          {task.status === "IN_PROGRESS" ? "IN PROGRESS" : task.status}
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xl">
          <MdEditNote
            className="cursor-pointer text-2xl"
            onClick={openModalForEdit}
          />
          <BiSolidTrashAlt
            className="cursor-pointer text-base"
            onClick={openModalForDelete}
          />
        </div>
      </div>
    </div>
  );
}
