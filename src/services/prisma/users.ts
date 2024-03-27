import prisma from ".";

export const createUser = async (username: string) => {
  const user = await prisma.users.create({
    data: {
      username: username,
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};
