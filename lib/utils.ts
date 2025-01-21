import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  try {
    return await response.json();
  } catch (error) {
    return null;
  }
};
export function formatReadableDate(dateString: string): string | undefined {
  const date = new Date(dateString);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  // Return a formatted date with time (hours and minutes)
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // This will display the time in 12-hour format with AM/PM
  });
}
