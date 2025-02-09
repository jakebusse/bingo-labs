"use client";

import { useState, useEffect } from "react";
import {
  getUnapprovedPatterns,
  getApprovedPatterns,
} from "@/app/server/dbActions";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Loading from "@/app/loading";

export default withPageAuthRequired(function PatternsAdmin() {
  const [unapprovedPatterns, setUnapprovedPatterns] = useState<
    { id: number; name: string; created: string }[]
  >([]);
  const [approvedPatterns, setApprovedPatterns] = useState<
    { id: number; name: string; created: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null); // ✅ Ensure type is correct
  const [loadingUnapproved, setLoadingUnapproved] = useState(false);
  const [loadingApproved, setLoadingApproved] = useState(false);

  // ✅ Fetch Unapproved Patterns Once
  useEffect(() => {
    async function fetchUnapprovedPatterns() {
      setLoadingUnapproved(true);
      const unapproved = await getUnapprovedPatterns();
      setLoadingUnapproved(false);
      if (unapproved.success) {
        if (Array.isArray(unapproved.result)) {
          setUnapprovedPatterns(unapproved.result); // ✅ Only set array
          setError(null); // ✅ Clear error if successful
        } else {
          setError("Unexpected data format.");
        }
      } else {
        setError(
          typeof unapproved.result === "string"
            ? unapproved.result
            : "Unknown error"
        );
      }
    }

    fetchUnapprovedPatterns();
  }, []); // ✅ Runs only once

  // ✅ Fetch Approved Patterns Once
  useEffect(() => {
    async function fetchApprovedPatterns() {
      setLoadingApproved(true);
      const approved = await getApprovedPatterns();
      setLoadingApproved(false);
      if (approved.success) {
        if (Array.isArray(approved.result)) {
          setApprovedPatterns(approved.result); // ✅ Corrected this line
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
      {loadingApproved || loadingUnapproved ? <Loading /> : ""}
      {/* Unapproved Patterns Table */}
      <div>
        <h1 className="text-2xl mb-4">Unapproved Patterns</h1>

        {error && <p className="text-red-500">{error}</p>}

        {unapprovedPatterns.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {unapprovedPatterns.map((pattern) => (
                <tr
                  key={pattern.id}
                  className="p-4 border-b hover:bg-gray-100 cursor-pointer"
                >
                  <td className="p-4">{pattern.id}</td>
                  <td className="p-4">{pattern.name}</td>
                  <td className="p-4">
                    {new Date(pattern.created).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No unapproved patterns found.</p>
        )}
      </div>

      <hr className="border-1/2 border-gray-100 w-full my-8" />

      {/* Approved Patterns Table */}
      <div>
        <h1 className="text-2xl mb-4">Approved Patterns</h1>

        {error && <p className="text-red-500">{error}</p>}

        {approvedPatterns.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {approvedPatterns.map((pattern) => (
                <tr
                  key={pattern.id}
                  className="p-4 border-b hover:bg-gray-100 cursor-pointer"
                >
                  <td className="p-4">{pattern.id}</td>
                  <td className="p-4">{pattern.name}</td>
                  <td className="p-4">
                    {new Date(pattern.created).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No approved patterns found.</p>
        )}
      </div>
    </div>
  );
});
