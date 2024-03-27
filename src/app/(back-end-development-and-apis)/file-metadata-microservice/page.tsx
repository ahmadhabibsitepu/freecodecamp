"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [file, setFile] = useState<File>();
  const [result, setResult] = useState<any>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setResult(null);
    try {
      if (!file) {
        return setResult("Please select a file");
      }

      const formData = new FormData();
      formData.append("upfile", file);

      const response = await fetch(`/api`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setResult(JSON.stringify(data));
    } catch (error) {
      setResult("Something Went Wrong");
    }
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight md:text-4xl">
        File Metadata Microservice
      </h1>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <Label>Enter URL</Label>
        <Input type="file" onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </form>

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
