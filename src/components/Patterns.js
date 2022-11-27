/* global chrome */

import { TrashIcon, PencilIcon } from "@heroicons/react/outline";

const Patterns = ({ patternObj, setPatterns, setDefaultValues }) => {
  return (
    <div className="py-2">
      {Object.entries(patternObj).map(([key, value]) => {
        return (
          <div key={key} className="grid grid-cols-7 grid-flow-col gap-3 mb-2">
            <div className={getInputClassName()}>{key}</div>
            <div className={getInputClassName()}>{value}</div>
            <div className="flex items-center justify-around">
              <TrashIcon
                className="w-5 h-5 cursor-pointer"
                onClick={() => deleteItem(key)}
              />
              <PencilIcon
                className="w-5 h-5 cursor-pointer"
                onClick={() => updateItem(key)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  function updateItem(updateKey) {
    Object.entries(patternObj).map(([key, value]) => {
      if (updateKey === key) {
        setDefaultValues({ from: key, to: value });
        return;
      }
    });
  }
  function deleteItem(deleteKey) {
    let newObj = {};
    Object.entries(patternObj).map(([key, value]) => {
      if (key !== deleteKey) newObj[key] = value;
    });

    chrome.storage.local.set({ patterns: newObj });
    setPatterns(newObj);
  }

  function getInputClassName() {
    let className =
      "col-span-3 p-2 h-10 rounded text-zinc-100 truncate text-sm bg-zinc-700 focus:border-zinc-600 focus:outline-none";
    return className;
  }
};

export default Patterns;
