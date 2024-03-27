import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 className="flex flex-col items-center justify-center gap-4 text-4xl font-extrabold tracking-tight">
        FreeCodeCamp Project By <span>Ahmad Ihsan Habibullah</span>
      </h1>
      <div className="flex gap-8">
        <Card className="space-y-4 p-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Front End Development Libraries
          </h2>
          <ul className="list-inside list-disc space-y-4">
            <li>
              <a href="/random-quote-machine">Random Quote Machine</a>
            </li>
            <li>
              <a href="/markdown-previewer">Markdown Previewer</a>
            </li>
            <li>
              <a href="/drum-machine">Drum Machine</a>
            </li>
            <li>
              <a href="/javascript-calculator">Javascript Calculator</a>
            </li>
            <li>
              <a href="/25+5-clock">25 + 5 Clock</a>
            </li>
          </ul>
        </Card>
        <Card className="space-y-4 p-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Back End Development And APIs
          </h2>
          <ul className="list-inside list-disc space-y-4">
            <li>
              <a href="/timestamp-microservice">Timestamp Microservice</a>
            </li>
            <li>
              <a href="/request-header-parser-microservice">
                Request Header Parser Microservice
              </a>
            </li>
            <li>
              <a href="/url-shortener-microservice">
                URL Shortener Microservice
              </a>
            </li>
            <li>
              <a href="/exercise-tracker">Exercise Tracker</a>
            </li>
            <li>
              <a href="/file-metadata-microservice">
                File Metadata Microservice
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
