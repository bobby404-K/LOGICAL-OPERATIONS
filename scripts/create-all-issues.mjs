import { execSync } from 'child_process';

const OWNER = 'bobby404-K';
const REPO = 'LOGICAL-OPERATIONS';

// Fetch auth token dynamically from gh CLI
const token = execSync('gh auth token', { encoding: 'utf-8' }).trim();
if (!token) {
  console.error('Error: GitHub CLI token not found. Please log in with `gh auth login`.');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  'User-Agent': 'Antigravity-Automation'
};

const mathConcepts = [
  'math-concept/001-propositional-syntax',
  'math-concept/002-truth-functional-connectives',
  'math-concept/003-truth-table-construction',
  'math-concept/004-tautologies-and-contradictions',
  'math-concept/005-logical-equivalence-laws',
  'math-concept/006-demorgan-laws',
  'math-concept/007-distributive-laws',
  'math-concept/008-conditional-statements',
  'math-concept/009-contrapositive-and-converse',
  'math-concept/010-biconditional-equivalences',
  'math-concept/011-disjunctive-normal-form',
  'math-concept/012-conjunctive-normal-form',
  'math-concept/013-tseitin-transformation',
  'math-concept/014-boolean-satisfiability-sat',
  'math-concept/015-dpll-algorithm',
  'math-concept/016-horn-clauses',
  'math-concept/017-resolution-principle',
  'math-concept/018-predicate-logic-syntax',
  'math-concept/019-universal-quantifiers',
  'math-concept/020-existential-quantifiers',
  'math-concept/021-nested-quantifiers',
  'math-concept/022-quantifier-negation-laws',
  'math-concept/023-prenex-normal-form',
  'math-concept/024-skolemization',
  'math-concept/025-first-order-models',
  'math-concept/026-rules-of-inference',
  'math-concept/027-modus-ponens',
  'math-concept/028-modus-tollens',
  'math-concept/029-hypothetical-syllogism',
  'math-concept/030-disjunctive-syllogism',
  'math-concept/031-proof-by-cases',
  'math-concept/032-proof-by-contradiction',
  'math-concept/033-proof-by-contraposition',
  'math-concept/034-direct-proofs',
  'math-concept/035-existence-proofs',
  'math-concept/036-uniqueness-proofs',
  'math-concept/037-counterexamples',
  'math-concept/038-naive-set-theory',
  'math-concept/039-russells-paradox',
  'math-concept/040-set-builder-notation',
  'math-concept/041-subset-relations',
  'math-concept/042-power-sets',
  'math-concept/043-cartesian-products',
  'math-concept/044-union-and-intersection',
  'math-concept/045-set-difference',
  'math-concept/046-symmetric-difference',
  'math-concept/047-set-complements',
  'math-concept/048-de-morgan-set-identities',
  'math-concept/049-venn-diagrams',
  'math-concept/050-binary-relations',
  'math-concept/051-reflexive-relations',
  'math-concept/052-symmetric-relations',
  'math-concept/053-antisymmetric-relations',
  'math-concept/054-transitive-relations',
  'math-concept/055-equivalence-relations',
  'math-concept/056-equivalence-classes',
  'math-concept/057-set-partitions',
  'math-concept/058-partial-orderings-posets',
  'math-concept/059-hasse-diagrams',
  'math-concept/060-total-orderings',
  'math-concept/061-well-ordered-sets',
  'math-concept/062-topological-sorting',
  'math-concept/063-functions-and-mappings',
  'math-concept/064-injective-functions',
  'math-concept/065-surjective-functions',
  'math-concept/066-bijective-functions',
  'math-concept/067-inverse-functions',
  'math-concept/068-function-composition',
  'math-concept/069-floor-and-ceiling-functions',
  'math-concept/070-pigeonhole-principle',
  'math-concept/071-generalized-pigeonhole-principle',
  'math-concept/072-weak-mathematical-induction',
  'math-concept/073-strong-mathematical-induction',
  'math-concept/074-well-ordering-principle',
  'math-concept/075-structural-induction',
  'math-concept/076-recursive-definitions',
  'math-concept/077-division-algorithm',
  'math-concept/078-prime-factorization',
  'math-concept/079-euclidean-algorithm',
  'math-concept/080-extended-euclidean-algorithm',
  'math-concept/081-bezouts-identity',
  'math-concept/082-modular-arithmetic',
  'math-concept/083-modular-inverses',
  'math-concept/084-chinese-remainder-theorem',
  'math-concept/085-fermats-little-theorem',
  'math-concept/086-euler-totient-function',
  'math-concept/087-rsa-cryptosystem',
  'math-concept/088-rule-of-sum-and-product',
  'math-concept/089-permutations',
  'math-concept/090-combinations',
  'math-concept/091-stars-and-bars-theorem',
  'math-concept/092-binomial-theorem',
  'math-concept/093-pascals-triangle',
  'math-concept/094-inclusion-exclusion-principle',
  'math-concept/095-derangements',
  'math-concept/096-recurrence-relations',
  'math-concept/097-generating-functions',
  'math-concept/098-graph-isomorphism',
  'math-concept/099-eulerian-and-hamiltonian-graphs',
  'math-concept/100-turing-machines-and-complexity'
];

