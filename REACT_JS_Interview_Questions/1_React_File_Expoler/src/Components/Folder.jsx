import { useRef, useState, useEffect } from "react";

function Folder({
  handleInsertNode,
  explorer,
  handleDeleteNode,
  UpdateNameHandler,
}) {
  const [expand, setexpand] = useState(false);
  const [data, setData] = useState("");
  const inputRef = useRef(null);
  const [edit, setEdit] = useState(false);

  const [Input, SetInput] = useState({
    isVisible: false,
    isFolder: null,
  });

  const SetInputHandler = (e, isfolder) => {
    e.stopPropagation();
    SetInput({
      isVisible: true,
      isFolder: isfolder,
    });

    setexpand(true);
    // Using a timeout to ensure the input field is rendered before focusing
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const onAddFolder = (e) => {
    SetInput({
      ...Input,
      isVisible: true,
    });
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, Input.isFolder);
      SetInput({ ...Input, isVisible: false });
      setData("");
    }
  };

  const EditNameHandler = (e) => {
    e.stopPropagation();
    setData(explorer.name);
    setexpand(true);
    setEdit(true);

    setTimeout(() => inputRef.current.focus(), 0);
  };

  useEffect(() => {
    if (Input.isVisible) {
      inputRef.current.focus();
    }
  }, [Input.isVisible]);

  if (explorer.isFolder) {
    return (
      <>
        {Object.keys(explorer).length === 0 ? (
          <>
            <h1>Root Folder is Deleted</h1>
          </>
        ) : (
          <div className="Folder">
            <div className="folder" onClick={() => setexpand(!expand)}>
              <span>📁 {explorer.name}</span>

              <div className="btn">
                <button onClick={(e) => SetInputHandler(e, true)}>
                  Folder 📁
                </button>
                <button onClick={(e) => SetInputHandler(e, false)}>
                  File 📄
                </button>
                <button onClick={EditNameHandler}>Edit 🖊️</button>
                {explorer.id !== "1" && (
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNode(explorer.id);
                    }}
                    src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png?ga=GA1.1.241117635.1692078599"
                    alt=""
                  />
                )}
              </div>
            </div>

            <div style={{ display: expand === true ? "block" : "none" }}>
              {Input.isVisible && (
                <div className="input-container">
                  <span>{Input.isFolder === true ? "📁" : "📄"}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    onKeyDown={onAddFolder}
                    className="inputContainer__input"
                    onBlur={() => {
                      SetInput({ ...Input, isVisible: false });
                      setData("");
                    }}
                  />
                </div>
              )}

              {edit && (
                <input
                  ref={inputRef}
                  type="text"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 && data) {
                      UpdateNameHandler(explorer.id, data);
                      setEdit(false);
                      setData("");
                    }
                  }}
                  className="inputContainer__Edit"
                  onBlur={() => {
                    setEdit(false);
                    setData("");
                  }}
                />
              )}
              {explorer?.items.map((ele) => {
                return (
                  <Folder
                    handleDeleteNode={handleDeleteNode}
                    UpdateNameHandler={UpdateNameHandler}
                    handleInsertNode={handleInsertNode}
                    explorer={ele}
                    key={ele.id}
                  />
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {Object.keys(explorer).length === 0 ? (
          <>
            <h1>Root Folder is Deleted</h1>
          </>
        ) : (
          <>
            <div className="File-container">
              <span className="file"> 📄 {explorer.name} </span>

              <div>
                <span className="fileeditbtn" onClick={EditNameHandler}>
                  🖊️
                </span>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNode(explorer.id);
                  }}
                  src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png?ga=GA1.1.241117635.1692078599"
                  alt=""
                />
              </div>
            </div>

            {edit && (
              <input
                ref={inputRef}
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13 && data) {
                    UpdateNameHandler(explorer.id, data);
                    setEdit(false);
                    setData("");
                  }
                }}
                className="inputContainer__Edit File_Edit"
                onBlur={() => {
                  setEdit(false);
                  setData("");
                }}
              />
            )}
          </>
        )}
      </>
    );
  }
}

export default Folder;
