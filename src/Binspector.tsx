import "./Binspector.css";
import React from "react";
import { useEffect } from "react";
import TopMenu from "./top_bar/TopBar";
import EditorPanel from "./body/editor/Editor";
import InfoPanel from "./body/info/Info";

function Binspector() {
  const [direction, setDirection] = React.useState<"column" | "row">("row");

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
      <TopMenu />
      <div className={`content ${direction}`}>
        <EditorPanel />
        <InfoPanel />
      </div>
    </div>
  );
}

export default Binspector;
