import { getExerciseByUserId } from "@/services/prisma/exercises";
import { getUserById } from "@/services/prisma/users";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params;

    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const limit = searchParams.get("limit");

    const dateFrom = from
      ? new Date(from).toString() === "Invalid Date"
        ? undefined
        : new Date(from)
      : undefined;
    const dateTo = to
      ? new Date(to).toString() === "Invalid Date"
        ? undefined
        : new Date(to)
      : undefined;
    const exerciseLimit = limit ? Number(limit) : undefined;

    if (!id) {
      return NextResponse.json(
        { error: "User Id is required" },
        { status: 400 },
      );
    }

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    const exercises = await getExerciseByUserId(
      id,
      dateFrom,
      dateTo,
      exerciseLimit,
    );

    const log = exercises.map((exercise) => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString(),
      };
    });

    const data = {
      _id: user.id,
      username: user.username,
      count: exercises.length,
      log: log,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};
