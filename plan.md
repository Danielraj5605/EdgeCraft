# SRM Full Stack Engineering Challenge — Software Blueprint

## 1. Problem Statement

Build and host a full-stack application:
- REST API (`POST /bfhl`) that processes hierarchical node relationships
- Frontend interface for node input and structured output viewing

**Core Requirements:**
- Validate node relationships (`X->Y` format)
- Construct trees from relationships
- Detect cycles
- Identify invalid and duplicate entries
- Return structured analytical output

**Target Users:** Evaluators (primary), Students/Developers (secondary)

**Assumptions:**
- Nodes are uppercase single characters (A–Z)
- Max ~50 nodes per request
- No authentication required
- Single-user interaction

---

## 2. Tech Stack

| Layer | Technology | Reason |
|-------|-------------|--------|
| Backend | Node.js + Express | Matches preferred stack |
| Frontend | HTML + JS (or React) | Fast UI development |
| Database | None (MVP) | Not required |
| Backend Hosting | Render / Railway | |
| Frontend Hosting | Vercel / Netlify | |

---

## 3. API Specification

### Endpoint
```
POST /bfhl
```

### Request Body
```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

### Response Body
```json
{
  "user_id": "john_doe_17091999",
  "email_id": "john@xyz.com",
  "college_roll_number": "12345678",
  "hierarchies": [...],
  "invalid_entries": [...],
  "duplicate_edges": [...],
  "summary": {
    "total_trees": 1,
    "max_depth": 3,
    "cycle_detected": false
  }
}
```

---

## 4. Data Processing Rules

### Validation (Reject if:)
- Invalid format (not `X->Y`)
- Nodes not uppercase single letters (A–Z)
- Self-loop (`A->A`)

### Handling
- Multiple trees (forest support)
- Multi-parent nodes — keep first occurrence
- Cycles — report but don't crash

---

## 5. Backend Modules

1. **Input Parser** — Split `A->B` strings into edge pairs
2. **Validator** — Format, uppercase, self-loop checks
3. **Duplicate Handler** — Track and remove repeated edges
4. **Graph Builder** — Build adjacency list from edges
5. **Cycle Detector** — DFS-based cycle detection
6. **Tree Builder** — Identify roots, build tree structures
7. **Depth Calculator** — Calculate max depth per tree
8. **Summary Generator** — Aggregate statistics
9. **Response Builder** — Format final JSON response

---

## 6. Frontend Structure

| Component | Purpose |
|-----------|---------|
| `InputForm` | Textarea for node input |
| `SubmitButton` | Trigger API call |
| `ResultDisplay` | Render structured output |
| `ErrorMessage` | Show error states |

---

## 7. Data Flow

1. User inputs node list
2. Frontend sends POST request to `/bfhl`
3. Backend parses input
4. Validation runs — invalid entries extracted
5. Duplicate edges removed
6. Graph constructed
7. Cycle detection applied
8. Trees built
9. Depth calculated
10. Summary generated
11. Response returned
12. Frontend renders result

---

## 8. Implementation Phases

### Phase 1: Core Backend
- [ ] Project setup (Express server)
- [ ] Input parser
- [ ] Validator
- [ ] Duplicate handler
- [ ] Graph builder
- [ ] Cycle detector (DFS)
- [ ] Tree builder
- [ ] Depth calculator
- [ ] Summary generator
- [ ] `POST /bfhl` endpoint

### Phase 2: Frontend
- [ ] Input UI (textarea + submit)
- [ ] API integration
- [ ] Output display
- [ ] Error handling

### Phase 3: Deployment
- [ ] Deploy backend (Render/Railway)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] CORS configuration

---

## 9. Edge Cases

| Edge Case | Handling |
|-----------|----------|
| Empty input | Return empty hierarchies |
| All invalid entries | Return all as invalid_entries |
| Pure cycle (no root) | cycle_detected: true, no root hierarchy |
| Multi-parent conflicts | Keep first occurrence |
| Deep trees | Calculate depth recursively |
| Repeated duplicates | Flag in duplicate_edges |

---

## 10. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Response time | < 3 seconds for ≤50 nodes |
| Scalability | Stateless API design |
| Security | Input validation, CORS enabled |
| Reliability | Deterministic outputs, no crashes on bad input |
| Usability | Clean UI, readable structured output |

---

## 11. Project Structure

```
EdgeCraft/
├── backend/
│   ├── server.js           # Express entry point
│   ├── routes/
│   │   └── bfhl.js         # POST /bfhl route
│   └── modules/
│       ├── parser.js
│       ├── validator.js
│       ├── duplicateHandler.js
│       ├── graphBuilder.js
│       ├── cycleDetector.js
│       ├── treeBuilder.js
│       ├── depthCalculator.js
│       ├── summaryGenerator.js
│       └── responseBuilder.js
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── package.json
```

---

## 12. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Incorrect cycle detection | Thorough DFS testing |
| Tree construction bugs | Edge case testing |
| Performance issues | Keep O(n) algorithms |
| Complex UI rendering | Use simple JSON display first |
st