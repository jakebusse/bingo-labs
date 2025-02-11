"use client";

import { useState, useEffect } from "react";
import { getApprovedPatterns } from "@/app/server/dbActions";
import Loading from "@/app/loading";
import Link from "next/link";

export default function Patterns() {
  const [patterns, setPatterns] = useState<
    { id: number; name: string; created: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null); // ✅ Ensure type is correct
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchApprovedPatterns() {
      setLoading(true);
      const approved = await getApprovedPatterns();
      setLoading(false);
      if (approved.success) {
        if (Array.isArray(approved.result)) {
          setPatterns(approved.result); // ✅ Corrected this line
          setError(null);
        } else {
          setError("Unexpected data format.");
        }
      } else {
        setError(
          typeof approved.result === "string"
            ? approved.result
            : "Unknown error"
        );
      }
    }

    fetchApprovedPatterns();
  }, []); // ✅ Runs only once

  return (
    <div>
      {loading ? <Loading /> : ""}
      {/* Unapproved Patterns Table */}
      <div>
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Patterns</h1>

        {error && <p className="text-red-500">{error}</p>}

        {patterns.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {patterns.map((pattern) => (
                <tr
                  key={pattern.id}
                  className="p-4 border-b hover:bg-gray-100 cursor-pointer"
                >
                  <td className="p-4">{pattern.id}</td>
                  <td className="p-4">
                    <Link
                      href={`/patterns/${pattern.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {pattern.name}
                    </Link>
                  </td>
                  <td className="p-4">
                    {new Date(pattern.created).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No patterns found.</p>
        )}
      </div>
    </div>
  );
}
