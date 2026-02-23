/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Author, NewAuthorForm } from "../types";

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  async function fetchAuthors() {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`);
      if (res.ok) {
        const data = await res.json();
        setAuthors(data);
      }
    } catch (err) {
      console.error("Failed to fetch authors:", err);
      setError("Failed to fetch authors");
    } finally {
      setLoading(false);
    }
  }

  async function createAuthor(authorData: NewAuthorForm) {
    try {
      setError(null);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authorData),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt);
      }

      const newAuthor = await res.json();
      setAuthors((prev) => [...prev, newAuthor]);
      return newAuthor;
    } catch (err: any) {
      setError(err.message || "Failed to create author");
      throw err;
    }
  }

  return { authors, loading, error, fetchAuthors, createAuthor };
}