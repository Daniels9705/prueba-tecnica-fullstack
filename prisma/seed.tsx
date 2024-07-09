import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

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
    
}

main()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })