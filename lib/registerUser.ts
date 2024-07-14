import prisma from './prisma';

const registerUser = async (userData: { email: string; name: string }) => {
  const { email, name } = userData;

  try {
    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      // Si el usuario no existe, crea un nuevo registro
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: 'Auth0',
          role: 'USER',
        },
      });

      console.log('Usuario registrado:', newUser);
    } else {
      console.log('El usuario ya está registrado en la base de datos.');
    }
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
  }
};

export default registerUser;
