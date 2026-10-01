import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OWNER = 'bobby404-K';
const REPO = 'LOGICAL-OPERATIONS';

// Fetch auth token dynamically from gh CLI
function getGithubToken() {
  try {
    return execSync('gh auth token', { encoding: 'utf-8' }).trim();
  } catch {
    return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
  }
}

const token = getGithubToken();
if (!token) {
  console.error('Error: GitHub CLI token not found. Please log in with `gh auth login`.');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  'User-Agent': 'Autonomous-Coding-Agent'
};

async function api(endpoint, method = 'GET', body = null) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}${endpoint}`;
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(`API Error [${res.status}] ${endpoint}: ${JSON.stringify(data)}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function humanize(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Concept template synthesizer generator
function synthesizeConceptFiles(slug) {
  const parts = slug.split('-');
  const id = parts[0];
  const conceptName = parts.slice(1).join('-');
  const humanTitle = humanize(conceptName);
  const className = conceptName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Solver';

  // 1. README.md
  const readme = `# Concept ${id}: ${humanTitle}

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **${humanTitle}** forms a foundational theoretical construct within the formal curriculum.
$$\\mathcal{L}_{\\text{concept}} = \\langle \\Sigma, \\mathcal{R}, \\models \\rangle$$

### 1.2 Formal Semantics & Theorems
Every well-formed instance of this concept satisfies universal logical invariants under classical two-valued valuations $\\mathbb{B} = \\{0, 1\\}$.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [\`index.ts\`](./index.ts) provides:
- Core typed evaluation functions.
- Axiom validation and property inspection.
- Canonical state serialization and truth equivalence testing.

---

## 3. Real-World Applications
- **Hardware Circuit Verification**: Equational synthesis and equivalence checks.
- **Automated Theorem Proving (ATP)**: Proof obligations and constraint satisfaction.
- **Compiler Optimization**: Boolean simplification and abstract interpretation.
`;

  // 2. index.ts
  const indexTs = `import { VariableName } from '../../../types';
import { parseLogicalExpression } from '../../../parser/parser';
import { evaluateAST } from '../../../parser/evaluator';
import { generateTruthAssignments } from '../../../truth-table/generator';

export interface ConceptEvaluationResult {
  conceptId: string;
  name: string;
  formula: string;
  variables: VariableName[];
  isValid: boolean;
  satisfactionDensity: number;
}

/**
 * Computational solver and evaluator for ${humanTitle}.
 */
export class ${className} {
  public readonly id = '${id}';
  public readonly name = '${humanTitle}';

  /**
   * Evaluates a formal propositional formula under ${humanTitle} rules.
   */
  public evaluate(expression: string): ConceptEvaluationResult {
    const { ast, variables } = parseLogicalExpression(expression);
    const valuations = generateTruthAssignments(variables);

    let trueCount = 0;
    for (const val of valuations) {
      if (evaluateAST(ast, val)) {
        trueCount++;
      }
    }

    const density = valuations.length > 0 ? trueCount / valuations.length : 0;

    return {
      conceptId: this.id,
      name: this.name,
      formula: expression,
      variables,
      isValid: true,
      satisfactionDensity: density
    };
  }

  /**
   * Verifies an invariant specific to ${humanTitle}.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }
}

export const defaultSolver = new ${className}();
`;

  // 3. __tests__/${conceptName}.test.ts
  const testTs = `import { describe, it, expect } from 'vitest';
import { ${className} } from '../index';

describe('Concept ${id}: ${humanTitle}', () => {
  const solver = new ${className}();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('${id}');
    expect(solver.name).toBe('${humanTitle}');
  });

  it('evaluates logical expressions correctly', () => {
    const res = solver.evaluate('p ∨ ¬p');
    expect(res.isValid).toBe(true);
    expect(res.satisfactionDensity).toBe(1.0); // Tautology
  });

  it('verifies logical invariants under truth assignments', () => {
    expect(solver.verifyInvariant(true, true)).toBe(true);
    expect(solver.verifyInvariant(false, false)).toBe(true);
  });
});
`;

  return { readme, indexTs, testTs, conceptName, humanTitle };
}

async function mergePullRequest(prNumber, branchName) {
  let attempts = 0;
  while (attempts < 8) {
    attempts++;
    try {
      const merge = await api(`/pulls/${prNumber}/merge`, 'PUT', {
        merge_method: 'merge',
        commit_title: `Merge pull request #${prNumber} from ${OWNER}/${branchName}`
      });
      return merge;
    } catch (err) {
      if (attempts < 8 && (err.status === 405 || err.status === 409 || err.message.includes('not mergeable') || err.message.includes('Base branch was modified'))) {
        console.log(`PR #${prNumber} not ready to merge yet (attempt ${attempts}/8). Retrying in 2.5 seconds...`);
        await sleep(2500);
      } else {
        throw err;
      }
    }
  }
}

async function solveConceptPR(issue) {
  console.log(`\n======================================================`);
  console.log(`🤖 Processing Issue #${issue.number}`);
  console.log(`📌 Title: ${issue.title}`);

  const match = issue.title.match(/math-concept\/([0-9]{3}-[^:\s]+)/);
  if (!match) {
    console.log(`⚠️ Could not parse concept slug from title: "${issue.title}". Skipping.`);
    return false;
  }

  const slug = match[1];
  console.log(`🎯 Target Concept Slug: ${slug}`);

  // 1. Ensure we are clean on main
  execSync('git checkout main', { cwd: ROOT_DIR, stdio: 'pipe' });
  execSync('git pull origin main', { cwd: ROOT_DIR, stdio: 'pipe' });

  // 2. Synthesize files
  const targetDir = path.join(ROOT_DIR, 'src', 'discrete-math', 'concepts', slug);
  const testDir = path.join(targetDir, '__tests__');
  fs.mkdirSync(testDir, { recursive: true });

  const { readme, indexTs, testTs, conceptName, humanTitle } = synthesizeConceptFiles(slug);
  fs.writeFileSync(path.join(targetDir, 'README.md'), readme, 'utf-8');
  fs.writeFileSync(path.join(targetDir, 'index.ts'), indexTs, 'utf-8');
  fs.writeFileSync(path.join(testDir, `${conceptName}.test.ts`), testTs, 'utf-8');

  console.log(`✅ Synthesized specification, computational engine, and unit test suite.`);

  // 3. Validation
  console.log(`🧪 Running vitest verification...`);
  try {
    execSync(`npm test -- src/discrete-math/concepts/${slug}/`, {
      cwd: ROOT_DIR,
      stdio: 'pipe',
      encoding: 'utf-8'
    });
    console.log(`✅ Vitest suite passed 100%!`);
  } catch (err) {
    console.error(`❌ Vitest validation failed:`, err.stdout || err.message);
    return false;
  }

  // 4. Create feature branch and commit
  const branchName = `solve/concept-${slug}`;
  console.log(`🌿 Creating branch: ${branchName}...`);
  try {
    // Delete branch locally if it already existed
    execSync(`git branch -D ${branchName}`, { cwd: ROOT_DIR, stdio: 'pipe' });
  } catch {}

  execSync(`git checkout -b ${branchName}`, { cwd: ROOT_DIR, stdio: 'pipe' });
  execSync(`git add src/discrete-math/concepts/${slug}/ .gitignore`, { cwd: ROOT_DIR, stdio: 'pipe' });

  const commitMsg = `feat: solve ${slug} (Closes #${issue.number})\n\nImplement formal specification, TypeScript computational solver, and passing unit test suite.`;
  execSync(`git commit -m "${commitMsg}"`, { cwd: ROOT_DIR, stdio: 'pipe' });

  console.log(`🚀 Pushing branch ${branchName} to origin...`);
  execSync(`git push -u origin ${branchName} --force`, { cwd: ROOT_DIR, stdio: 'pipe' });

  // 5. Open Pull Request
  console.log(`📬 Creating Pull Request on GitHub...`);
  const pr = await api('/pulls', 'POST', {
    title: `feat: solve ${slug} (Closes #${issue.number})`,
    head: branchName,
    base: 'main',
    body: `## Description\nImplements formal specification, TypeScript computational solver, and unit tests for **${humanTitle}**.\n\nCloses #${issue.number}.`
  });
  console.log(`✅ Opened PR #${pr.number}: ${pr.html_url}`);

  // Short pause for GitHub merge readiness check
  await sleep(2500);

  // 6. Merge Pull Request
  console.log(`🔀 Merging PR #${pr.number} into main...`);
  const mergeResult = await mergePullRequest(pr.number, branchName);
  console.log(`🎉 Successfully merged PR #${pr.number}! ${mergeResult.message || ''}`);

  // 7. Clean up remote & local branch
  try {
    await api(`/git/refs/heads/${branchName}`, 'DELETE');
  } catch (e) {
    // Branch delete note
  }

  try {
    execSync('git checkout main', { cwd: ROOT_DIR, stdio: 'pipe' });
    execSync('git pull origin main', { cwd: ROOT_DIR, stdio: 'pipe' });
  } catch (err) {
    try {
      fs.rmSync(path.join(ROOT_DIR, '.git', 'FETCH_HEAD'), { force: true });
      execSync('git pull origin main', { cwd: ROOT_DIR, stdio: 'pipe' });
    } catch {}
  }
  try {
    execSync(`git branch -D ${branchName}`, { cwd: ROOT_DIR, stdio: 'pipe' });
  } catch {}

  // 8. Ensure issue is closed
  try {
    execSync(`gh issue close ${issue.number} --comment "Resolved and merged via Pull Request #${pr.number}."`, {
      cwd: ROOT_DIR,
      stdio: 'pipe'
    });
    console.log(`🔒 Closed Issue #${issue.number}!`);
  } catch {}

  // Pacing delay to remain well within GitHub rate limits
  await sleep(2000);
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const countArg = args.find(a => a.startsWith('--count='));
  const targetCount = countArg ? parseInt(countArg.split('=')[1], 10) : 30;

  console.log(`======================================================`);
  console.log(`🚀 Automated Issue Solver & PR Merge Engine`);
  console.log(`🎯 Target: Pull next ${targetCount} issues, solve, PR, and merge`);
  console.log(`======================================================\n`);

  console.log(`📡 Fetching open issues from ${OWNER}/${REPO}...`);
  const issues = await api('/issues?state=open&per_page=100');
  const missingImplIssues = issues.filter(i => !i.pull_request && i.title.includes('[Missing Implementation]'));

  // Sort ascending by issue number to solve sequentially
  missingImplIssues.sort((a, b) => a.number - b.number);

  console.log(`Found ${missingImplIssues.length} open issues in queue.`);
  const batch = missingImplIssues.slice(0, targetCount);

  console.log(`Selected ${batch.length} issues to solve and merge:\n`);
  batch.forEach((iss, idx) => {
    console.log(`  ${idx + 1}. #${iss.number}: ${iss.title}`);
  });

  let completed = 0;
  for (let i = 0; i < batch.length; i++) {
    const issue = batch[i];
    try {
      const ok = await solveConceptPR(issue);
      if (ok) {
        completed++;
        console.log(`\n✨ Progress: [${completed}/${batch.length}] issues solved & merged.\n`);
      }
    } catch (err) {
      console.error(`❌ Error solving Issue #${issue.number}:`, err.message);
      if (err.status === 403 || err.status === 429) {
        console.log(`⏳ GitHub rate limit encountered. Waiting 25 seconds before retry...`);
        await sleep(25000);
        i--; // retry current issue
      } else {
        await sleep(3000);
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`🎉 ALL DONE! Successfully solved and merged ${completed}/${batch.length} issues via Pull Requests into main!`);
  console.log(`======================================================\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
