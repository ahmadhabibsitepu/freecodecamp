"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [execise, setExecise] = useState<{
    id: string;
    description: string;
    duration: string;
    date: string;
  }>({
    id: "",
    description: "",
    duration: "",
    date: "",
  });
  const [result, setResult] = useState<any>(null);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUsername(event.target.value);
  };

  const handleExerciseChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setExecise({
      ...execise,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("username", username);

      const response = await fetch(`/exercise-tracker/api/users`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setResult(JSON.stringify(data));
    } catch (error) {
      setResult("Something Went Wrong");
    }
  };

  const handleAddExercise = async (event: React.FormEvent) => {
    event.preventDefault();
    setResult(null);

    if (!/^\d+$/.test(execise.duration)) {
      return setResult("Please Enter a exercise duration in minutes");
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(execise.date) && execise.date) {
      return setResult("Please Enter a Date in YYYY-MM-DD Format");
    }

    try {
      const formData = new FormData();
      formData.append("description", execise.description);
      formData.append("duration", execise.duration);
      formData.append("date", execise.date);

      const response = await fetch(
        `/exercise-tracker/api/users/${execise.id}/exercises`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      setResult(JSON.stringify(data));
    } catch (error) {
      setResult("Something Went Wrong");
    }
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight md:text-4xl">
        Exercise Tracker
      </h1>
      <div className="flex grow gap-8">
        <div className="flex w-full flex-col gap-8">
          <form
            onSubmit={handleCreateUser}
            className="flex w-full flex-col gap-4"
          >
            <Label>Username</Label>
            <Input
              placeholder="Enter Username"
              onChange={handleInputChange}
              value={username}
              required
            />
            <Button type="submit">Submit</Button>
          </form>
          <div className="space-y-1 text-sm">
            <p className="font-semibold">GET user&apos;s exercise log :</p>
            <p>
              /api/users/<span className="font-semibold">:id</span>
              /logs?[from][&to][&limit]
            </p>
            <p>[ ] = optional</p>
            <p>from, to = dates (yyyy-mm-dd)</p>
            <p>limit = number</p>
          </div>
        </div>
        <form
          onSubmit={handleAddExercise}
          className="flex w-full flex-col gap-4"
        >
          <Label>Add Exercise</Label>
          <Input
            name="id"
            onChange={handleExerciseChange}
            placeholder="Enter User ID"
            value={execise.id}
            required
          />
          <Input
            name="description"
            onChange={handleExerciseChange}
            placeholder="Enter Exercise Description"
            value={execise.description}
            required
          />
          <Input
            name="duration"
            onChange={handleExerciseChange}
            placeholder="Enter Exercise Duration (in minutes)"
            value={execise.duration}
            required
          />
          <Input
            name="date"
            onChange={handleExerciseChange}
            placeholder="Enter Exercise Date (YYYY-MM-DD)"
            value={execise.date}
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
