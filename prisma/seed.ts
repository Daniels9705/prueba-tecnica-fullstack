import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {

    //borrar datos de la base de datos
    await prisma.transaction.deleteMany({})
    await prisma.user.deleteMany({})

    //encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedAdminPassword = await bcrypt.hash('@Admin11', salt);

    const admin = await prisma.user.create({
        data: {
            name: 'admin',
            email: 'admin@example.com',
            password: hashedAdminPassword,
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