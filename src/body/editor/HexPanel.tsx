import './Editor.css'
import React from 'react';


interface HexEditorProps {
  data:Uint8Array
}

interface HexCellProps {
  value: string;
}

const HexCell: React.FC<HexCellProps> = ({ value }) => {
  return <div className="hex-cell">{value}</div>;
};

const HexEditor: React.FC<HexEditorProps> = ({data}) => {
  const hexValues = Array.from(data).map(byte => byte.toString(16).padStart(2, '0').toUpperCase())

  return (
    <div className='hex-editor'>
      {hexValues.map((hex, index) => (
        <HexCell key={index} value={hex}/>
      ))};
    </div>
  )
}



function HexPanel() {
  const [offset, setOffset] = React.useState(0);
  const [file, setFile] = React.useState<File | null>(null);
  




  return (
    <div className='hex-panel'>
      <HexEditor data={new Uint8Array(16)}/>
    </div>
  );
}

export default HexPanel;