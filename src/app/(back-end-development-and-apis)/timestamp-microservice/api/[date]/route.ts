import { NextResponse } from "next/server";

export const GET = (
  _request: Request,
  { params }: { params: { date: string } },
) => {
  try {
    const date = params.date;

    const newDate = Number(date) ? new Date(Number(date)) : new Date(date);

    if (newDate.toString() === "Invalid Date") {
      return NextResponse.json({ error: "Invalid Date" }, { status: 400 });
    }

    const data = { unix: newDate.valueOf(), utc: newDate.toUTCString() };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};
