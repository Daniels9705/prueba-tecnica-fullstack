//graphql resolvers
import prisma from "@/lib/prisma";
export const resolvers = {
    Query: {
        //obtener todos los usuarios
        users: async (_: any, __: any, { user }: any) => {    
            //valida que el usuario esté autorizado
            if (user?.role !== 'ADMIN') {
                throw new Error('Unauthorized');
            }
            return await prisma.user.findMany();
        },

        //obtener un solo usuario
        user: async (_: any, { id }: { id: number }, context: any) => {
            //valida que el usuario esté autorizado
            const user = context.user;
            if (user?.role !== 'ADMIN') {
                throw new Error('Unauthorized');
            }
           return await context.prisma.user.findUnique({ where: { id } })
        },
        
        //obtener todas las transacciones
        transactions: async (_: any, __: any, { user }: any) => {
             //valida que el usuario esté autorizado            
            if (user?.role !== 'ADMIN' && user?.role !== 'USER') {
                throw new Error('Unauthorized');
            }

            return await prisma.transaction.findMany({
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            })
        },
        
        //obtener una sola transacción
        transaction: async (_: any, { id }: { id: number }, context: any) => {      
            //valida que el usuario esté autorizado
            const user = context.user;
            if (user?.role !== 'ADMIN') {
                throw new Error('Unauthorized');
            }                  
            return await prisma.transaction.findUnique({ where: { id } })
        },
    },
    Mutation: {
        // crear un nuevo usuario
        createUser: async (_:any, { name, email, password, role }: { name: string, email: string, password: string, role: any }, { user }: any ) => {
            //valida que el usuario esté autorizado
            if (user?.role !== 'ADMIN') {
                throw new Error('Unauthorized');
            }
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
        updateUser: async ( _: any, { id, name, email, phone, password, role }: { id: number, name?: string, email?: string, phone?: string, password?: string, role?: any }, { user }: any) => {

            //valida que el usuario esté autorizado            
            if (user?.role !== 'ADMIN') {
                throw new Error('Unauthorized');
            }

            return await prisma.user.update({
                where: { id },
                data: {
                    name,
                    email,
                    phone,
                    password,
                    role,
                },
            });
        },
        
        // crear una nueva transacción
        createTransaction: async (_: any, { concept, amount, date, userId }: { concept: string, amount: number, date: string, userId: number}, { user }: any) => {    
            //valida que el usuario esté autorizado
            if (user?.role !== 'ADMIN') {
                throw new Error('Unauthorized');
            }
            return await prisma.transaction.create({
                data: {
                    concept,
                    amount,
                    date,
                    userId,
                },
            });
        },
        
        // actualizar una transacción existente
        updateTransaction: async (_: any, { id, concept, amount, date }: { id: number, concept?: string, amount?: number, date?: string }, { user }: any) => {
            //valida que el usuario esté autorizado
            if (user?.role !== 'ADMIN') {
                throw new Error('Unauthorized');
            }
            return await prisma.transaction.update({
                where: { id },
                data: {
                    concept,
                    amount,
                    date,
                },
            });
        },
        
        // eliminar una transacción
        deleteTransaction: async (_: any, { id }: { id: number }, { user }: any) => {
            //valida que el usuario esté autorizado
            if (user?.role !== 'ADMIN') {
                throw new Error('Unauthorized');
            }            
            return await prisma.transaction.delete({
                where: { id },
            });
        },
    },
}