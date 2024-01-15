import Header from "./Header";
import Tasks from "./Tasks";

export default async function TasksWindow() {
  return (
    <section className="flex flex-1 flex-col gap-2 rounded-xl bg-neutral-600 p-8">
      <Header />
      <Tasks />
    </section>
  );
}
