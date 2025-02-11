"use server";

import { Pool, QueryResult, QueryResultRow } from "pg";

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

// Utility function for executing queries
async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: (string | number | boolean | null)[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result: QueryResult<T> = await client.query(text, params);
    return result.rows;
  } catch (err) {
    console.error("Database query failed:", err);
    throw new Error("Database query failed.");
  } finally {
    client.release();
  }
}

// Type definition for patterns
type PatternData = {
  patternName: string;
  patternString: number[][][];
};

// Function to create a new comment
export async function createComment(formData: FormData) {
  const comment = formData.get("comment") as string;

  // Validate input
  if (!comment || comment.trim().length === 0) {
    return { success: false, message: "Comment cannot be empty." };
  }
  if (comment.length > 500) {
    return {
      success: false,
      message: "Comment is too long (max 500 characters).",
    };
  }

  try {
    await query("INSERT INTO comments (comment) VALUES ($1)", [comment]);
    return { success: true, message: "Comment added successfully!" };
  } catch (err) {
    console.error("Failed to insert comment:", err);
    return { success: false, message: "Failed to insert comment." };
  }
}

// Function to create a new pattern
export async function createPattern(patternData: PatternData) {
  if (
    patternData.patternName.length < 1 ||
    patternData.patternName.length > 50
  ) {
    return {
      success: false,
      message: "Pattern name must be between 1-50 characters.",
    };
  }

  try {
    await query(
      "INSERT INTO patterns (name, string, approved) VALUES ($1, $2, $3)",
      [
        patternData.patternName,
        JSON.stringify(patternData.patternString),
        false,
      ]
    );
    return { success: true, message: "Pattern saved successfully!" };
  } catch (err) {
    console.error("Failed to create pattern:", err);
    return { success: false, message: "Failed to create pattern." };
  }
}

// Type for pattern retrieval
type Pattern = {
  id: number;
  name: string;
  created: string;
};

// Function to get unapproved patterns
export async function getUnapprovedPatterns(): Promise<{
  success: boolean;
  result: Pattern[] | string;
}> {
  try {
    const result = await query<Pattern>(
      "SELECT id, name, TO_CHAR(created, 'YYYY-MM-DD') AS created FROM patterns WHERE approved = false"
    );
    return { success: true, result };
  } catch (err) {
    console.error("Error fetching unapproved patterns:", err);
    return { success: false, result: "Error fetching unapproved patterns." };
  }
}

// Function to get approved patterns
export async function getApprovedPatterns(): Promise<{
  success: boolean;
  result: Pattern[] | string;
}> {
  try {
    const result = await query<Pattern>(
      "SELECT id, name, TO_CHAR(created, 'YYYY-MM-DD') AS created FROM patterns WHERE approved = true"
    );
    return { success: true, result };
  } catch (err) {
    console.error("Error fetching approved patterns:", err);
    return { success: false, result: "Error fetching approved patterns." };
  }
}
