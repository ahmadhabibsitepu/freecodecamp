import { NextResponse } from "next/server";
import { getUrlFromShortUrl } from "@/services/prisma/shortUrls";

export const GET = async (
  _request: Request,
  { params }: { params: { shorturl: string } },
) => {
  try {
    const { shorturl } = params;

    if (!Number(shorturl)) {
      return NextResponse.json({ error: "Invalid short url" });
    }

    const url = await getUrlFromShortUrl(Number(shorturl));

    if (!url) {
      return NextResponse.json({ error: "Invalid short url" });
    }

    return NextResponse.redirect(url.url, 302);
  } catch (error) {
    console.log("error :", error);
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};
