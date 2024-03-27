import { NextResponse } from "next/server";
import { createUser, getUsers } from "@/services/prisma/users";

export const GET = async () => {
  try {
    const users = await getUsers();

    const data = users.map((user) => {
      return {
        _id: user.id,
        username: user.username,
      };
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const req = await request.formData();

    const username = req.get("username");

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