const topicBranches = [
  'topic/01-propositional-logic-foundations',
  'topic/02-predicate-logic-and-quantifiers',
  'topic/03-rules-of-inference-and-proof-methods',
  'topic/04-set-theory-and-operations',
  'topic/05-relations-equivalence-and-posets',
  'topic/06-functions-mappings-and-cardinality',
  'topic/07-mathematical-induction-and-recursion',
  'topic/08-number-theory-and-cryptography',
  'topic/09-combinatorics-and-counting-principles',
  'topic/10-advanced-counting-and-recurrence-relations',
  'topic/11-discrete-probability-and-expectation',
  'topic/12-graph-theory-foundations-and-structures',
  'topic/13-graph-connectivity-eulerian-hamiltonian',
  'topic/14-trees-spanning-trees-and-traversals',
  'topic/15-planar-graphs-and-graph-coloring',
  'topic/16-boolean-algebra-and-logic-circuits',
  'topic/17-finite-automata-and-regular-languages',
  'topic/18-computability-turing-machines-complexity'
];

function humanize(str) {
  return str
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function generateConceptIssue(branch) {
  const slug = branch.replace('math-concept/', '');
  const parts = slug.split('-');
  const num = parts[0];
  const topicName = humanize(parts.slice(1).join('-'));

  const title = `[Missing Implementation] ${branch}: No files or logic added for ${topicName}`;

  const body = `## 📌 Branch Reference
- **Branch**: [\`${branch}\`](https://github.com/${OWNER}/${REPO}/tree/${branch})
- **Topic ID**: \`${num}\`
- **Topic Name**: **${topicName}**
- **Category**: Discrete Mathematics & Formal Logic

---

## ⚠️ Issue Description & Current State
The branch \`${branch}\` was merged into \`main\` via pull request to establish branch architecture and Git commit history. However, an audit of the codebase reveals that **no actual implementation files, specifications, algorithms, or tests were added** for **${topicName}**.

Currently, this concept exists only as a branch/PR reference with zero substantive logic in the project.

---

## 🛠️ Required Files & Implementation Plan
To complete the implementation for **${topicName}**, the following deliverables must be added:

1. **📄 Formal Documentation**
   - File: \`src/discrete-math/concepts/${slug}/README.md\`
   - Needs: Rigorous mathematical definitions, formal axioms, theorem statements, truth semantics, and real-world computer science applications.

2. **⚙️ Computational Engine / Logic Module**
   - File: \`src/discrete-math/concepts/${slug}/index.ts\`
   - Needs: TypeScript types, evaluation functions, validators, or solver algorithms specific to ${topicName}.

3. **🧪 Comprehensive Unit Test Suite**
   - File: \`src/discrete-math/concepts/${slug}/__tests__/${parts.slice(1).join('-')}.test.ts\`
   - Needs: Test coverage verifying truth correctness, boundary conditions, invalid inputs, and mathematical edge cases.

4. **🎨 Interactive Playground Integration**
   - Connect ${topicName} presets and interactive examples to the web application UI.

---

## 📋 Action Checklist
- [ ] Create \`src/discrete-math/concepts/${slug}/\` directory structure
- [ ] Author in-depth Markdown documentation covering theorems & proofs
- [ ] Write TypeScript computational solver / evaluator
- [ ] Add 100% passing unit tests
- [ ] Expose concept in the web application explorer

---
*Reported via automated repository codebase audit for ${OWNER}/${REPO}.*`;

  return { title, body, labels: ['enhancement', 'documentation'] };
}

function generateTopicIssue(branch) {
  const slug = branch.replace('topic/', '');
  const parts = slug.split('-');
  const num = parts[0];
  const topicName = humanize(parts.slice(1).join('-'));

  const title = `[Topic Enhancement] ${branch}: Missing interactive visual simulators & solver suites for ${topicName}`;

  const body = `## 📌 Topic Track Reference
- **Branch**: [\`${branch}\`](https://github.com/${OWNER}/${REPO}/tree/${branch})
- **Track**: \`${num}\` — **${topicName}**
- **Directory**: \`src/discrete-math/${slug}/\`

---

## ⚠️ Issue Description & Current State
While foundational curriculum notes exist under \`src/discrete-math/${slug}/README.md\`, the topic currently **lacks interactive visual components, automated verification solvers, and dedicated challenge problem sets** in the web application.

Users cannot currently interact with or test their knowledge of **${topicName}** through dynamic UI simulations or interactive proofs.

---

## 🛠️ Required Enhancements
1. **Interactive Visual Simulator**:
   - Implement dynamic visualizers (e.g. interactive truth tables, relation matrix graphers, Venn diagram shapers, or state machine visualizers).
2. **Computational Solver**:
   - Add TypeScript algorithms to solve and verify problems in ${topicName}.
3. **Interactive Challenges**:
   - Add graded exercises with instant feedback in the practice challenges modal.
4. **Automated Unit Testing**:
   - Add comprehensive tests under \`src/discrete-math/${slug}/__tests__/\`.

---

## 📋 Action Checklist
- [ ] Build interactive React/TypeScript UI component for ${topicName}
- [ ] Implement algorithmic solver utilities
- [ ] Create practice challenge problems
- [ ] Add automated test suite with full test coverage

---
*Reported via automated repository codebase audit for ${OWNER}/${REPO}.*`;

  return { title, body, labels: ['enhancement', 'help wanted'] };
}

function generateMainIssue() {
  const title = `[Master Roadmap] main: Complete integration of all 100 Discrete Math concepts and 18 core topics`;

  const body = `## 📌 Repository Integration & Roadmap Tracking
- **Branch**: [\`main\`](https://github.com/${OWNER}/${REPO})
- **Total Math Concepts**: 100
- **Total Topic Tracks**: 18
- **Total Tracked Branches**: 119

---

## ⚠️ Problem Statement
All 100 discrete math concept branches and 18 topic tracks have been merged into \`main\`. However, the individual implementations, test suites, and interactive visual modules across all 100 concepts need to be progressively built, tested, and integrated into the core web application UI.

---

## 🎯 Master Objectives
- [ ] Verify all 100 discrete math concept specification documents exist under \`src/discrete-math/concepts/\`
- [ ] Ensure all 18 core curriculum topics have interactive UI simulators
- [ ] Achieve full automated unit test coverage across all logical operation solvers
- [ ] Deploy updated interactive web application build to production

---
*Central coordination issue for ${OWNER}/${REPO}.*`;

  return { title, body, labels: ['enhancement', 'documentation'] };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function api(path, method = 'GET', body = null) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}${path}`;
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(`API Error [${res.status}] ${path}: ${JSON.stringify(data)}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function main() {
  console.log('Gathering all 119 branches for issue generation...');

  const allItems = [];

  // 100 Concept Branches
  for (const branch of mathConcepts) {
    allItems.push({ type: 'concept', branch, ...generateConceptIssue(branch) });
  }

  // 18 Topic Branches
  for (const branch of topicBranches) {
    allItems.push({ type: 'topic', branch, ...generateTopicIssue(branch) });
  }

  // Main Branch
  allItems.push({ type: 'main', branch: 'main', ...generateMainIssue() });

  console.log(`Total issues to create: ${allItems.length}`);

  // Fetch existing open issues to avoid duplicates if rerun
  const existingIssues = new Map();
  let page = 1;
  while (true) {
    const issues = await api(`/issues?state=all&per_page=100&page=${page}`);
    if (!issues.length) break;
    for (const iss of issues) {
      if (!iss.pull_request) {
        existingIssues.set(iss.title, iss);
      }
    }
    if (issues.length < 100) break;
    page++;
  }
  console.log(`Found ${existingIssues.size} existing issues.`);

  let createdCount = 0;

  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    const existing = existingIssues.get(item.title);

    if (existing) {
      console.log(`[${i + 1}/${allItems.length}] Already exists: #${existing.number} (${item.title})`);
      continue;
    }

    try {
      const issue = await api('/issues', 'POST', {
        title: item.title,
        body: item.body,
        labels: item.labels
      });

      console.log(`[${i + 1}/${allItems.length}] Created Issue #${issue.number}: ${item.title}`);
      createdCount++;

      // Small delay to ensure respectful API usage and prevent secondary rate limit
      await sleep(850);

    } catch (err) {
      console.error(`[${i + 1}/${allItems.length}] Error creating issue for ${item.branch}:`, err.message);
      if (err.status === 403 || err.status === 429) {
        console.log('Secondary rate limit encountered. Waiting 20 seconds before retry...');
        await sleep(20000);
        i--; // retry this item
      }
    }
  }

  console.log(`\n🎉 SUCCESS! Created ${createdCount} issues across all 119 branches!`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
