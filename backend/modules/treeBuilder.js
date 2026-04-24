/**
 * Tree Builder
 * Builds tree structures starting from root nodes
 */

function buildTrees(graph, roots) {
  const trees = [];

  function buildTree(root, path = new Set()) {
    const node = root;
    const children = graph.get(node) || [];

    const tree = {
      name: node,
      children: []
    };

    path.add(node);

    for (const child of children) {
      if (!path.has(child)) {
        tree.children.push(buildTree(child, new Set(path)));
      }
    }

    return tree;
  }

  for (const root of roots) {
    trees.push(buildTree(root));
  }

  return trees;
}

module.exports = { buildTrees };
