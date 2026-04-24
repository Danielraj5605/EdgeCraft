# EdgeCraft

> Hierarchical Node Relationship Analyzer — A full stack web application for processing and visualizing tree structures from node relationships.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![Node](https://img.shields.io/badge/node.js-%3E%3D18.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📋 Project Overview

EdgeCraft is a **full stack web application** developed as part of the **SRM Full Stack Engineering Challenge**. It accepts hierarchical node relationships in the format `A->B` and processes them to construct tree structures, detect cycles, identify invalid entries, and generate analytical summaries.

The system consists of:
- A **REST API** (`POST /bfhl`) for backend processing
- An **interactive frontend** for data input and visualization

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Node Validation** | Validates `X->Y` format, uppercase single characters (A-Z), rejects self-loops |
| **Tree Construction** | Builds hierarchical tree structures from valid edges |
| **Cycle Detection** | DFS-based algorithm to detect cyclic graphs |
| **Duplicate Handling** | Identifies and flags duplicate edges |
| **Depth Calculation** | Computes maximum depth of each tree |
| **Summary Generation** | Provides aggregate statistics (trees, nodes, cycles, etc.) |
| **Interactive UI** | Clean interface with visual tree display and stats cards |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Node.js, Express.js |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Hosting** | Render (Backend), Vercel (Frontend) |

---

## 📁 Project Structure

```
EdgeCraft/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json
│   ├── routes/
│   │   └── bfhl.js              # POST /bfhl endpoint
│   └── modules/
│       ├── parser.js             # Parse "A->B" strings
│       ├── validator.js          # Validate node format
│       ├── duplicateHandler.js   # Track & remove duplicates
│       ├── graphBuilder.js       # Build adjacency list
│       ├── cycleDetector.js      # DFS-based cycle detection
│       ├── treeBuilder.js        # Construct tree structures
│       ├── depthCalculator.js    # Calculate tree depth
│       ├── summaryGenerator.js   # Generate statistics
│       └── responseBuilder.js    # Format API response
├── frontend/
│   ├── index.html                # Main UI
│   ├── styles.css                # Styling
│   └── app.js                    # API integration
├── README.md
└── package.json
```

---

## 📡 API Documentation

### Endpoint

```
POST /bfhl
```

### Request Format

```json
{
  "user_id": "john_doe_17091999",
  "email_id": "john@xyz.com",
  "college_roll_number": "12345678",
  "data": ["A->B", "A->C", "B->D", "C->E"]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_id` | string | Yes | Unique user identifier |
| `email_id` | string | Yes | User email address |
| `college_roll_number` | string | Yes | College roll number |
| `data` | string[] | Yes | Array of node relationships |

### Response Format

```json
{
  "user_id": "john_doe_17091999",
  "email_id": "john@xyz.com",
  "college_roll_number": "12345678",
  "hierarchies": [
    {
      "name": "A",
      "children": [
        {
          "name": "B",
          "children": [{"name": "D", "children": []}]
        },
        {
          "name": "C",
          "children": [{"name": "E", "children": []}]
        }
      ]
    }
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "max_depth": 3,
    "largest_tree_root": "A",
    "cycle_detected": false,
    "cycle_nodes": [],
    "total_edges": 4,
    "total_nodes": 5,
    "duplicate_count": 0,
    "invalid_count": 0
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `hierarchies` | object[] | Array of tree structures |
| `invalid_entries` | string[] | Entries with invalid format |
| `duplicate_edges` | string[] | Repeated edges (first occurrence kept) |
| `summary.total_trees` | number | Number of valid trees |
| `summary.max_depth` | number | Maximum tree depth |
| `summary.largest_tree_root` | string | Root of the largest tree |
| `summary.cycle_detected` | boolean | Whether a cycle exists |
| `summary.cycle_nodes` | string[] | Nodes involved in cycle |

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/EdgeCraft.git
cd EdgeCraft
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Run Backend Server

```bash
npm start
```

Backend runs at: `http://localhost:3000`

### 4. Run Frontend

Open `frontend/index.html` directly in your browser, or serve it:

```bash
npx serve frontend
```

Frontend runs at: `http://localhost:3000` (when served)

---

## 📖 Usage Guide

### Input Format

Enter node relationships one per line:

```
A->B
A->C
B->D
C->E
```

### Validation Rules

| Rule | Example | Result |
|------|---------|--------|
| Valid format | `A->B` | ✅ Accepted |
| Lowercase | `a->B` | ❌ Invalid |
| Multi-char node | `AB->C` | ❌ Invalid |
| Self-loop | `A->A` | ❌ Invalid |
| Duplicate | `A->B`, `A->B` | ⚠️ Flagged as duplicate |

### Edge Cases Handled

- Empty input → Returns empty hierarchies
- Pure cycle → `cycle_detected: true`, no root hierarchy
- Multi-parent conflicts → Keeps first occurrence
- All invalid → Returns all as `invalid_entries`

---

## 📸 Screenshots

> *Screenshots coming soon*

| Screenshot | Description |
|------------|-------------|
| ![UI Input](screenshots/input.png) | Input form with user details |
| ![Tree Output](screenshots/output.png) | Visual tree and statistics |
| ![Cycle Detection](screenshots/cycle.png) | Cycle detection alert |

---

## 🔗 Deployment

| Service | URL | Status |
|---------|-----|--------|
| **Backend API** | `https://edgecraft-bfhl.onrender.com/bfhl` | 🚀 Live |
| **Frontend** | Deploy to Vercel/Netlify and add URL | ⏳ Pending |

---

## 👤 Author

| Detail | Value |
|--------|-------|
| **Name** | Your Name |
| **Email** | your.email@example.com |
| **College Roll Number** | 12345678 |

---

## 📝 Notes

- All problem constraints from the SRM Full Stack Engineering Challenge specification were followed
- API response format strictly matches the required schema
- Edge cases including cycles, duplicates, and invalid inputs are properly handled
- The UI displays results in a clean, structured format with a visual tree representation
- A "Show Raw JSON" toggle is provided for evaluators to verify API responses

