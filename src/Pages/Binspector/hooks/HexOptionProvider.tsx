import React, { useState } from "react";
import { HexOptionContext } from "./HexOptionContext";

export function HexOptionProvider({ children }: { children: React.ReactNode }) {
  const [rowCount, setRowCount] = useState<number>(0);
  const [columnCount, setColumnCount] = useState<number>(0);
  const [bytePerCell, setBytePerCell] = useState<number>(0);
  const [hexType, setHexType] = useState<string>("");

  return (
    <HexOptionContext.Provider
      value={{
        rowCount,
        columnCount,
        bytePerCell,
        hexType,
        setRowCount,
        setColumnCount,
        setBytePerCell,
        setHexType,
      }}
    >
      {children}
    </HexOptionContext.Provider>
  );
}
