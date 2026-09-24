import { sanitizeOTP } from "../utils";

type OTPMode = "numeric" | "text";

type UseOTPPasteProps = {
  values: string[];
  setValues: (next: string[]) => void;
  focus: (index: number) => void;
  length: number;
  mode: OTPMode; // 👈 ADD
};

export function useOTPPaste({
  values,
  setValues,
  focus,
  length,
  mode,
}: UseOTPPasteProps) {
  const handlePaste =
    (index: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      const raw = e.clipboardData.getData("text");

      const cleaned = sanitizeOTP(raw, mode); // 👈 FIXED
      const pasted = cleaned.slice(0, length);

      if (!pasted) return;

      const next = [...values];

      for (let i = 0; i < pasted.length; i++) {
        if (index + i < length) {
          next[index + i] = pasted[i];
        }
      }

      setValues(next);

      focus(Math.min(index + pasted.length, length - 1));
    };

  return { handlePaste };
}
