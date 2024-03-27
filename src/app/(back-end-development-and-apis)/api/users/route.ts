import { NextResponse } from "next/server";
import { createUser } from "@/services/prisma/users";

export const POST = async (request: Request) => {
  try {
    const { username } = await request.json();

    if (!username || !(typeof username === "string")) {
      return NextResponse.json(
        { error: "username is required" },
        { status: 400 },
      );
    }

    const user = await createUser(username.toLowerCase());

    const data = {
      _id: user.id,
      username: user.username,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};
