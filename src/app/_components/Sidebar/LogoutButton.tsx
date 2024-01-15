"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  async function handleLogout() {
    await signOut();
  }

  return (
    <div className="w-full p-2 text-center">
      <button
        className="w-full rounded-lg bg-red-600 p-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
