import { createContext } from "react";

interface FileContextProps {
  file: File;
  index: number;

  setFile: React.Dispatch<React.SetStateAction<File>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const defaultOption: FileContextProps = {
  file: new File([], ""),
  index: 0,

  setFile: () => {},
  setIndex: () => {},
};

export const FileContext = createContext<FileContextProps>(defaultOption);