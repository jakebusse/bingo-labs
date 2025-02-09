"use client";
import { FaStar, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";

type ChildProps = {
  index: number;
  onUpdateAction: (arg0: number, arg1: Row[]) => void;
};

export interface Square {
  name: string;
  value: boolean;
}

export interface Row {
  row: string;
  rowSquares: Square[];
}

export default function TemplateCard({ index, onUpdateAction }: ChildProps) {
  const [squares, setSquares] = useState([
    {
      row: "B",
      rowSquares: [
        { name: "B1", value: false },
        { name: "I1", value: false },
        { name: "N1", value: false },
        { name: "G1", value: false },
        { name: "O1", value: false },
      ],
    },
    {
      row: "I",
      rowSquares: [
        { name: "B2", value: false },
        { name: "I2", value: false },
        { name: "N2", value: false },
        { name: "G2", value: false },
        { name: "O2", value: false },
      ],
    },
    {
      row: "N",
      rowSquares: [
        { name: "B3", value: false },
        { name: "I3", value: false },
        { name: "N3", value: false },
        { name: "G3", value: false },
        { name: "O3", value: false },
      ],
    },
    {
      row: "G",
      rowSquares: [
        { name: "B4", value: false },
        { name: "I4", value: false },
        { name: "N4", value: false },
        { name: "G4", value: false },
        { name: "O4", value: false },
      ],
    },
    {
      row: "O",
      rowSquares: [
        { name: "B5", value: false },
        { name: "I5", value: false },
        { name: "N5", value: false },
        { name: "G5", value: false },
        { name: "O5", value: false },
      ],
    },
  ]);

  // Notify parent whenever state changes
  useEffect(() => {
    onUpdateAction(index, squares);
  }, [squares]);

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
          {squares.map((row, rowIndex) => (
            <tr key={row.row}>
              {row.rowSquares.map((square, squareIndex) => (
                <td
                  className={`text-white cursor-pointer ${
                    square.value ? "text-white bg-green-700" : ""
                  } ${square.name === "N3" ? "text-black" : ""}`}
                  key={square.name}
                  onClick={() => {
                    setSquares((prevSquares) => {
                      const newSquares = prevSquares.map((r, rIdx) =>
                        rIdx === rowIndex
                          ? {
                              ...r,
                              rowSquares: r.rowSquares.map((s, sIdx) =>
                                sIdx === squareIndex
                                  ? { ...s, value: !s.value }
                                  : s
                              ),
                            }
                          : r
                      );
                      return newSquares;
                    });
                  }}
                >
                  {square.name === "N3" ? <FaStar /> : <FaCheck />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
