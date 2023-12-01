import { useState } from "react";

import "./App.css";
import explorer from "./Data/FileExpoler";
import Folder from "./Components/Folder";
import useTraverseTree from "./hooks/AddFileFolder";

function App() {
  const [expolerData, setExpolerData] = useState(explorer);

  const { insertNode, DeleteNode, updateName } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const FinalTree = insertNode(expolerData, folderId, item, isFolder);
    setExpolerData(FinalTree);
  };

  const handleDeleteNode = (folderId) => {
    const FinalTree = DeleteNode(expolerData, folderId);
    setExpolerData(FinalTree);
  };

  const UpdateNameHandler = (ItemId, ItemName) => {
    const FinalTree = updateName(expolerData, ItemId, ItemName);
    setExpolerData(FinalTree);
  };
  return (
    <div>
      <Folder
        handleDeleteNode={handleDeleteNode}
        handleInsertNode={handleInsertNode}
        UpdateNameHandler={UpdateNameHandler}
        explorer={expolerData}
      ></Folder>
    </div>
  );
}

export default App;
