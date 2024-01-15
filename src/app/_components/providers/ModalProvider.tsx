"use client";
import { type Task } from "@prisma/client";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentTask: Task | null;
  setCurrentTask: Dispatch<SetStateAction<Task | null>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

type Props = { children: ReactNode };

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        currentTask,
        setCurrentTask,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
