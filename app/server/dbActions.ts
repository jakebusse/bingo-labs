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

// // Function to create a new comment
// export async function createComment(formData: FormData) {
//   const comment = formData.get("comment") as string;

//   // Validate input
//   if (!comment || comment.trim().length === 0) {
//     return { success: false, message: "Comment cannot be empty." };
//   }
//   if (comment.length > 500) {
//     return {
//       success: false,
//       message: "Comment is too long (max 500 characters).",
//     };
//   }

//   try {
//     await query("INSERT INTO comments (comment) VALUES ($1)", [comment]);
//     return { success: true, message: "Comment added successfully!" };
//   } catch (err) {
//     console.error("Failed to insert comment:", err);
//     return { success: false, message: "Failed to insert comment." };
//   }
// }

// Type definition for patterns
type PatternData = {
  patternName: string;
  patternString: number[][][];
};

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

export async function approvePattern(pattern: number) {
  try {
    await query("UPDATE patterns SET approved = true WHERE id = ($1)", [
      pattern,
    ]);
    return { success: true, message: "Pattern approved successfully!" };
  } catch (err) {
    console.error("Failed to approve pattern:", err);
    return { success: false, message: "Failed to approve pattern." };
  }
}

export async function unapprovePattern(pattern: number) {
  try {
    await query("UPDATE patterns SET approved = false WHERE id = ($1)", [
      pattern,
    ]);
    return { success: true, message: "Pattern unapproved successfully!" };
  } catch (err) {
    console.error("Failed to unapprove pattern:", err);
    return { success: false, message: "Failed to unapprove pattern." };
  }
}

export async function deletePattern(pattern: number) {
  try {
    await query("DELETE FROM patterns WHERE id = ($1)", [pattern]);
    return { success: true, message: "Pattern deleted successfully!" };
  } catch (err) {
    console.error("Failed to delete pattern:", err);
    return { success: false, message: "Failed to delete pattern." };
  }
}

export async function getSimulated(pattern: number) {
  try {
    const result = await query("SELECT id FROM sims WHERE pattern = ($1)", [
      pattern,
    ]);
    return { success: true, result };
  } catch (err) {
    console.error("Error validating pattern:", err);
    return { success: false, result: "Error validating pattern." };
  }
}

// Type for pattern retrieval
type ListedPattern = {
  id: number;
  name: string;
  created: string;
};

// Function to get unapproved patterns
export async function getUnapprovedPatterns(): Promise<{
  success: boolean;
  result: ListedPattern[] | string;
}> {
  try {
    const result = await query<ListedPattern>(
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
  result: ListedPattern[] | string;
}> {
  try {
    const result = await query<ListedPattern>(
      "SELECT id, name, TO_CHAR(created, 'YYYY-MM-DD') AS created FROM patterns WHERE approved = true"
    );
    return { success: true, result };
  } catch (err) {
    console.error("Error fetching approved patterns:", err);
    return { success: false, result: "Error fetching approved patterns." };
  }
}

type FullPattern = {
  id: number;
  name: string;
  string: string;
  approved: boolean;
};

export async function getPatternById(id: string): Promise<{
  success: boolean;
  result: FullPattern | null;
}> {
  try {
    const result = await query<FullPattern>(
      "SELECT id, name, string, approved FROM patterns WHERE id = $1",
      [id]
    );

    if (result.length === 0) {
      return { success: false, result: null }; // ✅ Return null if no pattern found
    }

    return { success: true, result: result[0] }; // ✅ Return a single object
  } catch (error) {
    console.error("Error fetching pattern:", error);
    return { success: false, result: null }; // ✅ Return null in case of an error
  }
}
