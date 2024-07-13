//graphql resolvers
import prisma from "@/lib/prisma";
export const resolvers = {
    Query: {
        //obtener todos los usuarios
        users: async () => await prisma.user.findMany(),
        //obtener un solo usuario
        user: async (_: any, { id }: { id: number }, context: any) => await context.prisma.user.findUnique({ where: { id } }),
        //obtener todas las transacciones
        transactions: async () => await prisma.transaction.findMany(),
        //obtener una sola transacción
        transaction: async (_: any, { id }: { id: number }) => await prisma.transaction.findUnique({ where: { id } }),

    },
    Mutation: {
        // crear un nuevo usuario
        createUser: async (_: any, { name, email, password, role }: { name: string, email: string, password: string, role: any }) => {
            return await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    role,
                },
            });
        },
        // actualizar un usuario existente
        updateUser: async (_: any, { id, name, email, password, role }: { id: number, name?: string, email?: string, password?: string, role?: any }) => {
            return await prisma.user.update({
                where: { id },
                data: {
                    name,
                    email,
                    password,
                    role,
                },
            });
        },
        // eliminar un usuario
        deleteUser: async (_: any, { id }: { id: number }) => {
            return await prisma.user.delete({
                where: { id },
            });
        },
        // crear una nueva transacción
        createTransaction: async (_: any, { concept, amount, userId }: { concept: string, amount: number, userId: number }) => {
            return await prisma.transaction.create({
                data: {
                    concept,
                    amount,
                    userId,
                },
            });
        },
        // actualizar una transacción existente
        updateTransaction: async (_: any, { id, concept, amount }: { id: number, concept?: string, amount?: number }) => {
            return await prisma.transaction.update({
                where: { id },
                data: {
                    concept,
                    amount,
                },
            });
        },
        // eliminar una transacción
        deleteTransaction: async (_: any, { id }: { id: number }) => {
            return await prisma.transaction.delete({
                where: { id },
            });
        },
    },
}