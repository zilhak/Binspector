import { createContext } from "react";

interface HexOptionContextProps {
  rowCount: number;
  setRowCount: React.Dispatch<React.SetStateAction<number>>;
}

const defaultOption: HexOptionContextProps = {
  rowCount: 16,
  setRowCount: () => {},
};

export const HexOptionContext = createContext<HexOptionContextProps>(defaultOption);
