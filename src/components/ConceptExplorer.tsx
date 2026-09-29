import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Cpu,
  Layers,
  Table,
  Scale,
  Binary,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Zap,
  Code
} from 'lucide-react';
import { validateWff, toFullyParenthesized, checkBalancedParentheses } from '../discrete-math/concepts/001-propositional-syntax';
import { evaluateConnective, getConnectiveProperties, getOperatorTruthTable, isFunctionallyComplete } from '../discrete-math/concepts/002-truth-functional-connectives';
import { constructTruthTable } from '../discrete-math/concepts/003-truth-table-construction';
import { classifyFormula } from '../discrete-math/concepts/004-tautologies-and-contradictions';
import { areLogicallyEquivalent, verifyProofChain, LOGIC_LAWS } from '../discrete-math/concepts/005-logical-equivalence-laws';
import { OperatorType } from '../types';

export function ConceptExplorer() {
  const [activeTab, setActiveTab] = useState<'001' | '002' | '003' | '004' | '005'>('001');

  // Concept 001 State
  const [wffInput, setWffInput] = useState('¬(p ∧ q) → (r ∨ ¬s)');

  // Concept 002 State
  const [selectedOp, setSelectedOp] = useState<OperatorType>('IMPLIES');
  const [opP, setOpP] = useState(true);
  const [opQ, setOpQ] = useState(false);
  const [selectedConnectives, setSelectedConnectives] = useState<OperatorType[]>(['NOT', 'AND']);

  // Concept 003 State
  const [tableInput, setTableInput] = useState('(p ∧ q) → (p ∨ r)');

  // Concept 004 State
  const [classifierInput, setClassifierInput] = useState('(p ∧ (p → q)) → q');

  // Concept 005 State
  const [eqExprA, setEqExprA] = useState('p → q');
  const [eqExprB, setEqExprB] = useState('¬p ∨ q');
  const [proofInput, setProofInput] = useState('¬(p → q)\n¬(¬p ∨ q)\n¬¬p ∧ ¬q\np ∧ ¬q');

  // Concept 001 Evaluated
  const wffResult = validateWff(wffInput);
  const parenResult = checkBalancedParentheses(wffInput);

  // Concept 002 Evaluated
  const opProps = getConnectiveProperties(selectedOp);
  const opEval = evaluateConnective(selectedOp, opP, opQ);
  const opTruthTable = getOperatorTruthTable(selectedOp);
  const isComplete = isFunctionallyComplete(selectedConnectives);

  // Concept 003 Evaluated
  let constructedTable: ReturnType<typeof constructTruthTable> | null = null;
  let tableError: string | null = null;
  try {
    constructedTable = constructTruthTable(tableInput);
  } catch (err: any) {
    tableError = err.message;
  }

  // Concept 004 Evaluated
  let classificationResult: ReturnType<typeof classifyFormula> | null = null;
  let classificationError: string | null = null;
  try {
    classificationResult = classifyFormula(classifierInput);
  } catch (err: any) {
    classificationError = err.message;
  }

  // Concept 005 Evaluated
  let equivalenceResult: ReturnType<typeof areLogicallyEquivalent> | null = null;
  let equivalenceError: string | null = null;
  try {
    equivalenceResult = areLogicallyEquivalent(eqExprA, eqExprB);
  } catch (err: any) {
    equivalenceError = err.message;
  }

  const proofSteps = proofInput.split('\n').map(s => s.trim()).filter(Boolean);
  let proofResult: ReturnType<typeof verifyProofChain> | null = null;
  try {
    if (proofSteps.length >= 2) {
      proofResult = verifyProofChain(proofSteps);
    }
  } catch {
    // invalid expression in proof steps
  }

  return (
    <div className="space-y-6">
      {/* Title & Overview Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/50 border border-indigo-500/20 p-6 shadow-xl backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Discrete Mathematics Hub
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Interactive Concept Explorer & Computational Solvers
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Explore formal mathematical definitions, AST structures, functional completeness, semantic classifiers, and algebraic proof verification.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              5 Solved Concepts Active
            </span>
          </div>
        </div>
      </div>

      {/* Concept Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {[
          { id: '001', label: '001 Syntax & WFF', icon: Code, desc: 'Grammar & AST' },
          { id: '002', label: '002 Connectives', icon: Cpu, desc: 'Truth Functions' },
          { id: '003', label: '003 Truth Tables', icon: Table, desc: 'Sub-Formula Steps' },
          { id: '004', label: '004 Tautologies', icon: Layers, desc: 'Semantic Class' },
          { id: '005', label: '005 Equivalence', icon: Scale, desc: 'Proofs & Laws' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'bg-white/5 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-white/10 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span className="font-semibold text-xs tracking-wider uppercase text-slate-300">
                  {tab.label}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{tab.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Active Concept Playground */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
        {/* ================= CONCEPT 001: SYNTAX ================= */}
        {activeTab === '001' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" />
                Concept 001: Propositional Syntax & Well-Formed Formula (WFF) Validator
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Formal language parser checking inductive WFF grammar, balanced parentheses nesting, AST depth height, and operator precedence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Propositional Formula
                  </label>
                  <input
                    type="text"
                    value={wffInput}
                    onChange={e => setWffInput(e.target.value)}
                    placeholder="e.g. ¬(p ∧ q) → (r ∨ ¬s)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950/60 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Validation Status */}
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  wffResult.isValid
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                }`}>
                  {wffResult.isValid ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-semibold text-sm">
                      {wffResult.isValid ? 'Valid Well-Formed Formula (WFF)' : 'Invalid Syntax'}
                    </h4>
                    <p className="text-xs mt-0.5 opacity-90">
                      {wffResult.isValid
                        ? `Conforms strictly to inductive grammar rules over propositional alphabet Σ.`
                        : wffResult.error || parenResult.error}
                    </p>
                  </div>
                </div>

                {/* Canonical Parenthesized Representation */}
                {wffResult.isValid && wffResult.ast && (
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40">
                    <span className="text-xs font-medium text-slate-400 block mb-1">
                      Canonical Fully Parenthesized AST String:
                    </span>
                    <code className="text-indigo-300 font-mono text-sm font-semibold">
                      {toFullyParenthesized(wffResult.ast)}
                    </code>
                  </div>
                )}
              </div>

              {/* AST Metrics Panel */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    AST Structural Metrics
                  </h4>
                  <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Syntactic Depth</span>
                    <span className="font-mono font-bold text-indigo-400">{wffResult.depth ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Atomic Variables</span>
                    <span className="font-mono font-bold text-slate-200">
                      {wffResult.variables?.join(', ') || 'None'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Unary Connectives</span>
                    <span className="font-mono font-bold text-slate-200">
                      {wffResult.connectiveCount?.unary ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Binary Connectives</span>
                    <span className="font-mono font-bold text-slate-200">
                      {wffResult.connectiveCount?.binary ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1">
                    <span className="text-slate-400">Parentheses Balance</span>
                    <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                      parenResult.balanced ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {parenResult.balanced ? 'Balanced' : 'Mismatched'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONCEPT 002: CONNECTIVES ================= */}
        {activeTab === '002' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Concept 002: Truth-Functional Connectives & Functional Completeness
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Extensional boolean functions $f: \mathbb&#123;B&#125;^n \to \mathbb&#123;B&#125;$, algebraic properties, and Post's lattice universal completeness testing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Operator Simulator */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Select Connective
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                    {(['NOT', 'AND', 'OR', 'IMPLIES', 'IFF', 'XOR', 'NAND', 'NOR'] as OperatorType[]).map(op => (
                      <button
                        key={op}
                        onClick={() => setSelectedOp(op)}
                        className={`py-2 px-1 text-center rounded-lg border text-xs font-mono font-bold transition-all ${
                          selectedOp === op
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Input Toggle */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setOpP(!opP)}
                        className={`px-4 py-2 rounded-lg font-mono font-bold text-sm border transition-all ${
                          opP
                            ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                            : 'bg-rose-600/20 border-rose-500 text-rose-300'
                        }`}
                      >
                        P = {opP ? 'TRUE' : 'FALSE'}
                      </button>
                      <span className="font-mono text-slate-400 font-bold text-lg">
                        {opProps.symbol}
                      </span>
                      {selectedOp !== 'NOT' && (
                        <button
                          onClick={() => setOpQ(!opQ)}
                          className={`px-4 py-2 rounded-lg font-mono font-bold text-sm border transition-all ${
                            opQ
                              ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                              : 'bg-rose-600/20 border-rose-500 text-rose-300'
                          }`}
                        >
                          Q = {opQ ? 'TRUE' : 'FALSE'}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-slate-500" />
                      <span className={`px-4 py-2 rounded-lg font-mono font-bold text-base border shadow-lg ${
                        opEval
                          ? 'bg-emerald-500 border-emerald-400 text-white'
                          : 'bg-rose-500 border-rose-400 text-white'
                      }`}>
                        RESULT = {opEval ? 'TRUE' : 'FALSE'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Truth Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono text-center border-collapse border border-slate-800 rounded-lg overflow-hidden">
                    <thead className="bg-slate-800/80 text-slate-300">
                      <tr>
                        <th className="p-2 border border-slate-700">P</th>
                        {selectedOp !== 'NOT' && <th className="p-2 border border-slate-700">Q</th>}
                        <th className="p-2 border border-slate-700 text-indigo-300">
                          {selectedOp === 'NOT' ? '¬P' : `P ${opProps.symbol} Q`}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-900/40 divide-y divide-slate-800">
                      {opTruthTable.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-800/40">
                          <td className="p-2 border border-slate-800">{row.p ? 'T' : 'F'}</td>
                          {selectedOp !== 'NOT' && (
                            <td className="p-2 border border-slate-800">{row.q ? 'T' : 'F'}</td>
                          )}
                          <td className={`p-2 border border-slate-800 font-bold ${
                            row.result ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                            {row.result ? 'T' : 'F'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Functional Completeness & Post's Criterion */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Functional Completeness
                  </h4>
                  <p className="text-xs text-slate-400">
                    Select a set of connectives to test if it can express every possible boolean function:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(['NOT', 'AND', 'OR', 'IMPLIES', 'XOR', 'NAND', 'NOR'] as OperatorType[]).map(op => {
                      const isSelected = selectedConnectives.includes(op);
                      return (
                        <button
                          key={op}
                          onClick={() => {
                            setSelectedConnectives(prev =>
                              prev.includes(op) ? prev.filter(x => x !== op) : [...prev, op]
                            );
                          }}
                          className={`px-2.5 py-1 text-xs rounded border font-mono transition-all ${
                            isSelected
                              ? 'bg-indigo-600/30 border-indigo-400 text-indigo-300'
                              : 'bg-slate-800/40 border-slate-700 text-slate-500'
                          }`}
                        >
                          {op}
                        </button>
                      );
                    })}
                  </div>

                  <div className={`p-3 rounded-lg border flex items-center gap-2.5 mt-2 ${
                    isComplete
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                  }`}>
                    {isComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span className="text-xs font-semibold">
                      {isComplete ? 'Functionally Complete Set' : 'Incomplete Set (Cannot span all functions)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONCEPT 003: TRUTH TABLE ================= */}
        {activeTab === '003' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Table className="w-5 h-5 text-indigo-400" />
                Concept 003: Systematic Truth Table Construction & Sub-Formula Steps
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Bottom-up AST sub-formula decomposition showing intermediate step evaluations across $2^n$ lexicographic valuation rows.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Formula Expression
                </label>
                <input
                  type="text"
                  value={tableInput}
                  onChange={e => setTableInput(e.target.value)}
                  placeholder="e.g. (p ∧ q) → (p ∨ r)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950/60 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {tableError ? (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
                  {tableError}
                </div>
              ) : constructedTable ? (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-xs font-mono text-center border-collapse">
                    <thead className="bg-slate-800 text-slate-300">
                      <tr>
                        {constructedTable.variables.map(v => (
                          <th key={v} className="p-2.5 border border-slate-700 bg-slate-900/60 text-indigo-400">
                            {v}
                          </th>
                        ))}
                        {constructedTable.subformulas.map(sub => (
                          <th key={sub.id} className="p-2.5 border border-slate-700 text-slate-300">
                            {sub.expression}
                          </th>
                        ))}
                        <th className="p-2.5 border border-slate-700 bg-indigo-900/40 text-white font-bold">
                          {constructedTable.mainFormula}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-950/60 divide-y divide-slate-800">
                      {constructedTable.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                          {constructedTable!.variables.map(v => (
                            <td key={v} className="p-2 border border-slate-800 font-semibold text-slate-400">
                              {row.assignment[v] ? 'T' : 'F'}
                            </td>
                          ))}
                          {constructedTable!.subformulas.map(sub => (
                            <td key={sub.id} className="p-2 border border-slate-800">
                              <span className={row.columnValues[sub.expression] ? 'text-emerald-400' : 'text-slate-500'}>
                                {row.columnValues[sub.expression] ? 'T' : 'F'}
                              </span>
                            </td>
                          ))}
                          <td className={`p-2 border border-slate-800 font-bold bg-indigo-950/20 ${
                            row.finalValue ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                            {row.finalValue ? 'T' : 'F'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* ================= CONCEPT 004: TAUTOLOGIES ================= */}
        {activeTab === '004' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Concept 004: Tautology, Contradiction & Contingency Semantic Classifier
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Classifies formulas into universal validity ($\models \phi$), unsatisfiability ($\phi \equiv \bot$), or contingent satisfiability with model count density.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Formula Expression
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={classifierInput}
                    onChange={e => setClassifierInput(e.target.value)}
                    placeholder="e.g. (p ∧ (p → q)) → q"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950/60 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => setClassifierInput('p ∨ ¬p')}
                    className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                  >
                    Tautology
                  </button>
                  <button
                    onClick={() => setClassifierInput('p ∧ ¬p')}
                    className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                  >
                    Contradiction
                  </button>
                </div>
              </div>

              {classificationError ? (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
                  {classificationError}
                </div>
              ) : classificationResult ? (
                <div className="space-y-4">
                  {/* Status Banner */}
                  <div className={`p-5 rounded-xl border flex items-center justify-between ${
                    classificationResult.classification === 'TAUTOLOGY'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : classificationResult.classification === 'CONTRADICTION'
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                      : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200'
                  }`}>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold opacity-80 block">
                        Semantic Classification
                      </span>
                      <h4 className="text-xl font-bold mt-0.5">
                        {classificationResult.classification}
                      </h4>
                      <p className="text-xs mt-1 opacity-90">
                        {classificationResult.classification === 'TAUTOLOGY' &&
                          'Evaluates to TRUE under every valuation. Universally valid theorem.'}
                        {classificationResult.classification === 'CONTRADICTION' &&
                          'Evaluates to FALSE under every valuation. Unsatisfiable statement.'}
                        {classificationResult.classification === 'CONTINGENCY' &&
                          'Truth value is contingent upon atomic valuations (has both models and countermodels).'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-mono font-bold">
                        {(classificationResult.satisfactionDensity * 100).toFixed(0)}%
                      </span>
                      <span className="block text-[11px] opacity-75">Satisfaction Density</span>
                    </div>
                  </div>

                  {/* Models Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                        Satisfying Models ({classificationResult.satisfyingCount})
                      </span>
                      {classificationResult.satisfyingModels.length === 0 ? (
                        <span className="text-xs text-slate-500 italic">No models exist (Unsatisfiable)</span>
                      ) : (
                        <div className="space-y-1 max-h-36 overflow-y-auto font-mono text-xs">
                          {classificationResult.satisfyingModels.map((m, i) => (
                            <div key={i} className="p-1.5 rounded bg-emerald-500/10 text-emerald-300">
                              {Object.entries(m).map(([k, v]) => `${k}=${v ? 'T' : 'F'}`).join(', ')}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40">
                      <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-2">
                        Counterexamples ({classificationResult.falsifyingCount})
                      </span>
                      {classificationResult.counterexamples.length === 0 ? (
                        <span className="text-xs text-slate-500 italic">No counterexamples (Tautology)</span>
                      ) : (
                        <div className="space-y-1 max-h-36 overflow-y-auto font-mono text-xs">
                          {classificationResult.counterexamples.map((m, i) => (
                            <div key={i} className="p-1.5 rounded bg-rose-500/10 text-rose-300">
                              {Object.entries(m).map(([k, v]) => `${k}=${v ? 'T' : 'F'}`).join(', ')}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* ================= CONCEPT 005: EQUIVALENCE ================= */}
        {activeTab === '005' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-400" />
                Concept 005: Logical Equivalence Laws & Step-by-Step Proof Verifier
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Automated equational semantic verification ($A \equiv B$) and step-by-step algebraic proof validation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pairwise Equivalence Checker */}
              <div className="space-y-4 p-4 rounded-xl border border-slate-800 bg-slate-950/40">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Expression Equivalence Checker (A ≡ B)
                </h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={eqExprA}
                    onChange={e => setEqExprA(e.target.value)}
                    placeholder="Expression A"
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white font-mono text-sm"
                  />
                  <div className="text-center text-xs font-bold text-indigo-400">≡</div>
                  <input
                    type="text"
                    value={eqExprB}
                    onChange={e => setEqExprB(e.target.value)}
                    placeholder="Expression B"
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white font-mono text-sm"
                  />
                </div>

                {equivalenceResult && (
                  <div className={`p-3.5 rounded-lg border text-sm flex items-start gap-2.5 ${
                    equivalenceResult.isEquivalent
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}>
                    {equivalenceResult.isEquivalent ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold">
                        {equivalenceResult.isEquivalent ? 'Expressions are Logically Equivalent!' : 'Not Equivalent'}
                      </span>
                      {equivalenceResult.counterexample && (
                        <p className="text-xs mt-1 font-mono">
                          Falsifying Countermodel:{' '}
                          {Object.entries(equivalenceResult.counterexample).map(([k, v]) => `${k}=${v ? 'T' : 'F'}`).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Algebraic Proof Verifier */}
              <div className="space-y-4 p-4 rounded-xl border border-slate-800 bg-slate-950/40">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Equational Proof Chain Validator
                  </h4>
                  <span className="text-[11px] text-slate-500">1 formula per line</span>
                </div>
                <textarea
                  rows={4}
                  value={proofInput}
                  onChange={e => setProofInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white font-mono text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />

                {proofResult && (
                  <div className={`p-3 rounded-lg border text-xs ${
                    proofResult.isValid
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                  }`}>
                    {proofResult.isValid ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold">All {proofResult.totalSteps} derivation steps verified valid!</span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{proofResult.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
