import { NextResponse } from "next/server";
import { getUserById } from "@/services/prisma/users";
import { createExercise } from "@/services/prisma/exercises";

export const POST = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params;

    const { description, duration, date } = await request.json();

    if (!description || !duration || !Number(duration)) {
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }

    const newDate =
      new Date(date).toString() === "Invalid Date" ? undefined : new Date(date);

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 400 });
    }

    const exercise = await createExercise(
      id,
      description,
      Number(duration),
      newDate,
    );

    if (!exercise) {
      return NextResponse.json(
        { error: "Something Went Wrong" },
        { status: 500 },
      );
    }

    const data = {
      _id: exercise.id,
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("error :", error);
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};
