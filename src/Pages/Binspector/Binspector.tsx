import { useState, useEffect } from "react";
import "./Binspector.css";
import { EditorPanel } from "./EditorPanel/EditorPanel";
import { InfoPanel } from "./InfoPanel/InfoPanel";
import { TopMenu } from "./TopMenu/TopMenu";
import { CaretProvider } from "@/Pages/Binspector/hooks/CaretProvider";

function Binspector() {
  const [direction, setDirection] = useState<"column" | "row">("row");
  const [file, setFile] = useState<File | null>(null);
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
      <CaretProvider>
        <div className={`content ${direction}`}>
          <EditorPanel file={file} />
          <InfoPanel />
        </div>
      </CaretProvider>
    </div>
  );
}

export default Binspector;
