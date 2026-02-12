"use server";

import axios from "axios";
import { serverBaseURI } from "@/lib/baseURI";

export async function createBook(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.post(`${serverBaseURI}/books`, formData);

    return { success: true };
  } catch (err) {
    console.error("An error occured", err);
    throw err;
  }
}
