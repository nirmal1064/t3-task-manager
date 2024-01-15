"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { BsDiscord } from "react-icons/bs";
import { api } from "~/trpc/react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { mutate } = api.auth.register.useMutation();

  async function handleDiscordRegister() {
    const resp = await signIn("discord", { callbackUrl: "/" });
    console.log(resp);
  }

  function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const name = form.get("name") as string;
    const password = form.get("password") as string;
    setLoading(true);

    mutate(
      { email, name, password },
      {
        onSuccess: () => {
          toast.success("Registered Successfully. Please Login");
        },
        onError: (error) => {
          const code = error.data?.code;
          if (code === "CONFLICT" || code === "INTERNAL_SERVER_ERROR") {
            toast.error(error.message);
          }
          const fieldErrors = error.data?.zodError?.fieldErrors;
          fieldErrors?.name?.map((e) => toast.error(e));
          fieldErrors?.email?.map((e) => toast.error(e));
        },
        onSettled: () => {
          setLoading(false);
        },
      },
    );
    e.currentTarget.reset();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-96 rounded bg-gray-800 p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-white">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="mt-1 w-full rounded border bg-gray-700 p-2 text-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="mt-1 w-full rounded border bg-gray-700 p-2 text-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full rounded border bg-gray-700 p-2 text-gray-200"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
              disabled={loading}
            >
              Register
            </button>
            <button
              className="flex w-full items-center justify-center gap-2 rounded bg-blue-800 p-2 text-white hover:bg-blue-600"
              disabled={loading}
              onClick={handleDiscordRegister}
            >
              <BsDiscord className="text-lg" /> Register With Discord
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-white">
          {"Existing User? "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
