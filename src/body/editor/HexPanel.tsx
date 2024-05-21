import React from "react";
import "./Editor.css";

interface HexEditorProps {
  data: Uint8Array;
}

interface HexCellProps {
  value: string;
}

function HexCell(props: HexCellProps) {
  return <div className="hex-cell">{props.value}</div>;
}

const HexEditor = ({ data }: HexEditorProps) => {
  const hexValues = Array.from(data).map((byte) =>
    byte.toString(16).padStart(2, "0").toUpperCase()
  );

  return (
    <div className="hex-editor">
      {hexValues.map((hex, index) => (
        <HexCell key={index} value={hex} />
      ))}
    </div>
  );
};

function HexPanel() {
  const [offset, setOffset] = React.useState(0);
  const [file, setFile] = React.useState<File | null>(null);

  return (
    <div className="hex-panel">
      <HexEditor data={new Uint8Array(16)} />
    </div>
  );
}

export default HexPanel;
