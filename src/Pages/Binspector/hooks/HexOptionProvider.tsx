import React, { useState } from 'react';
import { HexOptionContext } from './HexOptionContext';

export function HexOptionProvider({ children }: { children: React.ReactNode }) {
  const [rowCount, setRowCount] = useState<number>(0);

  return (
    <HexOptionContext.Provider value={{rowCount, setRowCount}}>
      {children}
    </HexOptionContext.Provider>
  );
}