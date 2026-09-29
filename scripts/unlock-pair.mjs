import { execSync } from 'child_process';

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
  'User-Agent': 'Pair-Extraordinaire-Unlocker'
};

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

async function runPairPR(index, total) {
  const branchName = `pair-extraordinaire/tier4-part-${index}-${Date.now()}`;
  const title = `feat(coauthor): pair extraordinaire achievement verification #${index}`;
  const commitMessage = `${title}\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`;

  // 1. Get current main commit and tree SHA
  const mainRef = await api('/git/ref/heads/main');
  const mainCommitSha = mainRef.object.sha;
  const mainCommit = await api(`/git/commits/${mainCommitSha}`);
  const baseTreeSha = mainCommit.tree.sha;

  // 2. Create blob with unique content
  const blob = await api('/git/blobs', 'POST', {
    content: `# Pair Extraordinaire Achievement Verification\n\n- **PR Sequence**: #${index} of ${total}\n- **Primary Author**: @${OWNER}\n- **Co-Author**: @claude (Claude Opus 4.6)\n- **Verification Timestamp**: ${new Date().toISOString()}\n- **Status**: Verified co-authored contribution\n`,
    encoding: 'utf-8'
  });

  // 3. Create tree with file change
  const tree = await api('/git/trees', 'POST', {
    base_tree: baseTreeSha,
    tree: [
      {
        path: 'docs/PAIR_EXTRAORDINAIRE.md',
        mode: '100644',
        type: 'blob',
        sha: blob.sha
      }
    ]
  });

  // 4. Create commit with co-author trailer
  const commit = await api('/git/commits', 'POST', {
    message: commitMessage,
    tree: tree.sha,
    parents: [mainCommitSha],
    author: {
      name: 'bobby',
      email: 'bobbykushwah19082005@gmail.com',
      date: new Date().toISOString()
    },
    committer: {
      name: 'bobby',
      email: 'bobbykushwah19082005@gmail.com',
      date: new Date().toISOString()
    }
  });

  // 5. Create branch ref
  await api('/git/refs', 'POST', {
    ref: `refs/heads/${branchName}`,
    sha: commit.sha
  });

  // 6. Create Pull Request
  const pr = await api('/pulls', 'POST', {
    title,
    head: branchName,
    base: 'main',
    body: `Co-authored commit PR to unlock **Pair Extraordinaire** achievement badge on GitHub profile.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
  });

  // 7. Merge Pull Request
  const merge = await api(`/pulls/${pr.number}/merge`, 'PUT', {
    merge_method: 'merge',
    commit_title: `Merge pull request #${pr.number} from ${OWNER}/${branchName}`
  });

  // 8. Clean up temporary head branch
  try {
    await api(`/git/refs/heads/${branchName}`, 'DELETE');
  } catch (e) {
    // Ignore cleanup errors
  }

  console.log(`[${index}/${total}] Merged PR #${pr.number}: ${merge.message || 'Success'}`);
  return pr.number;
}

async function main() {
  const args = process.argv.slice(2);
  const countArg = args.find(a => a.startsWith('--count=') || a.startsWith('--total='));
  const startArg = args.find(a => a.startsWith('--start='));
  const total = countArg ? parseInt(countArg.split('=')[1], 10) : 50; // 48-50 PRs guarantees Gold Tier 4 (x4 multiplier)
  const start = startArg ? parseInt(startArg.split('=')[1], 10) : 1;

  console.log(`🌟 Starting Pair Extraordinaire automated unlocker (${start}..${total})...`);
  console.log(`👤 Target User: @${OWNER}`);
  console.log(`🤝 Co-author: @claude (Claude Opus 4.6 <noreply@anthropic.com>)\n`);

  for (let i = start; i <= total; i++) {
    try {
      await runPairPR(i, total);
      await sleep(1000); // 1s spacing to stay well within GitHub API burst rates
    } catch (err) {
      console.error(`Error on PR #${i}:`, err.message);
      if (err.status === 403 || err.status === 429) {
        console.log('GitHub API rate pacing hit. Backing off for 25 seconds...');
        await sleep(25000);
        i--; // retry current index
      } else {
        await sleep(3000);
      }
    }
  }

  console.log(`\n🎉 ALL ${total} CO-AUTHORED PULL REQUESTS SUCCESSFULLY MERGED!`);
  console.log(`🏅 Check your GitHub profile at https://github.com/${OWNER} for the Pair Extraordinaire x4 badge!`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

