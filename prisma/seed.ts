import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

    //borrar datos de la base de datos
    await prisma.user.deleteMany({})
    await prisma.transaction.deleteMany({})

    const user = await prisma.user.create({
        data: {
            name: 'user',
            email: 'user@example.com',
            password: '123456',
            role: 'USER',
        }
    })
    const admin = await prisma.user.create({
        data: {
            name: 'admin',
            email: 'admin@example.com',
            password: '123456',
            role: 'ADMIN',
        }
    })
    
    const transaction = await prisma.transaction.create({
        data: {
            concept: 'concept',
            amount: 100,
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    })
}

main()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })