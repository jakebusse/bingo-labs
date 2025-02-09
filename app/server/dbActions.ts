"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

// export async function createComment(formData: FormData) {
//   const comment = formData.get("comment") as string;

//   // Input validation: Ensure comment is not empty or too long
//   if (!comment || comment.trim().length === 0) {
//     throw new Error("Comment cannot be empty.");
//   }
//   if (comment.length > 500) {
//     throw new Error("Comment is too long (max 500 characters).");
//   }

//   try {
//     await sql("INSERT INTO comments (comment) VALUES ($1)", [comment]);
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to insert comment.");
//   }
// }

type PatternData = {
  patternName: string;
  patternString: number[][][];
};

export async function createPattern(patternData: PatternData) {
  if (
    patternData.patternName.length < 1 ||
    patternData.patternName.length > 50
  ) {
    throw new Error("Pattern name must be between 1-50 characters");
  }

  try {
    await sql(
      "INSERT INTO patterns (name, string, approved) VALUES ($1, $2, $3)",
      [patternData.patternName, patternData.patternString, false]
    );
    return { success: true, message: "Pattern saved successfully!" };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Failed to create pattern: " + error };
  }
}
