"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setResult(null);
    try {
      const response = await fetch(`/timestamp-microservice/api/${input}`);

      const data = await response.json();

      setResult(JSON.stringify(data));
    } catch (error) {
      setResult("Something Went Wrong");
    }
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight md:text-4xl">
        Timestamp Microservice
      </h1>
      <form onSubmit={handleSubmit} className="flex grow flex-col gap-4">
        <Label>Enter a date / timestamp</Label>
        <Input
          placeholder="Enter a date / timestamp"
          onChange={handleChange}
          value={input}
        />
        <Button type="submit">Submit</Button>
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
