/**
 * Duplicate Edge Handler
 * Tracks and removes duplicate edges (keeps first occurrence)
 */

function findDuplicates(edges) {
  const seen = new Set();
  const duplicates = [];

  for (const edge of edges) {
    const key = `${edge.from}->${edge.to}`;

    if (seen.has(key)) {
      duplicates.push(edge.original);
    } else {
      seen.add(key);
    }
  }

  return duplicates;
}

function removeDuplicates(edges) {
  const seen = new Set();
  const uniqueEdges = [];

  for (const edge of edges) {
    const key = `${edge.from}->${edge.to}`;

    if (!seen.has(key)) {
      seen.add(key);
      uniqueEdges.push(edge);
    }
  }

  return uniqueEdges;
}

module.exports = { findDuplicates, removeDuplicates };
