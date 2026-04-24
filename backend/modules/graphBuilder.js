/**
 * Graph Builder
 * Builds adjacency list representation from edges
 */

function buildGraph(edges) {
  const graph = new Map();
  const inDegree = new Map();

  // Initialize all nodes
  for (const edge of edges) {
    if (!graph.has(edge.from)) {
      graph.set(edge.from, []);
    }
    if (!graph.has(edge.to)) {
      graph.set(edge.to, []);
    }
    inDegree.set(edge.to, (inDegree.get(edge.to) || 0) + 1);
    if (!inDegree.has(edge.from)) {
      inDegree.set(edge.from, 0);
    }
  }

  // Add edges
  for (const edge of edges) {
    graph.get(edge.from).push(edge.to);
  }

  // Find roots (nodes with in-degree 0)
  const roots = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) {
      roots.push(node);
    }
  }

  return { graph, roots, inDegree };
}

module.exports = { buildGraph };
