"use client";
import { useState } from "react";
import TemplateCard from "./templateCard";
import { IoMdAddCircle, IoMdSave, IoMdClose } from "react-icons/io";
import { createPattern } from "@/app/server/dbActions";
import Image from "next/image";

export default function Page() {
  // ✅ State to hold multiple TemplateCard data
  const [cardsData, setCardsData] = useState<number[][][]>([
    getBlankCard(), // Start with one card
  ]);

  const [patternName, setPatternName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});

  // Function to generate a blank card (reusable)
  function getBlankCard(): number[][] {
    return [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
  }

  // Function to add a new blank card
  const handleAddCard = () => {
    setCardsData((prevCards) => [...prevCards, getBlankCard()]);
  };

  // Function to update a specific card's data
  const handleUpdate = (index: number, newCell: number[][]) => {
    setCardsData((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index] = newCell;
      return updatedCards;
    });
  };

  const handleChange = (event: any) => {
    setPatternName(event.target.value);
  };

  const handleSave = async () => {
    setLoading(true);

    const patternData = { patternName: patternName, patternString: cardsData };
    const result = await createPattern(patternData);

    setLoading(false);
    setMessage(result);

    if (result.success) {
      handleClear();
    }
  };

  const handleClear = () => {
    setCardsData([getBlankCard()]);
  };

  const controlButtons = (
    <div className="flex flex-row flex-wrap gap-4 [&_button]:bg-purple-700 [&_button]:text-white [&_button]:px-4 [&_button]:py-2 [&_button]:my-4 [&_button]:rounded hover:[&_button]:bg-purple-500 [&_button]:transition-all [&_button]:duration-250 [&_button]:flex [&_button]:items-center">
      <button onClick={handleAddCard}>
        <IoMdAddCircle /> &nbsp; Add New Card
      </button>
      <button onClick={handleSave}>
        <IoMdSave /> &nbsp;Save Pattern
      </button>
      <button onClick={handleClear}>
        <IoMdClose /> &nbsp; Clear
      </button>
    </div>
  );

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 transition-all duration-500 z-50">
          <div className="">
            <Image
              src="/bingo.gif"
              width={500}
              height={250}
              alt={"Jumping Bingo Cartoon"}
              className="text-lg font-semibold"
            />
          </div>
        </div>
      )}
      <h1 className="text-purple-500 text-4xl">Create a New Pattern</h1>
      <label>
        Pattern Name: &nbsp;
        <input
          type="text"
          className="border-b border-purple-500 focus:outline-none p-2"
          onChange={handleChange}
          value={patternName}
        />
      </label>
      {controlButtons}
      <div className="mt-4 flex flex-row flex-wrap gap-8">
        {cardsData.map((cardData, index) => (
          <TemplateCard
            key={index}
            index={index}
            onUpdateAction={handleUpdate}
          />
        ))}
      </div>
      {cardsData.length > 3 ? controlButtons : ""}
      {/* <pre className="mt-4 p-4 bg-gray-200">
        {JSON.stringify(cardsData, null, 2)}
      </pre> */}
    </div>
  );
}
