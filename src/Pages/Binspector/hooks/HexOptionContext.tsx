import { createContext } from "react";

interface HexOptionContextProps {
  rowCount: number;
  columnCount: number;
  bytePerCell: number;
  hexType: string;

  setRowCount: React.Dispatch<React.SetStateAction<number>>;
  setColumnCount: React.Dispatch<React.SetStateAction<number>>;
  setBytePerCell: React.Dispatch<React.SetStateAction<number>>;
  setHexType: React.Dispatch<React.SetStateAction<string>>;
}

const defaultOption: HexOptionContextProps = {
  rowCount: 16,
  columnCount: 16,
  bytePerCell: 1,
  hexType: "hex",

  setRowCount: () => {},
  setColumnCount: () => {},
  setBytePerCell: () => {},
  setHexType: () => {},
};

export const HexOptionContext = createContext<HexOptionContextProps>(defaultOption);
