interface HexPanelProps {
  fileData: ArrayBuffer | null;
  offset: number;
}

export function StringPanel({ fileData, offset }: HexPanelProps) {
  return (
    <div className="panel string-panel-container">
      <StringArea data={null} rowSize={16} columnSize={16} />
    </div>
  );
}

interface HexEditorProps {
  data: Uint8Array | null;
  rowSize: number;
  columnSize: number;
}

const StringArea = ({ data, rowSize, columnSize }: HexEditorProps) => {
  const hexValues: string[][] = [];

  if (data) {
    for (let i = 0; i < data.length && i < rowSize * columnSize; i += rowSize) {
      const row: string[] = Array.from(data.slice(i, i + columnSize)).map((byte) =>
        byte.toString(16).padStart(2, "0").toUpperCase()
      );
      hexValues.push(row);
    }
  }

  return (
    <div className="hex-editor-container">
      {hexValues.map((hexRow, index) => (
        <div className="hex-editor-row" key={index}>
          {hexRow.map((value, index) => (
            <HexCell key={index} value={value} />
          ))}
        </div>
      ))}
    </div>
  );
};