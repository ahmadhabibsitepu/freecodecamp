import { NextResponse } from "next/server";
import { createShortUrl } from "@/services/prisma/shortUrls";

export const POST = async (request: Request) => {
  try {
    const req = await request.formData();

    const url = req.get("url");

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "invalid url" });
    }

    let urlRegex = new RegExp(
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    );

    if (!url.match(urlRegex)) {
      return NextResponse.json({ error: "invalid url" });
    }

    const shortUrl = await createShortUrl(url);

    const data = { original_url: shortUrl.url, short_url: shortUrl.shortUrl };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};
