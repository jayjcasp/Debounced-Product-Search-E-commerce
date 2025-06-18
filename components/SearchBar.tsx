"use client";

import { useState, useEffect } from "react";

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(term.trim());
    }, 500); // debounce delay

    return () => clearTimeout(delay);
  }, [term, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      className="w-full p-2 border rounded mb-4"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
    />
  );
}
