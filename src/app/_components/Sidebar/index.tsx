import { getServerAuthSession } from "~/server/auth";
import LogoutButton from "./LogoutButton";
import Menu from "./Menu";
import Profile from "./Profile";

export default async function Sidebar() {
  const { user } = (await getServerAuthSession())!;

  return (
    <section className="flex w-[12%] flex-col items-center justify-between gap-5 rounded-xl bg-neutral-600">
      <Profile user={user} />
      <Menu />
      <LogoutButton />
    </section>
  );
}
