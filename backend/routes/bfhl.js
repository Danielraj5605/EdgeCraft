const express = require('express');
const router = express.Router();

const { parseInput } = require('../modules/parser');
const { validateEdges } = require('../modules/validator');
const { findDuplicates, removeDuplicates } = require('../modules/duplicateHandler');
const { buildGraph } = require('../modules/graphBuilder');
const { detectCycle } = require('../modules/cycleDetector');
const { buildTrees } = require('../modules/treeBuilder');
const { calculateTreeDepths } = require('../modules/depthCalculator');
const { generateSummary } = require('../modules/summaryGenerator');
const { buildResponse } = require('../modules/responseBuilder');

router.post('/', (req, res) => {
  try {
    const { data, user_id, email_id, college_roll_number } = req.body;

    if (!data) {
      return res.status(400).json({
        error: 'Missing "data" field in request body'
      });
    }

    if (!user_id || !email_id || !college_roll_number) {
      return res.status(400).json({
        error: 'Missing required fields: user_id, email_id, college_roll_number'
      });
    }

    // Step 1: Parse input
    const { edges, error: parseError } = parseInput(data);

    if (parseError) {
      return res.status(400).json({ error: parseError });
    }

    // Step 2: Validate edges
    const { validEdges, invalidEntries } = validateEdges(edges);

    // Step 3: Find duplicates
    const duplicateEdges = findDuplicates(validEdges);

    // Step 4: Remove duplicates
    const uniqueEdges = removeDuplicates(validEdges);

    // Step 5: Build graph
    const { graph, roots } = buildGraph(uniqueEdges);

    // Step 6: Detect cycles
    const cycleInfo = detectCycle(graph, roots);

    // Step 7: Build trees (only from non-cyclic roots if cycle detected)
    let treeRoots = roots;
    if (cycleInfo.hasCycle) {
      // If cycle exists, exclude nodes in cycle from tree roots
      const cycleNodeSet = new Set(cycleInfo.cycleNodes);
      treeRoots = roots.filter(r => !cycleNodeSet.has(r));
    }

    const trees = buildTrees(graph, treeRoots);

    // Step 8: Calculate depths
    const { maxDepth } = calculateTreeDepths(trees);

    // Step 9: Generate summary
    const summary = generateSummary(trees, cycleInfo, duplicateEdges, invalidEntries, uniqueEdges, graph);

    // Step 10: Build response
    const response = buildResponse({
      userId: user_id,
      emailId: email_id,
      collegeRollNumber: college_roll_number,
      hierarchies: trees,
      invalidEntries: invalidEntries.map(i => i.entry),
      duplicateEdges,
      summary
    });

    res.json(response);

  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

module.exports = router;
