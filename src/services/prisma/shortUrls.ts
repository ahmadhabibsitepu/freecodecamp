import prisma from ".";

export const createShortUrl = async (url: string) => {
  const count = await prisma.shortUrls.count();
  const shortUrls = await prisma.shortUrls.create({
    data: {
      url: url,
      shortUrl: count + 1,
    },
  });
  return shortUrls;
};

export const getUrlFromShortUrl = async (shortUrl: number) => {
  const url = await prisma.shortUrls.findFirst({
    where: {
      shortUrl: shortUrl,
    },
    select: {
      url: true,
    },
  });
  return url;
};
