/**
 * Response Builder
 * Formats final JSON response
 */

function buildResponse(data) {
  const {
    userId,
    emailId,
    collegeRollNumber,
    hierarchies,
    invalidEntries,
    duplicateEdges,
    summary
  } = data;

  return {
    user_id: userId,
    email_id: emailId,
    college_roll_number: collegeRollNumber,
    hierarchies,
    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges,
    summary
  };
}

module.exports = { buildResponse };
