"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

const BUTTONS = [
  { id: "clear", value: "AC", style: "col-span-2" },
  { id: "divide", value: "/", style: "" },
  { id: "multiply", value: "*", style: "" },
  { id: "seven", value: "7", style: "" },
  { id: "eight", value: "8", style: "" },
  { id: "nine", value: "9", style: "" },
  { id: "subtract", value: "-", style: "" },
  { id: "four", value: "4", style: "" },
  { id: "five", value: "5", style: "" },
  { id: "six", value: "6", style: "" },
  { id: "add", value: "+", style: "" },
  { id: "one", value: "1", style: "" },
  { id: "two", value: "2", style: "" },
  { id: "three", value: "3", style: "" },
  { id: "equals", value: "=", style: "row-span-2" },
  { id: "zero", value: "0", style: "col-span-2" },
  { id: "decimal", value: ".", style: "" },
];

export default function Home() {
  const [display, setDisplay] = useState("0");
  const lastInput = useRef<string>("");
  const allowDecimal = useRef<boolean>(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id, value } = event.currentTarget;

    if (id === "clear") {
      lastInput.current = "";
      allowDecimal.current = true;
      return setDisplay("0");
    }

    if (/[0-9]/.test(value) && (display === "0" || lastInput.current === "")) {
      lastInput.current = value;
      return setDisplay(value);
    }

    if (id === "decimal") {
      if (!allowDecimal.current) {
        return;
      }

      lastInput.current = ".";
      allowDecimal.current = false;

      if (lastInput.current === "") {
        return setDisplay("0.");
      }

      if (/\/|\*|\-|\+/.test(lastInput.current)) {
        return setDisplay((prev) => prev + "0.");
      }
    }

    if (id === "subtract" && display.slice(-2, display.length) !== "--") {
      allowDecimal.current = true;
      lastInput.current = value;
      return setDisplay((prev) => prev + value);
    }

    if (/\/|\*|\+/.test(value)) {
      allowDecimal.current = true;

      if (/\/|\*|\-|\+|\./.test(lastInput.current)) {
        lastInput.current = value;

        if (/^[/*+-]{2}$/.test(display.slice(-2, display.length))) {
          return setDisplay((prev) => prev.slice(0, -2) + value);
        }
        return setDisplay((prev) => prev.slice(0, -1) + value);
      }
    }

    if (id === "equals") {
      lastInput.current = "";
      allowDecimal.current = true;
      const formula = display.replaceAll("--", "+");
      if (/\/|\*|\-|\+/.test(lastInput.current)) {
        const result = eval(formula.slice(0, -1));
        return setDisplay((Math.round(result * 10000) / 10000).toString());
      }
      const result = eval(formula);
      return setDisplay((Math.round(result * 10000) / 10000).toString());
    }

    lastInput.current = value;
    return setDisplay((prev) => prev + value);
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-0.5">
      <div
        id="display"
        className="flex h-20 w-1/4 items-end justify-end rounded-md border p-2"
      >
        {display}
      </div>
      <div className="grid aspect-square w-1/4 grid-cols-4 gap-0.5">
        {BUTTONS.map((button) => {
          return (
            <Button
              key={button.id}
              id={button.id}
              value={button.value}
              className={cn(
                "h-full w-full focus-visible:ring-offset-0",
                button.style,
              )}
              variant={"outline"}
              onClick={handleClick}
            >
              {button.value}
            </Button>
          );
        })}
      </div>
    </main>
  );
}
