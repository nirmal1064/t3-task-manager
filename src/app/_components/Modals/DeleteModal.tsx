"use client";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { api } from "~/trpc/react";
import { useModal } from "../providers/ModalProvider";
import { useTasks } from "../providers/TaskProvider";

export default function DeleteModal() {
  const {
    currentTask,
    setCurrentTask,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  } = useModal();
  const [loading, setLoading] = useState(false);
  const { setTasks } = useTasks();
  const { mutate: deleteMutation } = api.task.deleteTask.useMutation();

  if (!isDeleteModalOpen) return null;

  function handleModalClose() {
    setCurrentTask(null);
    setIsDeleteModalOpen(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    deleteMutation(
      {
        id: currentTask!.id,
      },
      {
        onSuccess: (data) => {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== data.id),
          );
          toast.success("Task Deleted Successfully");
        },
        onError: (error) => {
          const code = error.data?.code;
          if (code === "INTERNAL_SERVER_ERROR") {
            toast.error(error.message);
          } else {
            toast.error("Some error Occurred. Please try again");
          }
        },
        onSettled: () => {
          setLoading(false);
          handleModalClose();
        },
      },
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex w-1/4 flex-col gap-4 rounded-xl bg-neutral-800 p-6">
        <div className="flex items-center justify-between text-lg">
          <h1>Delete Task</h1>
          <IoMdClose
            className="cursor-pointer text-xl"
            onClick={handleModalClose}
          />
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <p className="text-base">Are You Sure to Delete this Task?</p>
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full rounded bg-red-500 p-2 text-white hover:bg-red-600"
              disabled={loading}
            >
              Delete
            </button>
            <button
              className="w-full rounded bg-slate-50 p-2 text-black hover:bg-slate-200"
              onClick={handleModalClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
