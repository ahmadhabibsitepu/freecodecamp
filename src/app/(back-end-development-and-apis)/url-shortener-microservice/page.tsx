"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [input, setInput] = useState<string>("");
  const [shorturl, setShorturl] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const router = useRouter();
  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInput(event.target.value);
  };

  const handleShorturlChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShorturl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setResult(null);
    try {
      const response = await fetch(`/api/shorturl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: input }),
      });

      const data = await response.json();

      setResult(JSON.stringify(data));
    } catch (error) {
      setResult("Something Went Wrong");
    }
  };

  const handleShorturlSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setResult(null);
    if (!shorturl) {
      return setResult("Please enter a short URL");
    }
    router.push(`/api/shorturl/${shorturl}`);
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight md:text-4xl">
        URL Shortener Microservice
      </h1>
      <div className="flex grow gap-8">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <Label>Enter URL</Label>
          <Input
            placeholder="Enter URL"
            onChange={handleInputChange}
            value={input}
          />
          <Button type="submit">Submit</Button>
        </form>
        <form
          onSubmit={handleShorturlSubmit}
          className="flex w-full flex-col gap-4"
        >
          <Label>Visit URL</Label>
          <Input
            placeholder="Enter URL"
            onChange={handleShorturlChange}
            value={shorturl}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
      {result !== null && (
        <div className="flex flex-col gap-2">
          <Label>Result :</Label>
          <pre>
            <code>{result.toString().replaceAll(",", ",\n")}</code>
          </pre>
        </div>
      )}
    </>
  );
};

export default Page;
