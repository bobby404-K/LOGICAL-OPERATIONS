import React, { useState } from 'react';
import { X, BookOpen, Sparkles, Info } from 'lucide-react';
import { OperatorType } from '../types';

interface LearnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OperatorGuide {
  type: OperatorType;
  symbol: string;
  name: string;
  aliases: string;
  precedence: number;
  description: string;
  discreteNote: string;
  table: Array<{ p: boolean; q?: boolean; out: boolean }>;
}

const GUIDES: OperatorGuide[] = [
  {
    type: 'NOT',
    symbol: '¬',
    name: 'Negation (NOT)',
    aliases: 'NOT, ~, !',
    precedence: 1,
    description: 'Inverts the truth value of a proposition.',
    discreteNote: 'Negation has the highest precedence. ¬p ∧ q evaluates as (¬p) ∧ q.',
    table: [
      { p: true, out: false },
      { p: false, out: true },
    ],
  },
  {
    type: 'AND',
    symbol: '∧',
    name: 'Conjunction (AND)',
    aliases: 'AND, &, /\\',
    precedence: 2,
    description: 'True only when BOTH propositions are true.',
    discreteNote: 'In set theory, conjunction corresponds to the intersection (∩) of sets.',
    table: [
      { p: true, q: true, out: true },
      { p: true, q: false, out: false },
      { p: false, q: true, out: false },
      { p: false, q: false, out: false },
    ],
  },
  {
    type: 'OR',
    symbol: '∨',
    name: 'Disjunction (Inclusive OR)',
    aliases: 'OR, |, \\/',
    precedence: 3,
    description: 'True if AT LEAST ONE proposition is true.',
    discreteNote: 'Unlike everyday English "either/or", mathematical OR is inclusive (both can be true).',
    table: [
      { p: true, q: true, out: true },
      { p: true, q: false, out: true },
      { p: false, q: true, out: true },
      { p: false, q: false, out: false },
    ],
  },
  {
    type: 'IMPLIES',
    symbol: '→',
    name: 'Material Implication (Conditional)',
    aliases: '->, =>, IMPLIES',
    precedence: 4,
    description: 'False ONLY when the hypothesis p is True and conclusion q is False.',
    discreteNote: 'Crucial concept: "Vacuous Truth" — when p is False, p → q is ALWAYS True, regardless of q!',
    table: [
      { p: true, q: true, out: true },
      { p: true, q: false, out: false },
      { p: false, q: true, out: true },
      { p: false, q: false, out: true },
    ],
  },
  {
    type: 'IFF',
    symbol: '↔',
    name: 'Biconditional (Equivalence / If and only if)',
    aliases: '<->, <=>, IFF',
    precedence: 5,
    description: 'True when both propositions have the SAME truth value.',
    discreteNote: 'Equivalent to (p → q) ∧ (q → p). Lowest operator precedence in the hierarchy.',
    table: [
      { p: true, q: true, out: true },
      { p: true, q: false, out: false },
      { p: false, q: true, out: false },
      { p: false, q: false, out: true },
    ],
  },
  {
    type: 'XOR',
    symbol: '⊕',
    name: 'Exclusive OR (XOR)',
    aliases: 'XOR, ^',
    precedence: 3,
    description: 'True when EXACTLY ONE proposition is true.',
    discreteNote: 'Equivalent to (p ∨ q) ∧ ¬(p ∧ q). Common in parity checks and cryptography.',
    table: [
      { p: true, q: true, out: false },
      { p: true, q: false, out: true },
      { p: false, q: true, out: true },
      { p: false, q: false, out: false },
    ],
  },
  {
    type: 'NAND',
    symbol: '↑',
    name: 'NAND (Sheffer Stroke)',
    aliases: 'NAND',
    precedence: 2,
    description: 'Negation of conjunction: False only when both inputs are True.',
    discreteNote: 'Functionally complete operator: every logical connective can be expressed solely using NAND.',
    table: [
      { p: true, q: true, out: false },
      { p: true, q: false, out: true },
      { p: false, q: true, out: true },
      { p: false, q: false, out: true },
    ],
  },
  {
    type: 'NOR',
    symbol: '↓',
    name: 'NOR (Peirce Arrow)',
    aliases: 'NOR',
    precedence: 3,
    description: 'Negation of disjunction: True only when both inputs are False.',
    discreteNote: 'Also functionally complete: all Boolean functions can be built using only NOR gates.',
    table: [
      { p: true, q: true, out: false },
      { p: true, q: false, out: false },
      { p: false, q: true, out: false },
      { p: false, q: false, out: true },
    ],
  },
];

