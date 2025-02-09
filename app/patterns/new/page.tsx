"use client";
import TemplateCard, { Row } from "./templateCard";
import { useState } from "react";

export default function NewPattern() {
  // ✅ Explicitly type the state
  const [cardsData, setCardsData] = useState<Row[][]>([]);

  // Function to update state for each card
  const handleUpdate = (index: number, newSquares: Row[]) => {
    setCardsData((prevData) => {
      const updatedData: Row[][] = [...prevData]; // ✅ Ensure type safety
      updatedData[index] = newSquares;
      return updatedData;
    });
  };

  return (
    <div>
      <h1>Multiple Template Cards</h1>
      {[0, 1, 2].map((index) => (
        <TemplateCard key={index} index={index} onUpdateAction={handleUpdate} />
      ))}
      <pre>{JSON.stringify(cardsData, null, 2)}</pre>
    </div>
  );
}
