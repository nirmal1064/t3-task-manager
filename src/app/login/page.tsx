"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { BsDiscord } from "react-icons/bs";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDiscordLogin() {
    const resp = await signIn("discord", { callbackUrl: "/" });
    console.log(resp);
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    e.currentTarget.reset();
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.ok) {
      void router.push("/");
    } else {
      if (result?.error && result?.error !== "CredentialsSignin") {
        toast.error(result.error);
      } else {
        toast.error("Failed To Login. Try Again after sometime");
      }
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-96 rounded bg-gray-800 p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-white">Login</h2>
        <form onSubmit={handleLogin}>
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
              id="password"
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
              Login
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded bg-blue-800 p-2 text-white hover:bg-blue-600"
              disabled={loading}
              onClick={handleDiscordLogin}
            >
              <BsDiscord className="text-lg" /> Login With Discord
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-white">
          {"Don't have an account? "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
