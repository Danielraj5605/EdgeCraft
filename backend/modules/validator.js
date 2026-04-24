/**
 * Validator
 * Validates node format: uppercase single letters A-Z
 * Rejects self-loops, invalid formats, multi-char nodes
 */

const NODE_REGEX = /^[A-Z]$/;

function validateEdge(edge) {
  const errors = [];

  if (!NODE_REGEX.test(edge.from)) {
    errors.push(`Invalid source node: ${edge.from}`);
  }

  if (!NODE_REGEX.test(edge.to)) {
    errors.push(`Invalid target node: ${edge.to}`);
  }

  if (edge.from === edge.to) {
    errors.push(`Self-loop detected: ${edge.from}->${edge.to}`);
  }

  return errors;
}

function validateEdges(edges) {
  const validEdges = [];
  const invalidEntries = [];

  for (const edge of edges) {
    const errors = validateEdge(edge);

    if (errors.length === 0) {
      validEdges.push(edge);
    } else {
      invalidEntries.push({
        entry: edge.original,
        errors
      });
    }
  }

  return { validEdges, invalidEntries };
}

module.exports = { validateEdges, validateEdge };
