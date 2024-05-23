import React, { useEffect } from "react";
import "../../Binspector.css";
import "./Editor.css";
import HexPanel from "./HexPanel";
import StringPanel from "./StringPanel";

interface EditorPanelProps {
  file: File | null;
}

function EditorPanel({ file }: EditorPanelProps) {
  const [offset, setOffset] = React.useState<Number>(0);
  const [fileData, setFileData] = React.useState<ArrayBuffer | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileData(event.target?.result as ArrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  return (
    <div className="panel portion-editor editor">
      <HexPanel file={file} />
      <StringPanel />
    </div>
  );
}

export default EditorPanel;
