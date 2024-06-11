import { useEffect, useState } from "react";

interface HexPanelProps {
  fileData: ArrayBuffer | null;
  offset: number;
  rowSize: number;
  columnSize: number;
}

export function StringPanel({ fileData, offset, rowSize, columnSize }: HexPanelProps) {
  const [hexData, setHexData] = useState<Uint8Array | null>(null);

  useEffect(() => {
    if (fileData) {
      setHexData(new Uint8Array(fileData, offset));
    } else {
      setHexData(null);
    }
  }, [fileData, offset]);

  return (
    <div className="panel string-panel-container">
      <StringArea data={hexData} rowSize={rowSize} columnSize={columnSize} />
    </div>
  );
}

interface HexEditorProps {
  data: Uint8Array | null;
  rowSize: number;
  columnSize: number;
}

const StringArea = ({ data, rowSize, columnSize }: HexEditorProps) => {
  const strValues: string[][] = [];

  if (data) {
    for (let i = 0; i < data.length && i < rowSize * columnSize; i += rowSize) {
      const row: string[] = Array.from(data.slice(i, i + columnSize)).map((byte) => ByteToChar(byte) );
      strValues.push(row);
    }
  }

  return (
    <div className="string-panel">
      {strValues.map((hexRow, index) => (
        <div className="string-panel-row" key={index}>
          {hexRow}
        </div>
      ))}
    </div>
  );
};

function ByteToChar(byte: number): string {
  return byte >= 32 && byte < 127 ? String.fromCharCode(byte) : ".";
}