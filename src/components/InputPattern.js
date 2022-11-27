/* global chrome */

import React, { useEffect, useRef, useState } from "react";

const InputPattern = ({ patternObj, setPatterns, defaultValues = {} }) => {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  let toRef = useRef();
  let fromRef = useRef();

  useEffect(() => {
    setFrom(defaultValues?.from);
    setTo(defaultValues?.to);

    if (defaultValues?.from && defaultValues?.to) toRef.current.focus();
    else fromRef.current.focus();
  }, [defaultValues]);

  return (
    <div className="flex w-full justify-between gap-3">
      <input
        ref={fromRef}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className={getInputClassName()}
      />
      <input
        ref={toRef}
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className={getInputClassName()}
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") handleInput();
        }}
      />

      <button
        className={getButtonClassName()}
        type={"submit"}
        onClick={() => handleInput()}
      >
        {"Save"}
      </button>
    </div>
  );

  function handleInput() {
    const newObj = { ...patternObj, [from]: to };
    chrome.storage.local.set({ patterns: newObj });

    setPatterns(newObj);
    setFrom("");
    setTo("");
    toRef.current.blur();
  }

  function getInputClassName() {
    let className =
      "flex-grow p-2 h-10 rounded text-zinc-100 truncate text-sm bg-zinc-700 focus:border-zinc-600 focus:outline-none";
    return className;
  }

  function getButtonClassName() {
    let className =
      "w-[25%] h-10 text-sm rounded font-semibold cursor-pointer bg-sky-600 hover:bg-sky-700 text-white focus:outline-sky-600";
    return className;
  }
};

export default InputPattern;
