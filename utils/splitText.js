export default function splitText(textElement) {
  const html = textElement.innerHTML.trim();
  const textElements = [];
  let currentParent = null;
  let childIndex = 0;

  for (let i = 0; i < html.length; i++) {
    const char = html[i];

    if (char === "<") {
      const closingTagIndex = html.indexOf(">", i);
      const nextChar = html[i + 1];

      if (nextChar === "/") currentParent = null;
      else if (nextChar !== "!") {
        currentParent = document.createElement("span");
        currentParent.setAttribute("class", textElement.children[childIndex].getAttribute("class"));

        textElements.push(currentParent);

        childIndex++;
      }

      i = closingTagIndex;
      continue;
    }

    const span = document.createElement("span");
    span.innerText = char;
    span.style.display = "inline-block";

    if (char === " ") span.style.whiteSpace = "pre";

    if (currentParent) currentParent.appendChild(span);
    else textElements.push(span);
  }

  textElement.innerHTML = textElements.map((element) => element.outerHTML).join("");
}
