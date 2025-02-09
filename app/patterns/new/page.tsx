"use client";
import TemplateCard from "./templateCard";
import { useState } from "react";

export default function NewPattern() {
  const [cardsData, setCardsData] = useState([]);

  // Function to update state for each card
  const handleUpdate = (index: number, newSquares: object) => {
    setCardsData((prevData) => {
      const updatedData = [...prevData];
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
