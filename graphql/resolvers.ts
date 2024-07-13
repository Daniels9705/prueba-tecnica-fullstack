import prisma from "@/lib/prisma";
export const resolvers = {
    Query: {
        users: async () => await prisma.user.findMany(),

        user: async (_: any, { id }: { id: number }, context: any) => await context.prisma.user.findUnique({ where: { id } }),

        transactions: async () => await prisma.transaction.findMany(),

        transaction: async (_: any, { id }: { id: number }) => await prisma.transaction.findUnique({ where: { id } }),

    },
}