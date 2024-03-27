import { NextResponse } from "next/server";
import { getUrlFromShortUrl } from "@/services/prisma/shortUrls";

export const GET = async (
  _request: Request,
  { params }: { params: { shorturl: string } },
) => {
  try {
    const { shorturl } = params;

    if (!Number(shorturl)) {
      return NextResponse.json({ error: "Invalid short url" }, { status: 400 });
    }

    const url = await getUrlFromShortUrl(Number(shorturl));

    if (!url) {
      return NextResponse.json({ error: "Invalid short url" }, { status: 404 });
    }

    return NextResponse.redirect(url.url, { status: 302 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};
