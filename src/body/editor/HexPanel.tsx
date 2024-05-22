import "./Editor.css";
import React from "react";

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
  const hexValues: string[] =
    data == null
      ? []
      : Array.from(data).map((byte) =>
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

const ColumnBar = ({ count }: { count: number }) => {
  const columns = [];

  for (let i = 0; i < count; i++) {
    columns.push(
      <div className="column-bar">{i.toString(16).toUpperCase()}</div>
    );
  }

  return <div className="column-bar-container">{columns}</div>;
};

const RowBar = ({ count }: { count: number }) => {
  const rows = [];

  for (let i = 0; i < count; i++) {
    rows.push(<div className="row-bar">{i.toString(16).toUpperCase()}</div>);
  }

  return <div className="row-bar-container">{rows}</div>;
};

interface HexPanelProps {
  buffer: ArrayBuffer | null;
}

function HexPanel({ buffer }: HexPanelProps) {
  const [hexData, setHexData] = React.useState<Uint8Array | null>(null);

  React.useEffect(() => {
    setHexData(buffer ? new Uint8Array(buffer) : null);
  }, [buffer]);

  return (
    <div className="hex-panel">
      <RowBar count={16} />
      <div className="hex-panel-right">
        <ColumnBar count={16} />
        <HexEditor data={hexData} />
      </div>
    </div>
  );
}

export default HexPanel;
