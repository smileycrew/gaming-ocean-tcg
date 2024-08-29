import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toUsdPrice(priceToFormat: number) {
  return priceToFormat.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function convertUnixTimestampToDate(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formattedDate;
}
