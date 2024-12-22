export function formatLabelToCamelCase(label: string): string {
  const labelParts = label.toLowerCase().split(" ");
  return labelParts
    .map((part, index) =>
      index > 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part
    )
    .join("");
}

export function formatLabelToKebabCase(label: string): string {
  return label.toLowerCase().split(" ").join("-");
}
