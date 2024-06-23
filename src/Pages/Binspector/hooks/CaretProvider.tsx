import React, { useState } from "react";
import { CaretContext } from "./CaretContext";

export function CaretProvider({ children }: { children: React.ReactNode }) {
  const [caret, setCaret] = useState<number>(0);

  return (
    <CaretContext.Provider value={{ caret, setCaret }}>
      {children}
    </CaretContext.Provider>
  );
}
