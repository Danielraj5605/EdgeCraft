/**
 * Cycle Detector
 * DFS-based cycle detection in graph
 */

function detectCycle(graph, roots) {
  const visited = new Set();
  const recursionStack = new Set();
  const cycleNodes = [];

  function dfs(node) {
    visited.add(node);
    recursionStack.add(node);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        cycleNodes.push(neighbor);
        return true;
      }
    }

    recursionStack.delete(node);
    return false;
  }

  // Start DFS from all roots
  for (const root of roots) {
    if (!visited.has(root)) {
      if (dfs(root)) {
        return { hasCycle: true, cycleNodes };
      }
    }
  }

  // If no roots or roots didn't visit all nodes, check remaining unvisited nodes
  // This handles pure cycles where no node has in-degree 0
  for (const [node] of graph) {
    if (!visited.has(node)) {
      if (dfs(node)) {
        return { hasCycle: true, cycleNodes };
      }
    }
  }

  return { hasCycle: false, cycleNodes: [] };
}

module.exports = { detectCycle };
