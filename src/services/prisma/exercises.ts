import prisma from ".";

export const createExercise = async (
  id: string,
  description: string,
  duration: number,
  date?: Date,
) => {
  const exercise = await prisma.exercises.create({
    data: {
      userId: id,
      description: description,
      duration: duration,
      date: date,
    },
  });
  return exercise;
};

export const getExerciseByUserId = async (
  userId: string,
  from?: Date,
  to?: Date,
  limit?: number,
) => {
  const exercises = await prisma.exercises.findMany({
    where: {
      user: {
        id: userId,
      },
      date: {
        gte: from,
        lte: to,
      },
    },
    take: limit,
  });
  return exercises;
};
