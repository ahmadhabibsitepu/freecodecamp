"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

const KEYS = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
const AUDIOS = [
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
];

const playSound = (id: string) => {
  const audio = document
    .getElementById(id.toUpperCase())
    ?.getElementsByClassName("clip")[0] as HTMLAudioElement | null;

  if (!audio) {
    return;
  }

  audio.currentTime = 0;
  audio.play();

  const display = document.getElementById("display");

  if (!display) {
    return;
  }

  display.innerText = audio.src
    .replace("https://s3.amazonaws.com/freecodecamp/drums/", "")
    .replace(".mp3", "")
    .replaceAll(/[^a-zA-Z0-9]/g, " ");
};

const HandleKeyDown = (event: KeyboardEvent) => {
  const { key } = event;
  playSound(key);
};

export default function Home() {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { id } = event.currentTarget;
    playSound(id);
  };

  useEffect(() => {
    document.addEventListener("keydown", HandleKeyDown);
    return () => {
      document.removeEventListener("keydown", HandleKeyDown);
    };
  }, []);

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold tracking-tight md:text-4xl">
        Drum Machine
      </h1>
      <div
        id="drum-machine"
        className="flex flex-col items-center justify-center gap-4"
      >
        <div id="display"></div>
        <div className="grid grid-cols-3">
          {KEYS.map((key, index) => {
            return (
              <div
                id={key}
                key={index}
                className={cn(
                  buttonVariants(),
                  `drum-pad flex size-20 cursor-pointer items-center justify-center rounded-sm border`,
                )}
                onClick={handleClick}
              >
                {key}
                <audio className="clip" id={key} src={AUDIOS[index]} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
