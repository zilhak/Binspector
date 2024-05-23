import "./Editor.css";
import React, { useEffect } from "react";

interface HexEditorProps {
  data: Uint8Array | null;
}

interface HexCellProps {
  value: string;
}

function HexCell({ value }: HexCellProps) {
  return <div className="hex-cell">{value}</div>;
}

const HexEditor = ({ data }: HexEditorProps) => {
  const hexValues: string[] = data == null ? [] : Array.from(data).map((byte) =>
    byte.toString(16).padStart(2, "0").toUpperCase()
  );

  return (
    <div className="hex-editor">
      {hexValues.map((hex, index) => (
        <HexCell key={index} value={hex} />
      ))}
      ;
    </div>
  );
};

const ColumnBar = ({ index, count }: { index: number, count: number }) => {
  const columns = [];

  for (let i = 0; i < count; i++) {
    columns.push(<div className="column-bar">{i.toString(16).toUpperCase().padStart(2, '0')}</div>);
  }

  return <div className="column-bar-container">{columns}</div>;
}

const RowBar = ({ index, count, stride }: { index: number, count: number, stride: number }) => {
  const rows = [];

  for (let i = 0; i < count; i++) {
    rows.push(<div className="row-bar">{i.toString(16).toUpperCase().padStart(4, "0")}</div>);
  }

  return <div className="row-bar-textarea">{rows}</div>;
}

interface HexPanelProps {
  file: File | null;
}

function HexPanel({ file }: HexPanelProps) {
  const [hexData, setHexData] = React.useState<Uint8Array | null>(null);
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
    <div className="hex-panel">
      <div className="row-bar-container">
        <RowBar index={0} count={16} stride={16} />
      </div>
      <div className="hex-panel-right">
        <ColumnBar index={0} count={16} />
        <HexEditor data={hexData} />
      </div>
    </div>
  );
}

export default HexPanel;
