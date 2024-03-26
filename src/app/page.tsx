import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 className="flex flex-col items-center justify-center gap-4 text-4xl font-extrabold tracking-tight">
        FreeCodeCamp Project By <span>Ahmad Ihsan Habibullah</span>
      </h1>
      <ul className="space-y-4">
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
    </main>
  );
}
