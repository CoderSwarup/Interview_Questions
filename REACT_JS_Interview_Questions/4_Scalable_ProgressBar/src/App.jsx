import { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./Component/ProgressBar";

function App() {
  const [value, setValue] = useState(0);
  const [success, setsuccess] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 1);
    }, 100);
  }, []);
  return (
    <>
      <h1>Scalable Progress Bar</h1>
      <ProgressBar onComplete={() => setsuccess(true)} value={value} />
      <h3>{success ? "Complete" : "Loading..."}</h3>
    </>
  );
}

export default App;
