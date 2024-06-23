import { useEffect, useState, useContext } from "react";
import "./EditorPanel.css";
import { HexPanel } from "./HexPanel";
import { FileContext } from "@/hooks/FileReferenceContext";

export function EditorPanel() {
  const [offset, setOffset] = useState<number>(0);
  
  const file = useContext(FileContext).file;

  const [fileData, setFileData] = useState<ArrayBuffer | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileData(event.target?.result as ArrayBuffer);
        setOffset(0);
      };
      reader.readAsArrayBuffer(file);
    }
    console.log("test")
  }, [file]);

  return (
    <div className="panel portion-editor editor">
      <HexPanel fileData={fileData} offset={offset} />
    </div>
  );
}
