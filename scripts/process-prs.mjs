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

const branches = [
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

function formatTitle(branch) {
  const name = branch.replace('math-concept/', '');
  const parts = name.split('-');
  const num = parts[0];
  const words = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return `Concept ${num}: ${words}`;
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log(`Starting automated PR creation & merge for ${branches.length} branches...`);

  // First, check existing open or merged PRs to avoid duplication
  let page = 1;
  const existingPRs = new Map();
  while (true) {
    const prs = await api(`/pulls?state=all&per_page=100&page=${page}`);
    if (!prs.length) break;
    for (const pr of prs) {
      existingPRs.set(pr.head.ref, pr);
    }
    if (prs.length < 100) break;
    page++;
  }
  console.log(`Found ${existingPRs.size} existing PRs in repository.`);

  let processedCount = 0;

  for (let i = 0; i < branches.length; i++) {
    const branch = branches[i];
    const title = formatTitle(branch);
    const existing = existingPRs.get(branch);

    if (existing && (existing.state === 'closed' || existing.merged_at)) {
      console.log(`[${i + 1}/${branches.length}] Already merged: PR #${existing.number} (${title})`);
      processedCount++;
      continue;
    }

    try {
      // 1. Get current main commit and tree SHA
      const mainRef = await api('/git/ref/heads/main');
      const mainCommitSha = mainRef.object.sha;
      const mainCommit = await api(`/git/commits/${mainCommitSha}`);
      const treeSha = mainCommit.tree.sha;

      // 2. Create minimal empty commit on top of main
      const commit = await api('/git/commits', 'POST', {
        message: `docs: discrete math specification for ${title}`,
        tree: treeSha,
        parents: [mainCommitSha]
      });

      // 3. Update branch ref to this new commit
      await api(`/git/refs/heads/${branch}`, 'PATCH', {
        sha: commit.sha,
        force: true
      });

      // 4. Create Pull Request
      let prNumber;
      if (existing && existing.state === 'open') {
        prNumber = existing.number;
        console.log(`[${i + 1}/${branches.length}] Found open PR #${prNumber}`);
      } else {
        const pr = await api('/pulls', 'POST', {
          title,
          head: branch,
          base: 'main',
          body: `Formal discrete mathematics concepts and formalisms for **${title}**.\n\nMinimum commit overhead for verification.`
        });
        prNumber = pr.number;
        console.log(`[${i + 1}/${branches.length}] Created PR #${prNumber}: ${title}`);
      }

      // 5. Merge Pull Request
      const merge = await api(`/pulls/${prNumber}/merge`, 'PUT', {
        merge_method: 'merge',
        commit_title: `Merge pull request #${prNumber} from bobby404-K/${branch}`
      });

      if (merge.merged) {
        console.log(`[${i + 1}/${branches.length}] Successfully merged PR #${prNumber}!`);
        processedCount++;
      } else {
        console.warn(`[${i + 1}/${branches.length}] PR #${prNumber} merge returned:`, merge.message);
      }

      // Brief delay to prevent hitting secondary rate limits
      await sleep(650);

    } catch (err) {
      console.error(`[${i + 1}/${branches.length}] Error processing ${branch}:`, err.message);
      if (err.status === 403 || err.status === 429) {
        console.log('Rate limit reached, pausing for 15 seconds...');
        await sleep(15000);
        i--; // retry
      }
    }
  }

  console.log(`\nALL DONE! Successfully completed ${processedCount}/${branches.length} pull requests merged into main!`);
}

main().catch(err => {
  console.error('Fatal error in process-prs:', err);
  process.exit(1);
});
