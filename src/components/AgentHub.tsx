import React, { useState } from 'react';
import {
  Bot,
  Play,
  CheckCircle2,
  Clock,
  Terminal,
  Shield,
  Code2,
  GitPullRequest,
  CheckCheck,
  AlertCircle
} from 'lucide-react';
import { CONCEPTS_CATALOG } from '../discrete-math/concepts/catalog';

export function AgentHub() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '🤖 [Agent Initialized] Autonomous Coding Agent loaded into repository.',
    '📊 [Backlog Audited] 5 issues resolved (Issues #227 - #231). 95 issues remaining in queue.',
    '⚡ [Ready] Ready to pull, synthesize, verify, and resolve next discrete math concept.'
  ]);
  const [activeTab, setActiveTab] = useState<'overview' | 'terminal'>('overview');

  const implementedCount = 5;
  const totalConcepts = 100;
  const progressPercent = Math.round((implementedCount / totalConcepts) * 100);

  const handleSimulateSolve = () => {
    if (isRunning) return;
    setIsRunning(true);
    const newLogs = [
      '🔍 [Step 1/6] Scanning backlog... Detected next open issue #232 (math-concept/006-demorgan-laws)',
      '📐 [Step 2/6] Synthesizing formal mathematical specification: De Morgan dualities ¬(p ∧ q) ≡ ¬p ∨ ¬q...',
      '💻 [Step 3/6] Generating typed TypeScript computational engine with laws validator...',
      '🧪 [Step 4/6] Creating Vitest test suite with boundary and countermodel verification...',
      '⚡ [Step 5/6] Executing `npx vitest run` & `npx tsc -b` -> All tests PASSED with 0 errors!',
      '🚀 [Step 6/6] Auto-committing, pushing to origin/main, and closing GitHub Issue #232! 🎉'
    ];

    let delay = 600;
    newLogs.forEach((logLine, idx) => {
      setTimeout(() => {
        setLogs(prev => [logLine, ...prev]);
        if (idx === newLogs.length - 1) {
          setIsRunning(false);
        }
      }, delay * (idx + 1));
    });
  };

  return (
    <div className="space-y-6">
      {/* Agent Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-950/70 via-indigo-950/60 to-slate-900 border border-violet-500/25 p-6 shadow-2xl backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold tracking-wide uppercase">
              <Bot className="w-3.5 h-3.5 text-violet-400" />
              In-Repo Autonomous Coding Agent
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              Self-Improving Discrete Math Engine
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              An embedded autonomous coding agent that monitors GitHub issues, synthesizes formal mathematical logic, authors TypeScript computational solvers, generates 100% passing test suites, and updates the website automatically.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleSimulateSolve}
              disabled={isRunning}
              className={`px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
                isRunning
                  ? 'bg-violet-600/50 text-violet-200 cursor-not-allowed animate-pulse'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-500/25 ring-1 ring-violet-400/40'
              }`}
            >
              {isRunning ? (
                <>
                  <Bot className="w-4 h-4 animate-spin" />
                  Agent Solving Issue...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  Run Autonomous Solver
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Curriculum Roadmap Automation
            </span>
            <span className="font-mono text-violet-400 font-bold">
              {implementedCount} / {totalConcepts} Concepts Solved ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-950/80 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-violet-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          Autonomous Pipeline & Backlog
        </button>
        <button
          onClick={() => setActiveTab('terminal')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'terminal'
              ? 'border-violet-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          CLI Commands & CI/CD
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Agent Terminal Activity Stream */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-xl flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">agent-orchestrator.log</span>
              </div>
              <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                isRunning ? 'bg-amber-500/20 text-amber-400 animate-pulse' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {isRunning ? 'EXECUTION IN PROGRESS' : 'IDLE / LISTENING'}
              </span>
            </div>

            <div className="flex-1 font-mono text-xs space-y-2 max-h-72 overflow-y-auto pr-1">
              {logs.map((line, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded border leading-relaxed ${
                    idx === 0 && isRunning
                      ? 'bg-violet-950/40 border-violet-500/40 text-violet-200'
                      : 'bg-slate-900/40 border-slate-800/60 text-slate-300'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Backlog Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-indigo-400" />
              Automated Backlog Tracking
            </h4>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {CONCEPTS_CATALOG.map(item => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    item.isImplemented
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      {item.isImplemented ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                      #{item.id} {item.title}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      {item.slug}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                    item.isImplemented
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.isImplemented ? 'SOLVED' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'terminal' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" />
              Command Line & CI/CD Workflows
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Run the agent locally or trigger it continuously via GitHub Actions workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Local CLI Execution
              </span>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-200 space-y-1.5 border border-slate-800">
                <p className="text-slate-500"># Solve next open issue automatically</p>
                <p className="text-emerald-400">npm run agent:solve</p>
                <p className="text-slate-500 mt-2"># Solve a batch of 5 open issues</p>
                <p className="text-emerald-400">npm run agent:batch 5</p>
                <p className="text-slate-500 mt-2"># Check agent backlog status</p>
                <p className="text-emerald-400">npm run agent:status</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-2">
              <span className="text-xs font-bold text-violet-400 uppercase tracking-wider block">
                Continuous GitHub Actions Integration
              </span>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-200 space-y-1.5 border border-slate-800">
                <p className="text-slate-500"># Automatically triggered on:</p>
                <p className="text-slate-300">• New issue created with label "enhancement"</p>
                <p className="text-slate-300">• Manual workflow_dispatch in Actions tab</p>
                <p className="text-slate-300">• Scheduled nightly continuous run</p>
                <p className="text-violet-400 mt-2">File: .github/workflows/autonomous-agent.yml</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
