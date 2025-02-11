"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPatternById } from "@/app/server/dbActions";
import Loading from "@/app/loading";
import TemplateCard from "../templateCard";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  IoMdAddCircle,
  IoMdSave,
  IoMdClose,
  IoMdTrash,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
} from "react-icons/io";

export default function PatternPage() {
  const { user, isLoading } = useUser();
  const params = useParams();
  const id = params.id ? String(params.id) : "";

  const [pattern, setPattern] = useState<{
    id: number;
    name: string;
    string: string;
    approved: boolean;
  } | null>(null);
  const [patternString, setPatternString] = useState<number[][][]>([[[0]]]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPattern() {
      setLoading(true);
      const patternQuery = await getPatternById(id);
      setLoading(false);
      if (patternQuery.success) {
        setPattern(patternQuery.result);
        setError(null);
      } else {
        setError(
          typeof patternQuery.result === "string"
            ? patternQuery.result
            : "Unknown error"
        );
      }
    }

    fetchPattern();
  }, [id]);

  useEffect(() => {
    if (pattern) {
      setPatternString(JSON.parse(pattern.string));
    }
  }, [pattern]);

  const controlButtons = (
    <div className="flex flex-row flex-wrap gap-4 [&_button]:bg-purple-700 [&_button]:text-white [&_button]:px-4 [&_button]:py-2 [&_button]:my-4 [&_button]:rounded hover:[&_button]:bg-purple-500 [&_button]:transition-all [&_button]:duration-250 [&_button]:flex [&_button]:items-center">
      <button>
        <IoMdAddCircle /> &nbsp; Add New Card
      </button>
      <button>
        <IoMdSave /> &nbsp;Save Pattern
      </button>
      <button>
        <IoMdClose /> &nbsp; Reset Pattern
      </button>
      <button>
        <IoMdTrash /> &nbsp; Delete Pattern
      </button>
      {pattern && pattern.approved ? (
        <button>
          <IoMdCloseCircle /> &nbsp; Unapprove Pattern
        </button>
      ) : (
        <button>
          <IoMdCheckmarkCircle /> &nbsp; Approve Pattern
        </button>
      )}
    </div>
  );

  if (!id) return <p className="text-red-500">Invalid pattern ID.</p>;
  if (loading || isLoading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!pattern) return <p className="text-gray-500">No pattern found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-600">{pattern.name}</h1>
      <table className="text-gray-600">
        <tbody className="first:[&_td]:font-bold first:[&_td]:text-right first:[&_td]:pr-2">
          <tr>
            <td>ID: </td>
            <td>{pattern.id}</td>
          </tr>
          <tr>
            <td>Approved: </td>
            <td>{pattern.approved ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
      {user && controlButtons}
      <div
        className={`mt-4 flex flex-row flex-wrap gap-8 ${
          user ? "" : "pointer-events-none"
        }`}
      >
        {patternString.map((cardData, index) => (
          <TemplateCard
            key={index}
            index={index}
            cardData={cardData} // Pass card data from parent
            onUpdateAction={() => null}
          />
        ))}
      </div>
    </div>
  );
}
