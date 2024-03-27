import { NextResponse } from "next/server";
import { getUrlFromShortUrl } from "@/services/prisma/shortUrls";
import { NextApiResponse } from "next";

export const GET = async (
  _request: Request,
  { params }: { params: { shorturl: string } },
  response: NextApiResponse,
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
    return response.redirect(url.url);
    // return NextResponse.redirect(url.url, { status: 302 });
  } catch (error) {
    console.log("error :", error);
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 },
    );
  }
};
