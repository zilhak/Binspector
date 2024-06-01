import React, { useEffect } from "react";
import "./Binspector.css";
import { EditorPanel } from "./EditorPanel/EditorPanel";
import { InfoPanel } from "./InfoPanel/InfoPanel";
import { TopMenu } from "./TopMenu/TopMenu";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Settings = {
  byte_per_row: number;
  number_system: "hex" | "dec" | "oct" | "bin";

  show_string_panel: boolean;
  show_info_panel: boolean;
};

function Binspector() {
  const [direction, setDirection] = React.useState<"column" | "row">("row");
  const [file, setFile] = React.useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateLayout = () => {
    const { innerWidth: width, innerHeight: height } = window;
    if (width > height) {
      setDirection("row");
    } else {
      setDirection("column");
    }
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  return (
    <div className="screen">
      <TopMenu setFile={setFile} />
      <div className={`content ${direction}`}>
        <EditorPanel file={file} />
        <InfoPanel />
      </div>
    </div>
  );
}

export default Binspector;
