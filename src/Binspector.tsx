import "./Binspector.css";
import React from "react";
import { useEffect } from "react";
import TopMenu from "./top_bar/TopBar";
import EditorPanel from "./body/editor/Editor";
import InfoPanel from "./body/info/Info";

type Settings = {
  byte_per_row: number;
  number_system: "hex" | "dec" | "oct" | "bin";

  show_string_panel: boolean;
  show_info_panel: boolean;
}



function Binspector() {
  const [direction, setDirection] = React.useState<"column" | "row">("row");
  const [file, setFile] = React.useState<File | null>(null);
  const [index, setIndex] = React.useState<number>(0);

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
        <EditorPanel file={file}/>
        <InfoPanel />
      </div>
    </div>
  );
}

export default Binspector;
