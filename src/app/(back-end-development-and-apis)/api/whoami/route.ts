import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const data = {
      ipaddress: request.headers.get("x-forwarded-for"),
      language: request.headers.get("accept-language"),
      software: request.headers.get("user-agent"),
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};
