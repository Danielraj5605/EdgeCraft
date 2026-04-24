/**
 * Depth Calculator
 * Calculates maximum depth of trees
 */

function calculateDepth(tree, currentDepth = 1) {
  if (!tree.children || tree.children.length === 0) {
    return currentDepth;
  }

  let maxChildDepth = currentDepth;
  for (const child of tree.children) {
    const childDepth = calculateDepth(child, currentDepth + 1);
    maxChildDepth = Math.max(maxChildDepth, childDepth);
  }

  return maxChildDepth;
}

function calculateTreeDepths(trees) {
  const depths = trees.map(tree => calculateDepth(tree));
  return {
    depths,
    maxDepth: depths.length > 0 ? Math.max(...depths) : 0
  };
}

module.exports = { calculateDepth, calculateTreeDepths };
