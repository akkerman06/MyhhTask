import { encoded, translations } from "./data.js";

console.log("Let's rock");

function decode(objArr, translations, excludedKeys) {
  let i = -1;
  let res = [];
  let uniqueIds = new Set();

  while (++i <= objArr.length - 1) {
    let obj = { ...objArr[i] };
    for (let [key, id] of Object.entries(obj)) {
      if (excludedKeys.includes(key)) continue;
      obj[key] = translations[id] ?? id;
      uniqueIds.add(id);
    }
    res.push(obj);
  }

  return [res, uniqueIds];
}

function decodeStart() {
  const excludedKeys = ["groupId", "service", "formatSize", "ca"];
  const [decoded, uniqueIds] = decode(encoded, translations, excludedKeys);

  console.log("Decoding result -  ", decoded);
  console.log("Unique ids ", uniqueIds);
}

decodeStart();
