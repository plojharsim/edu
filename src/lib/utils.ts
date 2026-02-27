import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prepares input for processing by trimming whitespace.
 * We rely on React's built-in escaping for XSS protection 
 * rather than fragile regex-based stripping.
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input.trim();
}