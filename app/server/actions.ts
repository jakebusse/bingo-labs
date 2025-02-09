// File: server/actions.ts
// "use server";
// import { neon } from "@neondatabase/serverless";

// const sql = neon(`${process.env.DATABASE_URL}`);

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
