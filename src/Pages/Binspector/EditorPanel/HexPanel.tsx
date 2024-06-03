import { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";

interface HexPanelProps {
  fileData: ArrayBuffer | null;
  offset: number;
}

export function HexPanel({ fileData, offset }: HexPanelProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hexData, setHexData] = useState<Uint8Array | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    if (fileData) {
      setHexData(new Uint8Array(fileData, offset));
    } else {
      setHexData(null);
    }
  }, [fileData, offset]);
  const rowSize = 16; // TODO: get from screen size
  const columnSize = 16; // TODO: get from settings
  const stride = 1;

  return (
    <div className="hex-panel">
      <div className="row-bar-container">
        <RowBar
          index={offset}
          count={columnSize}
          stride={stride * columnSize}
        />
      </div>
      <div className="hex-panel-right">
        <ColumnBar count={rowSize} stride={stride} />
        <HexEditor data={hexData} rowSize={rowSize} columnSize={columnSize} />
      </div>
    </div>
  );
}

const RowBar = (props: { index: number; count: number; stride: number }) => {
  const rows = [];

  let offset = props.index;
  for (let i = 0; i < props.count; i++) {
    rows.push(
      <div key={i} className="row-bar-item">
        {offset.toString(16).toUpperCase().padStart(4, "0")}
      </div>,
    );
    offset += props.stride;
  }

  return <div className="row-bar-area">{rows}</div>;
};

const ColumnBar = (props: { count: number; stride: number }) => {
  const columns = [];

  columns.push(<div key={100} className="column-bar-first-margin"> </div>);
  for (let i = 0; i < props.count; i += props.stride) {
    columns.push(
      <div key={i} className="column-bar-item">
        {i.toString(16).toUpperCase().padStart(2, "0")}
      </div>,
    );
  }

  return <div className="column-bar-container">{columns}</div>;
};

interface HexEditorProps {
  data: Uint8Array | null;
  rowSize: number;
  columnSize: number;
}

const HexEditor = ({ data, rowSize, columnSize }: HexEditorProps) => {
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

interface HexCellProps {
  value: string;
}

const HexCell = ({ value }: HexCellProps) => {
  return <div className="hex-cell">{value}</div>;
};
