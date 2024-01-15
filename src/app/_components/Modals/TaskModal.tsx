"use client";
import { type TaskStatus } from "@prisma/client";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { api } from "~/trpc/react";
import { useModal } from "../providers/ModalProvider";
import { useTasks } from "../providers/TaskProvider";

export default function TaskModal() {
  const { isOpen, setIsOpen, currentTask, setCurrentTask } = useModal();
  const [loading, setLoading] = useState(false);
  const { mutate: addTaskMutation } = api.task.addTask.useMutation();
  const { mutate: updateTaskMutation } = api.task.updateTask.useMutation();
  const { setTasks } = useTasks();

  if (!isOpen) return null;

  function handleModalClose() {
    setCurrentTask(null);
    setIsOpen(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const status = form.get("status") as TaskStatus;
    const deadline = form.get("deadline") as string;
    const deadlineDate = deadline ? new Date(deadline) : undefined;
    e.currentTarget.reset();
    if (currentTask) {
      updateTaskMutation(
        {
          id: currentTask.id,
          title,
          description,
          deadline: deadlineDate,
          status,
        },
        {
          onSuccess: (data) => {
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task.id === data.id ? { ...task, ...data } : task,
              ),
            );
            toast.success("Task Updated Successfully");
          },
          onError: (error) => {
            const code = error.data?.code;
            if (code === "INTERNAL_SERVER_ERROR") {
              toast.error(error.message);
            } else {
              toast.error("Some error Occurred. Please try again");
            }
            const fieldErrors = error.data?.zodError?.fieldErrors;
            fieldErrors?.title?.map((e) => toast.error(e));
            fieldErrors?.description?.map((e) => toast.error(e));
            fieldErrors?.status?.map((e) => toast.error(e));
            fieldErrors?.deadline?.map((e) => toast.error(e));
          },
          onSettled: () => {
            setLoading(false);
          },
        },
      );
    } else {
      addTaskMutation(
        {
          title,
          description,
          deadline: deadlineDate,
          status,
        },
        {
          onSuccess: (data) => {
            setTasks((prevTasks) => [...prevTasks, data]);
            toast.success("Task Added Successfully");
          },
          onError: (error) => {
            const code = error.data?.code;
            if (code === "INTERNAL_SERVER_ERROR") {
              toast.error(error.message);
            } else {
              toast.error("Some error Occurred. Please try again");
            }
            const fieldErrors = error.data?.zodError?.fieldErrors;
            fieldErrors?.title?.map((e) => toast.error(e));
            fieldErrors?.description?.map((e) => toast.error(e));
            fieldErrors?.status?.map((e) => toast.error(e));
            fieldErrors?.deadline?.map((e) => toast.error(e));
          },
          onSettled: () => {
            setLoading(false);
          },
        },
      );
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex w-1/3 flex-col gap-4 rounded-xl bg-neutral-800 p-6">
        <div className="flex items-center justify-between text-lg">
          <h1>{currentTask ? "Edit Task" : "Add New Task"}</h1>
          <IoMdClose
            className="cursor-pointer text-xl"
            onClick={handleModalClose}
          />
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className="w-full rounded border bg-neutral-700 p-2 text-gray-200"
              defaultValue={currentTask?.title ?? ""}
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              className="w-full rounded border bg-neutral-700 p-2 text-gray-200"
              defaultValue={currentTask?.description ?? ""}
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-white"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              className="w-full rounded border bg-neutral-700 p-2 text-gray-200"
              defaultValue={currentTask?.status ?? ""}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-white"
            >
              Deadline (Optional)
            </label>
            <input
              id="deadline"
              type="date"
              name="deadline"
              className="w-full rounded border bg-neutral-700 p-2 text-gray-200"
              defaultValue={
                (currentTask?.deadLine &&
                  Intl.DateTimeFormat("sv-SE").format(currentTask?.deadLine)) ??
                undefined
              }
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
            disabled={loading}
          >
            {currentTask ? "Update" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
