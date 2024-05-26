import { useEffect, useState } from "react";

interface HexPanelProps {
  file: File | null;
}

export function HexPanel({ file }: HexPanelProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hexData, setHexData] = useState<Uint8Array | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileData, setFileData] = useState<ArrayBuffer | null>(null);

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

const RowBar = (props: { index: number; count: number; stride: number }) => {
  const rows = [];

  for (let i = 0; i < props.count; i++) {
    rows.push(
      <div className="row-bar">
        {i.toString(16).toUpperCase().padStart(4, "0")}
      </div>,
    );
  }

  return <div className="row-bar-textarea">{rows}</div>;
};

const ColumnBar = (props: { index: number; count: number }) => {
  const columns = [];

  for (let i = 0; i < props.count; i++) {
    columns.push(
      <div className="column-bar">
        {i.toString(16).toUpperCase().padStart(2, "0")}
      </div>,
    );
  }

  return <div className="column-bar-container">{columns}</div>;
};

interface HexEditorProps {
  data: Uint8Array | null;
}
const HexEditor = ({ data }: HexEditorProps) => {
  const hexValues: string[] =
    data == null
      ? []
      : Array.from(data).map((byte) =>
          byte.toString(16).padStart(2, "0").toUpperCase(),
        );

  return (
    <div className="hex-editor">
      {hexValues.map((hex, index) => (
        <HexCell key={index} value={hex} />
      ))}
    </div>
  );
};

interface HexCellProps {
  value: string;
}

const HexCell = ({ value }: HexCellProps) => {
  return <div className="hex-cell">{value}</div>;
};
