import { TaskStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const addTaskSchema = z.object({
  title: z.string().min(3, "Title Should be Atleast 3 characters long"),
  description: z
    .string()
    .min(3, "Description Should be Atleast 10 characters long"),
  status: z.nativeEnum(TaskStatus),
  deadline: z.date().optional(),
});

const updateTaskSchema = addTaskSchema.extend({
  id: z.string(),
});

const deleteSchema = z.object({
  id: z.string(),
});

export const taskRouter = createTRPCRouter({
  addTask: protectedProcedure
    .input(addTaskSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const newTask = await ctx.db.task.create({
          data: {
            title: input.title,
            description: input.description,
            status: input.status,
            userId: ctx.session.user.id,
            deadLine: input.deadline,
          },
        });
        return newTask;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Error Occured While Saving New Task. Please Try Again Later",
        });
      }
    }),
  updateTask: protectedProcedure
    .input(updateTaskSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const updateTask = await ctx.db.task.update({
          where: { id: input.id, userId: ctx.session.user.id },
          data: {
            title: input.title,
            description: input.description,
            status: input.status,
            deadLine: input.deadline,
          },
        });
        return updateTask;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Error Occured While Updating the Task. Please Try Again Later",
        });
      }
    }),
  deleteTask: protectedProcedure
    .input(deleteSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const deletedTask = await ctx.db.task.delete({
          where: { id: input.id, userId: ctx.session.user.id },
        });
        return deletedTask;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Error Occured While Deleting the Task. Please Try Again Later",
        });
      }
    }),
  getTasks: protectedProcedure.query(async ({ ctx }) => {
    try {
      const tasks = await ctx.db.task.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: "asc" },
      });
      return { success: true, tasks };
    } catch (error) {
      console.error(error);
      return { success: false, tasks: [] };
    }
  }),
});
