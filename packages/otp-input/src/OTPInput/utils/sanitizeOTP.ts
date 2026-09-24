export function sanitizeOTP(value: string, mode: "numeric" | "text") {
  if (mode === "numeric") {
    return value.replace(/\D/g, "");
  }

  if (mode === "text") {
    return value.replace(/[^a-zA-Z0-9]/g, "");
  }

  return value;
}
