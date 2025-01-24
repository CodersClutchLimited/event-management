"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

interface CountDownProps {
  registrationDeadline: string;
  eventStart: string;
  status: "upcoming" | "ongoing" | "completed" | "canceled";
}

const CountDown: React.FC<CountDownProps> = ({
  registrationDeadline,
  eventStart,
  status,
}) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!registrationDeadline || !eventStart) return;

    if (status === "completed" || status === "canceled") {
      setCountdown("Registration closed");
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      const registrationDate = new Date(registrationDeadline);
      const eventDate = new Date(eventStart);

      if (status === "ongoing") {
        setCountdown("Event is ongoing");
        return;
      }

      if (now >= eventDate) {
        setCountdown("Event started");
        return;
      }

      let targetDate = now < registrationDate ? registrationDate : eventDate;
      let label =
        now < registrationDate
          ? "Registration closes in: "
          : "Event starts in: ";

      const timeLeft = targetDate.getTime() - now.getTime();

      if (timeLeft <= 0) {
        setCountdown(
          now < registrationDate ? "Registration closed" : "Event started"
        );
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);

      setCountdown(`${label} ${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [registrationDeadline, eventStart, status]);

  return <Badge>{countdown}</Badge>;
};

export default CountDown;
