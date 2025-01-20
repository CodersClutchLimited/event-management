"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

const CountDown = ({ date }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!date) return;

    const updateCountdown = () => {
      const now = new Date();
      const deadline = new Date(date);
      const timeLeft = deadline - now;

      if (timeLeft <= 0) {
        setCountdown("Registration closed");
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [date]);
  return <Badge>{countdown}</Badge>;
};

export default CountDown;
