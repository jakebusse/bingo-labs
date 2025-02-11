"use client";
import { FaStar, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";

type ChildProps = {
  index: number;
  cardData: number[][]; // Accept card data as a prop
  onUpdateAction: (arg0: number, arg1: number[][]) => void;
};

export default function TemplateCard({
  index,
  cardData,
  onUpdateAction,
}: ChildProps) {
  const [card, setCard] = useState(cardData); // Initialize from props

  useEffect(() => {
    setCard(cardData); // Sync with parent updates
  }, [cardData]); // Reacts to changes from `Page.tsx`

  useEffect(() => {
    onUpdateAction(index, card); // Notify parent on change
  }, [card]);

  const toggleCell = (row: number, cell: number) => {
    const newCard = card.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === cell ? Number(!c) : c))
    );
    setCard(newCard);
  };

  return (
    <div>
      <table className="border [&_td]:p-6 [&_td]:border [&_span]:text-white [&_td.selected]:bg-green-800">
        <thead>
          <tr>
            <th>B</th>
            <th>I</th>
            <th>N</th>
            <th>G</th>
            <th>O</th>
          </tr>
        </thead>
        <tbody>
          {card.map((row, rowIndex) => (
            <tr key={`R${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`R${rowIndex}-C${cellIndex}`}
                  className={`cursor-pointer ${
                    rowIndex === 2 && cellIndex === 2 && cell === 1
                      ? "bg-green-800 text-white pointer-events-none"
                      : rowIndex === 2 && cellIndex === 2
                      ? "text-black"
                      : cell === 1
                      ? "text-white bg-green-800"
                      : "text-white bg-white"
                  }`}
                  onClick={() => toggleCell(rowIndex, cellIndex)}
                >
                  {rowIndex === 2 && cellIndex === 2 ? <FaStar /> : <FaCheck />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
