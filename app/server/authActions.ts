"use client";

export function authenticate(input_pass: string) {
  console.log("Authenticating with input: " + input_pass);
  if (input_pass === "Hisname0!") {
    console.log("Authenticated");
    return true;
  } else {
    console.log("Access denied");
    return false;
  }
}
