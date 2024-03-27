"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setResult(null);
    try {
      const response = await fetch(`/api/whoami`);

      const data = await response.json();

      setResult(JSON.stringify(data));
    } catch (error) {
      setResult("Something Went Wrong");
    }
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight md:text-4xl">
        Request Header Parser Microservice
      </h1>
      <form onSubmit={handleSubmit} className="flex grow flex-col gap-4">
        <Button type="submit">Check</Button>
      </form>
      {result !== null && (
        <div className="flex flex-col gap-2">
          <Label>Result :</Label>
          <code>{result}</code>
        </div>
      )}
    </>
  );
};

export default Page;