export const LearnModal: React.FC<LearnModalProps> = ({ isOpen, onClose }) => {
  const [selectedOp, setSelectedOp] = useState<OperatorType>('IMPLIES');
  // Interactive testing state
  const [testP, setTestP] = useState(true);
  const [testQ, setTestQ] = useState(false);

  if (!isOpen) return null;

  const currentGuide = GUIDES.find((g) => g.type === selectedOp) || GUIDES[0];

  // Evaluate interactive sandbox
  const computeSandboxResult = () => {
    switch (currentGuide.type) {
      case 'NOT':
        return !testP;
      case 'AND':
        return testP && testQ;
      case 'OR':
        return testP || testQ;
      case 'IMPLIES':
        return !testP || testQ;
      case 'IFF':
        return testP === testQ;
      case 'XOR':
        return testP !== testQ;
      case 'NAND':
        return !(testP && testQ);
      case 'NOR':
        return !(testP || testQ);
    }
  };

  const sandboxOut = computeSandboxResult();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Discrete Math Logical Operators
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive reference guide & truth tables
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left sidebar of operators, Right content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Operator Selector List */}
          <div className="w-full md:w-56 p-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 overflow-y-auto space-y-1 bg-slate-50/50 dark:bg-slate-950/40">
            {GUIDES.map((g) => (
              <button
                key={g.type}
                onClick={() => setSelectedOp(g.type)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                  selectedOp === g.type
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold w-4 text-center">{g.symbol}</span>
                  <span>{g.name.split(' ')[0]}</span>
                </div>
                <span className="text-[10px] opacity-70">P{g.precedence}</span>
              </button>
            ))}
          </div>

          {/* Operator Details & Interactive Sandbox */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* Title & metadata */}
            <div>
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 flex items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-2xl border border-indigo-200 dark:border-indigo-800/80">
                  {currentGuide.symbol}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {currentGuide.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span>Aliases: <code>{currentGuide.aliases}</code></span>
                    <span>•</span>
                    <span>Precedence Level: {currentGuide.precedence}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
                {currentGuide.description}
              </p>
            </div>

            {/* Discrete Math Highlight Note */}
            <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-start gap-2.5 text-xs text-indigo-900 dark:text-indigo-200">
              <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Discrete Math Insight: </strong>
                <span>{currentGuide.discreteNote}</span>
              </div>
            </div>

            {/* Truth Table & Interactive Sandbox Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Truth Table */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Standard Truth Table</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">
                    {currentGuide.type === 'NOT' ? '¬p' : `p ${currentGuide.symbol} q`}
                  </span>
                </div>
                <table className="w-full text-center text-xs font-mono">
                  <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-400">
                    <tr>
                      <th className="py-2 px-3">p</th>
                      {currentGuide.type !== 'NOT' && <th className="py-2 px-3">q</th>}
                      <th className="py-2 px-3 text-indigo-600 dark:text-indigo-400">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentGuide.table.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-slate-100 dark:border-slate-800/60 ${
                          i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/30 dark:bg-slate-900/30'
                        }`}
                      >
                        <td className="py-2 px-3 font-bold">{row.p ? 'T' : 'F'}</td>
                        {row.q !== undefined && (
                          <td className="py-2 px-3 font-bold">{row.q ? 'T' : 'F'}</td>
                        )}
                        <td className="py-2 px-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded font-bold ${
                              row.out
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            }`}
                          >
                            {row.out ? 'T' : 'F'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Interactive Sandbox */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Interactive Sandbox</span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    Click inputs to toggle values and observe operator behavior in real time:
                  </p>

                  <div className="flex items-center justify-center gap-3 py-2">
                    {/* Input P */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[11px] font-mono text-slate-400">p</span>
                      <button
                        onClick={() => setTestP(!testP)}
                        className={`w-10 h-10 rounded-xl font-mono font-bold text-base transition-all active:scale-95 shadow-sm ${
                          testP
                            ? 'bg-emerald-500 text-white'
                            : 'bg-rose-500 text-white'
                        }`}
                      >
                        {testP ? 'T' : 'F'}
                      </button>
                    </div>

                    {/* Operator Symbol */}
                    <span className="font-mono font-bold text-lg text-slate-400 pt-4">
                      {currentGuide.symbol}
                    </span>

                    {/* Input Q (if binary) */}
                    {currentGuide.type !== 'NOT' && (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[11px] font-mono text-slate-400">q</span>
                        <button
                          onClick={() => setTestQ(!testQ)}
                          className={`w-10 h-10 rounded-xl font-mono font-bold text-base transition-all active:scale-95 shadow-sm ${
                            testQ
                              ? 'bg-emerald-500 text-white'
                              : 'bg-rose-500 text-white'
                          }`}
                        >
                          {testQ ? 'T' : 'F'}
                        </button>
                      </div>
                    )}

                    <span className="font-mono font-bold text-lg text-slate-400 pt-4">=</span>

                    {/* Output */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[11px] font-mono text-slate-400">Result</span>
                      <div
                        className={`w-10 h-10 rounded-xl font-mono font-bold text-base flex items-center justify-center shadow-md ring-2 ring-indigo-400/40 ${
                          sandboxOut
                            ? 'bg-emerald-600 text-white ring-emerald-400'
                            : 'bg-rose-600 text-white ring-rose-400'
                        }`}
                      >
                        {sandboxOut ? 'T' : 'F'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 text-center font-mono">
                  {currentGuide.type === 'NOT'
                    ? `¬(${testP ? 'T' : 'F'}) evaluates to ${sandboxOut ? 'True' : 'False'}`
                    : `(${testP ? 'T' : 'F'}) ${currentGuide.symbol} (${testQ ? 'T' : 'F'}) evaluates to ${
                        sandboxOut ? 'True' : 'False'
                      }`}
                </div>
              </div>
            </div>

            {/* Operator Precedence Rules Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-white dark:bg-slate-900">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Order of Precedence in Discrete Mathematics
              </h4>
              <div className="grid grid-cols-5 text-xs text-center font-mono border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-x divide-slate-200 dark:divide-slate-800">
                <div className="p-2 bg-indigo-50/50 dark:bg-indigo-950/30">
                  <div className="text-[10px] text-slate-400">1 (Highest)</div>
                  <div className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">¬ (NOT)</div>
                </div>
                <div className="p-2">
                  <div className="text-[10px] text-slate-400">2</div>
                  <div className="font-bold text-sm">∧, ↑</div>
                </div>
                <div className="p-2">
                  <div className="text-[10px] text-slate-400">3</div>
                  <div className="font-bold text-sm">∨, ⊕, ↓</div>
                </div>
                <div className="p-2">
                  <div className="text-[10px] text-slate-400">4</div>
                  <div className="font-bold text-sm">→</div>
                </div>
                <div className="p-2 bg-purple-50/50 dark:bg-purple-950/30">
                  <div className="text-[10px] text-slate-400">5 (Lowest)</div>
                  <div className="font-bold text-purple-600 dark:text-purple-400 text-sm">↔</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
