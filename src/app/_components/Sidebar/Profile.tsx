"use client";
import { type User } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";

type Props = { user: User };

export default function Profile({ user }: Props) {
  const [isImageFailed, setIsImageFailed] = useState(false);

  function handleImageError() {
    setIsImageFailed(true);
  }

  return (
    <div className="flex w-full items-center justify-center gap-2 pt-2">
      {isImageFailed ? (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 text-3xl">
          <RxAvatar />
        </div>
      ) : (
        <Image
          className="rounded-full"
          src={user.image ?? ""}
          onError={handleImageError}
          // src={
          //   "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // }
          alt="Avatar"
          width={48}
          height={48}
        />
      )}
      <p>{user.name}</p>
    </div>
  );
}
