import React, { useState } from "react";
import { FileContext } from "./FileReferenceContext";

export function FileContextProvider({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File>(new File([], ""));
  const [index, setIndex] = useState<number>(0);

  return (
    <FileContext.Provider value={{ file, index, setFile, setIndex }}>
      {children}
    </FileContext.Provider>
  );
}