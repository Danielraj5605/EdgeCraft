const API_URL = 'https://edgecraft-bfhl.onrender.com/bfhl';

const nodeInput = document.getElementById('nodeInput');
const submitBtn = document.getElementById('submitBtn');
const resultSection = document.getElementById('resultSection');
const resultDisplay = document.getElementById('resultDisplay');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');

submitBtn.addEventListener('click', handleSubmit);

async function handleSubmit() {
  const input = nodeInput.value.trim();
  const userId = document.getElementById('userId').value.trim();
  const emailId = document.getElementById('emailId').value.trim();
  const rollNumber = document.getElementById('rollNumber').value.trim();

  if (!userId || !emailId || !rollNumber) {
    showError('Please fill in all user details (User ID, Email, Roll Number)');
    return;
  }

  if (!input) {
    showError('Please enter at least one node relationship');
    return;
  }

  const lines = input.split('\n').filter(line => line.trim());
  const data = lines.map(line => line.trim());

  submitBtn.disabled = true;
  hideResults();
  hideError();

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        email_id: emailId,
        college_roll_number: rollNumber,
        data
      })
    });

    const result = await response.json();

    if (!response.ok) {
      showError(result.error || 'Request failed');
      return;
    }

    displayResult(result);

  } catch (error) {
    showError(`Network error: ${error.message}. Make sure the backend server is running.`);
  } finally {
    submitBtn.disabled = false;
  }
}

function displayResult(result) {
  let html = '';

  // Required user fields
  html += '<div class="user-info">';
  html += `<div><span class="label">User ID:</span> ${result.user_id}</div>`;
  html += `<div><span class="label">Email:</span> ${result.email_id}</div>`;
  html += `<div><span class="label">Roll Number:</span> ${result.college_roll_number}</div>`;
  html += '</div>';

  // Summary
  html += '<div class="summary-grid">';
  html += `<div class="summary-item"><div class="label">Total Trees</div><div class="value">${result.summary.total_trees}</div></div>`;
  html += `<div class="summary-item"><div class="label">Total Cycles</div><div class="value">${result.summary.cycle_detected ? 1 : 0}</div></div>`;
  html += `<div class="summary-item"><div class="label">Max Depth</div><div class="value">${result.summary.max_depth}</div></div>`;
  html += `<div class="summary-item"><div class="label">Largest Tree Root</div><div class="value">${result.summary.largest_tree_root || 'N/A'}</div></div>`;
  html += '</div>';

  // Cycle alert
  if (result.summary.cycle_detected) {
    html += `<div class="cycle-alert">Cycle Detected! Nodes involved: ${result.summary.cycle_nodes.join(', ')}</div>`;
  }

  // Hierarchies as visual tree structure
  html += '<h3 style="margin: 20px 0 8px; color: #fff;">Hierarchies</h3>';
  if (result.hierarchies && result.hierarchies.length > 0) {
    result.hierarchies.forEach((tree, i) => {
      html += `<div class="tree-container">`;
      html += `<div class="tree-header">Tree ${i + 1}:</div>`;
      html += '<div class="visual-tree">';
      html += renderVisualTree(tree, true);
      html += '</div>';
      html += '</div>';
    });
  } else if (result.summary.cycle_detected) {
    html += '<div class="tree-container"><div class="visual-tree cycle-placeholder">Cycle Detected - No Valid Hierarchy</div></div>';
  } else {
    html += '<p style="color: #888;">No valid hierarchies found.</p>';
  }

  // Invalid entries
  html += '<h3 style="margin: 20px 0 8px; color: #ff6b7a;">Invalid Entries</h3>';
  if (result.invalid_entries && result.invalid_entries.length > 0) {
    html += '<ul class="entry-list">';
    result.invalid_entries.forEach(entry => {
      html += `<li>${entry}</li>`;
    });
    html += '</ul>';
  } else {
    html += '<p style="color: #888;">None</p>';
  }

  // Duplicate edges
  html += '<h3 style="margin: 20px 0 8px; color: #ffa502;">Duplicate Edges</h3>';
  if (result.duplicate_edges && result.duplicate_edges.length > 0) {
    html += '<ul class="entry-list duplicate-list">';
    result.duplicate_edges.forEach(edge => {
      html += `<li>${edge}</li>`;
    });
    html += '</ul>';
  } else {
    html += '<p style="color: #888;">None</p>';
  }

  // Raw JSON toggle
  html += `
    <div class="json-toggle-container">
      <button class="json-toggle-btn" onclick="toggleRawJson()">Show Raw JSON</button>
      <pre id="rawJson" class="raw-json hidden">${JSON.stringify(result, null, 2)}</pre>
    </div>
  `;

  resultDisplay.innerHTML = html;
  resultSection.classList.remove('hidden');
}

function treeToObject(node) {
  if (!node.children || node.children.length === 0) {
    return {};
  }
  const obj = {};
  for (const child of node.children) {
    obj[child.name] = treeToObject(child);
  }
  return obj;
}

function renderVisualTree(node, isRoot = false) {
  if (!node) return '';

  const hasChildren = node.children && node.children.length > 0;
  const nodeClass = isRoot ? 'tree-node root' : 'tree-node';
  const icon = hasChildren ? '📁' : '📄';

  let html = `<div class="${nodeClass}">`;
  html += `<span class="node-icon">${icon}</span>`;
  html += `<span class="node-name">${node.name}</span>`;

  if (hasChildren) {
    html += '<div class="tree-children">';
    node.children.forEach((child, index) => {
      const isLast = index === node.children.length - 1;
      html += `<div class="tree-child ${isLast ? 'last' : ''}">`;
      html += '<div class="tree-branch">';
      if (!isLast) {
        html += '<span class="branch-line">├─</span>';
      } else {
        html += '<span class="branch-line">└─</span>';
      }
      html += renderVisualTree(child, false);
      html += '</div></div>';
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}

function toggleRawJson() {
  const rawJson = document.getElementById('rawJson');
  const btn = document.querySelector('.json-toggle-btn');
  if (rawJson.classList.contains('hidden')) {
    rawJson.classList.remove('hidden');
    btn.textContent = 'Hide Raw JSON';
  } else {
    rawJson.classList.add('hidden');
    btn.textContent = 'Show Raw JSON';
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorSection.classList.remove('hidden');
}

function hideError() {
  errorSection.classList.add('hidden');
}

function hideResults() {
  resultSection.classList.add('hidden');
}
