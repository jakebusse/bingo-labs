"use client";
import { FaStar, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";

type ChildProps = {
  index: number;
  onUpdateAction: (arg0: number, arg1: number[][]) => void;
};

export default function TemplateCard({ index, onUpdateAction }: ChildProps) {
  const [card, setCard] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  // Notify parent whenever state changes
  useEffect(() => {
    onUpdateAction(index, card);
  }, [card]);

  const toggleCell = (row: number, cell: number) => {
    let newCard = [];
    for (let r = 0; r < card.length; r++) {
      let newRow = [];
      for (let c = 0; c < card[r].length; c++) {
        if (r === row && c === cell) {
          newRow.push(Number(!card[r][c]));
        } else {
          newRow.push(card[r][c]);
        }
      }
      newCard.push(newRow);
    }
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
            <tr key={"R" + rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={"R" + rowIndex + "-C" + cellIndex}
                  className={`cursor-pointer ${
                    rowIndex === 2 && cellIndex === 2 && cell === 1
                      ? "bg-green-800 text-white"
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
