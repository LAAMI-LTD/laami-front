import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "x5q2703k",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
});