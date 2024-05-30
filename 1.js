function startChar(text) {
  // Find the index of the first alphanumeric character
  let startIndex = text.search(/[a-zA-Z]/);

  // Start from the first alphanumeric character or the beginning of the string
  let newtext = startIndex >= 0 ? text.substring(startIndex) : "";

  return newtext;
}

function endChar(text) {
  // Find the index of the last alphanumeric character
  let endIndex = text.search(/[a-zA-Z0-9](?=[^a-zA-Z0-9]*$)/);

  // End at the last alphanumeric character or the specified end character
  let newText = endIndex >= 0 ? text.substring(0, endIndex + 1) : "";

  return newText;
}

function replaceWithComma(text, index) {
  if (index < 0 || index >= text.length) {
    return text;
  }

  const chars = text.split("");
  chars[index] = ",";
  return chars.join("");
}

function findCombinationsFromText(text) {
  if (!text) {
    return [];
  }
  text = text.replace(/[^A-Za-z0-9,_-]/g, "");

  text = startChar(text);
  text = endChar(text);

  for (let i = 0; i < text.length; i++) {
    if (text[i] == "_") {
      for (let j = i - 1; j >= 0; j--) {
        if (
          !(
            (text[j] >= "a" && text[j] <= "z") ||
            (text[j] >= "A" && text[j] <= "Z")
          )
        ) {
          text = replaceWithComma(text, j);
          break;
        }
      }
    }
  }

  const tags = text.split(",");

  const validPrefixes = [
    "Group",
    "Category",
    "Subcategory",
    "Make",
    "Model",
    "Diagram",
  ];

  const combinations = [];
  const validTags = tags.filter((tag) =>
    validPrefixes.includes(tag.split("_")[0])
  );

  if (validTags.length !== tags.length) {
    return [];
  }

  for (let i = 0; i < tags.length - 1; i++) {
    for (let j = i + 1; j < tags.length; j++) {
      if (tags[i].split("_")[0] == tags[j].split("_")[0]) {
        return [];
      }
    }
  }
  const validsplit = [];
  for (let i = 0; i < validTags.length; i++) {
    validsplit[i] = validTags[i].split("_")[0];
  }
  validTags.sort((a, b) => {
    const prefixA = a.split("_")[0];
    const prefixB = b.split("_")[0];

    return validPrefixes.indexOf(prefixA) - validPrefixes.indexOf(prefixB);
  });
  const ValidTags = validTags.map((item) => item.replace(/--/g, "-"));
  for (let i = ValidTags.length; i > 0; i--) {
    combinations.push(ValidTags.slice(0, i));
  }
  return combinations;
}

console.log(
  findCombinationsFromText(
    "Make#$(&^_Lift-Rite-Group_Tool!@%s-Hardware-Category_Washer-!@#%"
  )
);
