# Logic Table 📐 — Interactive Truth Table Workspace

> **"Desmos for Discrete Mathematics"** — An educational workspace for learning, constructing, and verifying truth tables in propositional logic.

![Logic Table](https://img.shields.io/badge/Discrete%20Math-Truth%20Tables-6366f1)
![React 19](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Vite](https://img.shields.io/badge/Vite-8-646cff)
![Vitest](https://img.shields.io/badge/Tests-28%20Passed-emerald)

---

## 🎯 Core Educational Principle

**The application does NOT automatically solve logical expressions.**

Instead, it generates **ONLY** the basic truth-value combinations for the variables present in the expression (e.g. $2^n$ rows in standard textbook binary ordering).

The student manually constructs all intermediate columns (e.g. $\neg t$, $p \land r \land s$, $q \land t$) and evaluates truth values themselves. The computer handles repetitive row permutations while the student learns and practices discrete mathematics!

---

## ✨ Features

- **Base Truth-Value Generator**:
  - Automatically identifies variables in standard mathematical order ($p, q, r, s, t, u, v, w, x, y$).
  - Generates exactly $2^n$ rows in standard discrete math truth table order.
  - Supports up to **10 variables ($1024$ rows)** with virtualized 60fps scrolling.
- **Manual Student Columns**:
  - Click `+ Add Column` to create custom columns.
  - In-place expression editor with quick math symbol inserter.
  - Editable $T$ / $F$ cells via click, dropdown, or rapid keyboard shortcuts.
- **Educational Verification (Check Column)**:
  - Validates student values row-by-row against AST evaluation.
  - Provides pedagogical feedback (`✓ Correct`, `✗ 3 incorrect`, `5 unfilled`).
  - **Does NOT reveal correct values** unless the student explicitly clicks `Show Solution`.
- **Practice Mode**:
  - Built-in curated challenges for Beginner, Intermediate, and Advanced tiers.
  - Dynamic random problem generator.
  - Multi-tier progressive hints that guide without spoiling.
  - Recommended sub-step sequences to scaffold column construction.
  - Full step-by-step solution guide modal.
- **Learn Mode**:
  - Interactive reference cards for all 8 connectives.
  - Live interactive sandbox: toggle $p$ and $q$ inputs to watch truth values compute in real time.
  - Discrete math insights (e.g. *Vacuous truth* in material implication, functional completeness of NAND/NOR).
- **Exporting & Shortcuts**:
  - One-click export to GitHub-flavored Markdown tables and CSV spreadsheets.
  - Full keyboard navigation: $T$, $F$, $\uparrow$, $\downarrow$, $\leftarrow$, $\rightarrow$, `Space`, `Backspace`, `Tab`.
  - Sleek Dark / Light theme.

---

## ⚡ Supported Connectives & Precedence

| Operator | Standard Symbol | Text Aliases | Precedence | Description |
| :--- | :---: | :--- | :---: | :--- |
| **Negation** | $\neg$ | `NOT`, `~`, `!` | 1 (Highest) | Inverts truth value |
| **Conjunction** | $\land$ | `AND`, `&`, `/\` | 2 | True only if both inputs are True |
| **NAND** | $\uparrow$ | `NAND` | 2 | Negation of conjunction (Sheffer stroke) |
| **Disjunction** | $\lor$ | `OR`, `\|`, `\/` | 3 | True if at least one input is True |
| **XOR** | $\oplus$ | `XOR`, `^` | 3 | True if inputs differ (exclusive OR) |
| **NOR** | $\downarrow$ | `NOR` | 3 | True only if both inputs are False (Peirce arrow) |
| **Implication** | $\to$ | `->`, `=>`, `IMPLIES` | 4 | False only when $T \to F$ (Right-associative) |
| **Biconditional** | $\leftrightarrow$ | `<->`, `<=>`, `IFF` | 5 (Lowest) | True when inputs match |

*Parentheses `(...)` override precedence.*

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/bobby404-K/LOGICAL-OPERATIONS.git
cd LOGICAL-OPERATIONS

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Run Unit Tests
```bash
npm test
```
Runs 28 automated tests across expression tokenization, recursive descent parsing, operator precedence, AST evaluation, and discrete math truth table generation.

### Production Build
```bash
npm run build
```

---

## 🏛️ Architecture

```
src/
├── parser/
│   ├── tokens.ts          # Operator mappings and aliases
│   ├── tokenizer.ts       # Lexer with position tracking
│   ├── ast.ts             # AST definitions
│   ├── parser.ts          # Recursive descent parser
│   ├── evaluator.ts       # Pure AST evaluator (no eval)
│   └── parser.test.ts     # 20 parser tests
├── truth-table/
│   ├── generator.ts       # Standard 2^n binary permutations
│   ├── checker.ts         # Student column validation
│   └── generator.test.ts  # 8 generator tests
├── store/
│   └── useLogicStore.ts   # State management hook
├── components/
│   ├── Header.tsx         # Navbar, theme toggle, modals
│   ├── ExpressionInput.tsx# Expression editor & variable stats
│   ├── OperatorToolbar.tsx# Math symbol insertion toolbar
│   ├── PresetsBar.tsx     # Discrete math laws & theorems
│   ├── PracticeModeBar.tsx# Problem challenges & progressive hints
│   ├── TruthTable.tsx     # Virtualized 60fps table workspace
│   ├── StudentColumnHeader.tsx # Editable header & column actions
│   ├── TableCell.tsx      # Interactive T/F cell
│   ├── LearnModal.tsx     # Interactive operator handbook
│   ├── ShortcutsModal.tsx # Keyboard cheatsheet
│   ├── ExportModal.tsx    # Markdown / CSV export
│   └── SolutionGuideModal.tsx # Full solution breakdown
├── utils/
│   ├── presets.ts         # Curated discrete math theorems
│   ├── practiceGenerator.ts# Progressive problems
│   └── formatters.ts      # Markdown & CSV formatters
└── types/
    └── index.ts           # TypeScript interfaces
```

---

## 📜 License
MIT License.
