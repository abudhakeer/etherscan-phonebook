/* global chrome */

import InputPattern from "./components/InputPattern";
import Patterns from "./components/Patterns";

import { useEffect, useState } from "react";

function App() {
  const [patterns, setPatterns] = useState({});
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    chrome.storage.local.get("patterns", ({ patterns }) => {
      console.log("patterns: ", patterns);
      setPatterns(patterns || {});
    });
  }, []);

  return (
    <div className="w-[700px] p-4">
      <InputPattern
        patternObj={patterns}
        setPatterns={setPatterns}
        defaultValues={defaultValues}
      />

      <p className="font-semibold text-lg mt-4">Saved patterns: </p>
      <Patterns
        patternObj={patterns}
        setPatterns={setPatterns}
        setDefaultValues={setDefaultValues}
      />
    </div>
  );
}

export default App;
