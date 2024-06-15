import { createContext } from "react";

export const CaretContext = createContext<{
  caret: number;
  setCaret: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);
