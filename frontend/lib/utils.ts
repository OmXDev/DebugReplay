import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns"

/**
 * Formats a timestamp to a relative time string like "3 minutes ago"
 * @param date - A string or Date object
 * @returns Human-readable time difference
 */
export function timeAgo(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
