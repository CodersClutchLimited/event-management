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
export function formatReadableDate(dateInput: string | Date | undefined | null): string | undefined {
  // Check for undefined or null
  if (!dateInput) {
    return "Invalid date"; // Return a fallback message for undefined or null values
  }

  // Convert to Date object if the input is a string
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return "Invalid date"; // Return a fallback message for invalid date formats
  }

  // Return a formatted date with time (hours and minutes)
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Display the time in 12-hour format with AM/PM
  });
}

export function formatDate(dateString: string): string | undefined {
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
  });
}


export const deepConvertToPlainObject = (obj: any): Record<string, any> => {
  return JSON.parse(JSON.stringify(obj));
};
