import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const req = await request.formData();

    const upfile = req.get("upfile");

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
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};
