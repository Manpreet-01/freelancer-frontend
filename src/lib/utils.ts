import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiErrMsg(err: any, fallBackMsg: string) {
  return err.response?.data?.message || err.response?.message || err.message || fallBackMsg;
}