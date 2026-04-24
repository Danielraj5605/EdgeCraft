/**
 * Summary Generator
 * Aggregates statistics from processed data
 */

function generateSummary(trees, cycleInfo, duplicateEdges, invalidEntries, uniqueEdges, graph) {
  const allNodes = new Set();
  if (graph) {
    for (const [node] of graph) {
      allNodes.add(node);
    }
  }

  // Find largest tree (most nodes)
  let largestTreeRoot = null;
  let maxNodes = 0;
  for (const tree of trees) {
    const nodeCount = countNodes(tree);
    if (nodeCount > maxNodes) {
      maxNodes = nodeCount;
      largestTreeRoot = tree.name;
    }
  }

  return {
    total_trees: trees.length,
    max_depth: trees.length > 0 ? Math.max(...trees.map(t => getMaxDepth(t))) : 0,
    largest_tree_root: largestTreeRoot,
    cycle_detected: cycleInfo.hasCycle,
    cycle_nodes: cycleInfo.cycleNodes,
    total_edges: uniqueEdges ? uniqueEdges.length : 0,
    total_nodes: allNodes.size || (trees.length > 0 ? new Set(getAllNodes(trees)).size : 0),
    duplicate_count: duplicateEdges.length,
    invalid_count: invalidEntries.length
  };
}

function getMaxDepth(tree) {
  if (!tree.children || tree.children.length === 0) {
    return 1;
  }
  return 1 + Math.max(...tree.children.map(c => getMaxDepth(c)));
}

function countNodes(tree) {
  if (!tree.children || tree.children.length === 0) {
    return 1;
  }
  return 1 + tree.children.reduce((sum, c) => sum + countNodes(c), 0);
}

function getAllNodes(trees) {
  const nodes = [];
  function collect(t) {
    nodes.push(t.name);
    if (t.children) {
      t.children.forEach(c => collect(c));
    }
  }
  trees.forEach(t => collect(t));
  return nodes;
}

module.exports = { generateSummary };
