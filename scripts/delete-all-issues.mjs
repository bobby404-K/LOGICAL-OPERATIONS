import { execSync } from 'child_process';

const OWNER = 'bobby404-K';
const REPO = 'LOGICAL-OPERATIONS';

const token = execSync('gh auth token', { encoding: 'utf-8' }).trim();
if (!token) {
  console.error('No token found.');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  'User-Agent': 'NodeJS'
};

async function graphql(query, variables = {}) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables })
  });
  const data = await res.json();
  if (data.errors) {
    throw new Error(JSON.stringify(data.errors));
  }
  return data.data;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAllOpenIssues() {
  const issues = [];
  let cursor = null;
  while (true) {
    const afterClause = cursor ? `, after: "${cursor}"` : '';
    const query = `
      query {
        repository(owner: "${OWNER}", name: "${REPO}") {
          issues(first: 100, states: OPEN${afterClause}) {
            nodes {
              id
              number
              title
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `;
    const data = await graphql(query);
    const conn = data.repository.issues;
    issues.push(...conn.nodes);
    if (!conn.pageInfo.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
  }
  return issues;
}

async function deleteIssue(id) {
  const query = `
    mutation($issueId: ID!) {
      deleteIssue(input: { issueId: $issueId }) {
        clientMutationId
      }
    }
  `;
  return graphql(query, { issueId: id });
}

async function main() {
  console.log('Fetching all open issues...');
  const issues = await getAllOpenIssues();
  console.log(`Found ${issues.length} open issues to delete.`);

  let deleted = 0;
  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    try {
      await deleteIssue(issue.id);
      deleted++;
      console.log(`[${deleted}/${issues.length}] Permanently deleted Issue #${issue.number}: ${issue.title}`);
      await sleep(400); // 400ms delay between deletes
    } catch (err) {
      console.error(`Error deleting Issue #${issue.number}:`, err.message);
      if (err.message.includes('rate limit') || err.message.includes('403')) {
        console.log('Rate limit pause 15s...');
        await sleep(15000);
        i--;
      }
    }
  }

  console.log(`\nDONE! Successfully permanently deleted ${deleted} issues!`);
}

main().catch(console.error);
