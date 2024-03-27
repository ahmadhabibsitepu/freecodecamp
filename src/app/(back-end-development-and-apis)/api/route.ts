import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const now = new Date();

    const data = { unix: now.getTime(), utc: now.toUTCString() };

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

    const upfile = req.get("upfile");

    console.log("upfile :", upfile);

    if (!upfile || typeof upfile === "string")
      return NextResponse.json(
        { error: "Please upload a file" },
        { status: 400 },
      );

    const data = {
      name: upfile.name,
      type: upfile.type,
      size: upfile.size,
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
