"use client";
import { useState } from "react";
import TemplateCard, { Row } from "./templateCard";
import { IoMdAddCircle, IoMdSave } from "react-icons/io";

export default function Page() {
  // ✅ State to hold multiple TemplateCard data
  const [cardsData, setCardsData] = useState<Row[][]>([
    getBlankCard(), // Start with one card
  ]);

  const [patternName, setPatternName] = useState("");

  // Function to generate a blank card (reusable)
  function getBlankCard(): Row[] {
    return [
      {
        row: 0,
        rowSquares: Array(5)
          .fill(null)
          .map((_, i) => ({ name: `B${i + 1}`, value: false })),
      },
      {
        row: 1,
        rowSquares: Array(5)
          .fill(null)
          .map((_, i) => ({ name: `I${i + 1}`, value: false })),
      },
      {
        row: 2,
        rowSquares: Array(5)
          .fill(null)
          .map((_, i) => ({ name: `N${i + 1}`, value: false })),
      },
      {
        row: 3,
        rowSquares: Array(5)
          .fill(null)
          .map((_, i) => ({ name: `G${i + 1}`, value: false })),
      },
      {
        row: 4,
        rowSquares: Array(5)
          .fill(null)
          .map((_, i) => ({ name: `O${i + 1}`, value: false })),
      },
    ];
  }

  // Function to add a new blank card
  const handleAddCard = () => {
    setCardsData((prevCards) => [...prevCards, getBlankCard()]);
  };

  // Function to update a specific card's data
  const handleUpdate = (index: number, newSquares: Row[]) => {
    setCardsData((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index] = newSquares;
      return updatedCards;
    });
  };

  return (
    <div>
      <h1 className="text-purple-500 text-4xl">Create a New Pattern</h1>
      <div className="flex flex-row flex-wrap gap-4 [&_button]:bg-purple-700 [&_button]:text-white [&_button]:px-4 [&_button]:py-2 [&_button]:my-4 [&_button]:rounded hover:[&_button]:bg-purple-500 [&_button]:transition-all [&_button]:duration-250 [&_button]:flex [&_button]:items-center">
        <button onClick={handleAddCard}>
          <IoMdAddCircle /> &nbsp; Add New Card
        </button>
        <button>
          <IoMdSave /> &nbsp;Save Pattern
        </button>
      </div>
      <label>
        Pattern Name: &nbsp;
        <input
          type="text"
          className="border-b border-purple-500 focus:outline-none p-2"
        />
      </label>
      <div className="mt-4 flex flex-row flex-wrap gap-8">
        {cardsData.map((cardData, index) => (
          <TemplateCard
            key={index}
            index={index}
            onUpdateAction={handleUpdate}
          />
        ))}
      </div>
      <pre className="mt-4 p-4 bg-gray-200">
        {JSON.stringify(cardsData, null, 2)}
      </pre>
    </div>
  );
}
