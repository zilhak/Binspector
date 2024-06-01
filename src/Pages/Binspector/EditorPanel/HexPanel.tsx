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
        <HexEditor data={hexData} />
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

  return <div className="row-bar-textarea">{rows}</div>;
};

const ColumnBar = (props: { count: number; stride: number }) => {
  const columns = [];

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
}
const HexEditor = ({ data }: HexEditorProps) => {
  const hexValues: string[] =
    data == null
      ? []
      : Array.from(data).map((byte) =>
          byte.toString(16).padStart(2, "0").toUpperCase(),
        );

  return (
    <Grid
      container 
      spacing={2} 
      className="hex-editor"
      sx={{ margin: '0px', }}>
      {hexValues.map((hex, index) => (
        <HexCell key={index} value={hex} />
      ))}
    </Grid>
  );
};

interface HexCellProps {
  value: string;
}

const HexCell = ({ value }: HexCellProps) => {
  return <div className="hex-cell">{value}</div>;
};
