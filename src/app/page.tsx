import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import DeleteModal from "./_components/Modals/DeleteModal";
import TaskModal from "./_components/Modals/TaskModal";
import Sidebar from "./_components/Sidebar";
import TasksWindow from "./_components/TasksWindow";
import ModalProvider from "./_components/providers/ModalProvider";
import TaskProvider from "./_components/providers/TaskProvider";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/login");
  }
  const response = await api.task.getTasks.query();

  return (
    <ModalProvider>
      <TaskProvider tasks={response.tasks}>
        <main className="flex min-h-screen gap-5 p-6">
          <Sidebar />
          <TasksWindow />
        </main>
        <TaskModal />
        <DeleteModal />
      </TaskProvider>
    </ModalProvider>
  );
}
