"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [currentActive, setCurrentActive] = useState({
    session: "Session",
    minutes: 25,
    seconds: 0,
  });
  const [isTimerRun, setIsItimerRun] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    if (id === "break-increment") {
      if (breakTime < 60) {
        setBreakTime(breakTime + 1);
      }
    } else if (id === "break-decrement") {
      if (breakTime > 1) {
        setBreakTime(breakTime - 1);
      }
    } else if (id === "session-increment") {
      if (sessionTime < 60) {
        setSessionTime(sessionTime + 1);
      }
    } else if (id === "session-decrement") {
      if (sessionTime > 1) {
        setSessionTime(sessionTime - 1);
      }
    }
  };

  const startOrStopTimer = () => {
    clearTimeout(timeout.current);
    setIsItimerRun(!isTimerRun);
  };

  const resetTimer = () => {
    if (audioRef.current !== null) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
    clearTimeout(timeout.current);
    setIsItimerRun(false);
    setBreakTime(5);
    setSessionTime(25);
    setCurrentActive({
      session: "Session",
      minutes: 25,
      seconds: 0,
    });
  };

  useEffect(() => {
    if (isTimerRun) {
      return;
    }

    if (currentActive.session === "Session") {
      setCurrentActive({
        session: "Session",
        minutes: sessionTime,
        seconds: 0,
      });
    }
    if (currentActive.session === "Break") {
      setCurrentActive({
        session: "Break",
        minutes: breakTime,
        seconds: 0,
      });
    }
  }, [breakTime, sessionTime]);

  useEffect(() => {
    if (isTimerRun) {
      timeout.current = setTimeout(() => {
        if (currentActive.seconds > 0) {
          setCurrentActive((prev) => {
            return {
              ...prev,
              seconds: prev.seconds - 1,
            };
          });
        } else if (currentActive.minutes > 0) {
          setCurrentActive((prev) => {
            return {
              ...prev,
              minutes: prev.minutes - 1,
              seconds: 59,
            };
          });
        } else if (currentActive.seconds === 0 && currentActive.minutes === 0) {
          if (audioRef.current !== null) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }

          if (currentActive.session === "Session") {
            setCurrentActive({
              session: "Break",
              minutes: breakTime,
              seconds: 0,
            });
          } else if (currentActive.session === "Break") {
            setCurrentActive({
              session: "Session",
              minutes: sessionTime,
              seconds: 0,
            });
          }
        }
      }, 1000);
    }
  }, [isTimerRun, currentActive]);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-5xl font-extrabold tracking-tight md:text-4xl">
        25 + 5 Clock
      </h1>
      <div className="flex gap-8">
        <Card className="flex flex-col items-center gap-4 p-6">
          <p id="break-label">Break Length</p>
          <div className="flex items-center gap-4">
            <Button id="break-increment" onClick={handleClick}>
              +
            </Button>
            <p id="break-length">{breakTime}</p>
            <Button id="break-decrement" onClick={handleClick}>
              -
            </Button>
          </div>
        </Card>
        <Card className="flex flex-col items-center gap-4 p-6">
          <p id="session-label">Session Length</p>
          <div className="flex items-center gap-4">
            <Button id="session-increment" onClick={handleClick}>
              +
            </Button>
            <p id="session-length">{sessionTime}</p>
            <Button id="session-decrement" onClick={handleClick}>
              -
            </Button>
          </div>
        </Card>
      </div>
      <Card className="flex flex-col items-center gap-4 p-6">
        <p id="timer-label">{currentActive.session}</p>
        <p id="time-left">
          {currentActive.minutes.toString().padStart(2, "0")}:
          {currentActive.seconds.toString().padStart(2, "0")}
        </p>
        <div className="flex gap-4">
          <Button id="start_stop" onClick={startOrStopTimer}>
            {isTimerRun ? "Stop" : "Start"}
          </Button>
          <Button id="reset" onClick={resetTimer}>
            Reset
          </Button>
        </div>
        <audio
          id="beep"
          ref={audioRef}
          src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        />
      </Card>
    </main>
  );
}
