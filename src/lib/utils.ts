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

export function stringToArray(data: string) {
    return data.split(",");
}

export function productNameToUrl(productName: string) {
    const url = productName.split(" ").join("_")

    return url
}

export function urlToProductName(url: string | string[]) {
    const productName = url.split("_").join(" ").replace("%C3%A9", "é")

    return productName
}
