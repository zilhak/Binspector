import { useEffect, useState } from "react";
import "./EditorPanel.css";
import { HexPanel } from "./HexPanel";

interface EditorPanelProps {
  file: File | null;
}

export function EditorPanel({ file }: EditorPanelProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [offset, setOffset] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  }, [file]);

  return (
    <div className="panel portion-editor editor">
      <HexPanel fileData={fileData} offset={offset} />
    </div>
  );
}
