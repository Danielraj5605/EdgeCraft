/**
 * Input Parser
 * Splits "A->B" strings into edge pairs {from, to, original}
 */

function parseInput(data) {
  if (!Array.isArray(data)) {
    return { edges: [], error: 'Input must be an array' };
  }

  const edges = [];

  for (const item of data) {
    if (typeof item !== 'string') {
      continue;
    }

    const trimmed = item.trim();
    const parts = trimmed.split('->');

    if (parts.length === 2) {
      edges.push({
        from: parts[0].trim(),
        to: parts[1].trim(),
        original: item
      });
    }
  }

  return { edges, error: null };
}

module.exports = { parseInput };
