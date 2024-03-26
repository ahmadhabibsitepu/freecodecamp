"use client";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const quotes = [
  {
    text: "The world is a book, and those who do not travel read only one page.",
    author: "Saint Augustine",
  },
  {
    text: "The whole is more than the sum of its parts.",
    author: "Stephen Hawking",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  { text: "The best way out is always through.", author: "Robert Frost" },
  {
    text: "The biggest adventure you can take is to live the life of your dreams.",
    author: "Oprah Winfrey",
  },
];

export default function Home() {
  const [quote, setQuote] = useState({ text: "", author: "" });

  const handleClick = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <main className="flex h-screen items-center justify-center">
      <Card id="quote-box" className="flex w-1/2 flex-col">
        <CardHeader>
          <CardTitle>Random Quote Machine</CardTitle>
          <CardDescription>Generate a Random Quote</CardDescription>
        </CardHeader>
        <CardContent className="flex grow flex-col gap-2">
          <p id="text">{quote.text}</p>
          <p id="author">- {quote.author}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button id="new-quote" onClick={handleClick}>
            Random
          </Button>
          <a
            id="tweet-quote"
            href="https://twitter.com/intent/tweet"
            target="_blank"
            className={buttonVariants({ variant: "outline" })}
          >
            Tweet
          </a>
        </CardFooter>
      </Card>
    </main>
  );
}
