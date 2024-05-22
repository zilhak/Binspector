import "../../Binspector.css";
import "./Editor.css";
import HexPanel from "./HexPanel";
import StringPanel from "./StringPanel";

function EditorPanel() {
  return (
    <div className="panel portion-editor editor">
      <HexPanel />
      <StringPanel />
    </div>
  );
}

export default EditorPanel;
