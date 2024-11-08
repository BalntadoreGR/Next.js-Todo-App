import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({

  addTask: publicProcedure
    .input(z.object({ title: z.string(), description: z.string()}))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          status: "pending",
        },
      })
    }), 

  toggleTask: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.findUnique({ where: { id: input.id } });
      if (!task) throw new Error('Task not found');
      return await ctx.db.task.update({
        where: { id: input.id },
        data: { status: task.status === 'completed' ? 'pending' : 'completed' },
      });
    }),

  getTasks: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.task.findMany();
    }),
  
  deleteTask: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.delete({
        where: { id: input.id },
      });
    }),
});
