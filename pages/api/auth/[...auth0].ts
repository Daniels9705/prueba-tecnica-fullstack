import { handleAuth, handleCallback, Session } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
  const { user } = session;
  const userEmail = user.email;
    
  //verifica si el usuario ya existe en la base de datos y lo guarda en una variable
  let dbUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  //si no existe lo crea
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: userEmail,
        name: user.name,
        password: 'Auth0',
        role: 'USER',
      },
    });
  }

  // Añadir el rol del usuario a la sesión
  session.user.role = dbUser.role;
  // Añadir el id del usuario (base de datos) a la sesión
  session.user.userId = dbUser.id;  

  return session;
};

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
});