"use client";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return <Toaster toastOptions={{ duration: 3000 }} />;
}
