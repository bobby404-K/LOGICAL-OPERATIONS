import React, { useState, useMemo } from 'react';
import {
  Search,
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Columns,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { LOGIC_LAWS, LogicLaw, LawCategory } from '../utils/laws';

interface LawsReferenceProps {
  onLoadLawIntoWorkspace?: (tautologyExpr: string, lhs?: string, rhs?: string) => void;
}

const CATEGORIES: Array<LawCategory | 'All'> = [
  'All',
  'De Morgan',
  'Distributive',
  'Conditionals',
  'Absorption',
  'Basic Equivalences',
  'Biconditional & XOR',
  'Rules of Inference',
];

const CATEGORY_COLORS: Record<LawCategory, { badge: string; border: string }> = {
  'De Morgan': {
    badge: 'bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    border: 'border-sky-500',
  },
  Distributive: {
    badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    border: 'border-indigo-500',
  },
  Conditionals: {
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    border: 'border-purple-500',
  },
  Absorption: {
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    border: 'border-emerald-500',
  },
  'Basic Equivalences': {
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    border: 'border-amber-500',
  },
  'Biconditional & XOR': {
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    border: 'border-rose-500',
  },
  'Rules of Inference': {
    badge: 'bg-teal-100 text-teal-700 dark:bg-teal-950/70 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    border: 'border-teal-500',
  },
};

export const LawsReference: React.FC<LawsReferenceProps> = ({
  onLoadLawIntoWorkspace,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<LawCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLawId, setSelectedLawId] = useState<string>(LOGIC_LAWS[0].id);

  // Interactive sandbox state for variables
  const [valP, setValP] = useState(true);
  const [valQ, setValQ] = useState(false);
  const [valR, setValR] = useState(true);

  // Filtered laws list
  const filteredLaws = useMemo(() => {
    return LOGIC_LAWS.filter((law) => {
      const matchesCategory =
        selectedCategory === 'All' || law.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        law.name.toLowerCase().includes(q) ||
        law.symbolicFormula.toLowerCase().includes(q) ||
        law.category.toLowerCase().includes(q) ||
        law.meaning.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Current selected law
  const activeLaw: LogicLaw = useMemo(() => {
    return (
      filteredLaws.find((l) => l.id === selectedLawId) ||
      filteredLaws[0] ||
      LOGIC_LAWS[0]
    );
  }, [filteredLaws, selectedLawId]);

  // Compute live sandbox evaluation
  const lhsResult = activeLaw.evalLhs(valP, valQ, valR);
  const rhsResult = activeLaw.evalRhs(valP, valQ, valR);
  const isEquivalent =
    activeLaw.category === 'Rules of Inference'
      ? !lhsResult || rhsResult // Inference: LHS implies RHS
      : lhsResult === rhsResult; // Equivalence: LHS matches RHS

  const hasR = activeLaw.variables.includes('r');
  const hasQ = activeLaw.variables.includes('q');

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-full">
      {/* Left Sidebar: Search, Categories, and Law List */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/40 overflow-hidden">
        {/* Search input */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search laws (e.g., De Morgan, implies)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Category Chips scroll container */}
          <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap transition font-medium ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable list of laws */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredLaws.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No laws match your search.
            </div>
          ) : (
            filteredLaws.map((law) => {
              const isSelected = activeLaw.id === law.id;
              const colorConfig = CATEGORY_COLORS[law.category];
              return (
                <button
                  key={law.id}
                  onClick={() => setSelectedLawId(law.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800 border-indigo-400 dark:border-indigo-600 shadow-xs ring-1 ring-indigo-400/20'
                      : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {law.name}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-md border shrink-0 font-medium ${colorConfig.badge}`}
                    >
                      {law.category}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 truncate">
                    {law.symbolicFormula}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Content Panel: Detailed Law Breakdown & Interactive Verification */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Title and Category */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${
                    CATEGORY_COLORS[activeLaw.category].badge
                  }`}
                >
                  {activeLaw.category}
                </span>
                <span className="text-xs text-slate-400">
                  {activeLaw.variables.length} Variable
                  {activeLaw.variables.length > 1 ? 's' : ''} ({activeLaw.variables.join(', ')})
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {activeLaw.name}
              </h3>
            </div>

            {/* Quick Action Buttons */}
            {onLoadLawIntoWorkspace && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onLoadLawIntoWorkspace(activeLaw.tautologyExpression)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition active:scale-95"
                  title="Load the tautology formula into the main truth table"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Verify in Table</span>
                </button>
                <button
                  onClick={() =>
                    onLoadLawIntoWorkspace(
                      activeLaw.tautologyExpression,
                      activeLaw.lhs,
                      activeLaw.rhs
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-2xs transition active:scale-95"
                  title="Compare LHS and RHS as side-by-side columns"
                >
                  <Columns className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Compare LHS vs RHS</span>
                </button>
              </div>
            )}
          </div>

          {/* Mathematical Formula Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-indigo-50/80 dark:from-indigo-950/60 dark:via-purple-950/40 dark:to-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                Equivalence Law Formulation
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 dark:text-white tracking-wide">
                {activeLaw.symbolicFormula}
              </div>
            </div>
            <div className="flex flex-col text-xs text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 px-3 py-2 rounded-xl border border-indigo-100 dark:border-indigo-900/60">
              <span className="text-[10px] uppercase font-bold text-slate-400">Tautology Form:</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                {activeLaw.tautologyExpression}
              </span>
            </div>
          </div>
        </div>

        {/* Explanation & Intuition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Discrete Math Definition</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeLaw.meaning}
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Real-World Intuition</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeLaw.intuition}
            </p>
          </div>
        </div>

        {/* Interactive Live Verification Sandbox */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-slate-50/50 dark:bg-slate-950/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Live Interactive Equivalence Tester
              </h4>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Toggle variable values below to verify both sides always match
            </span>
          </div>

          {/* Variable Toggles */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-2">
            {/* Variable p */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-slate-500">p</span>
              <button
                onClick={() => setValP(!valP)}
                className={`w-11 h-11 rounded-xl font-mono font-bold text-base transition-all active:scale-95 shadow-xs ${
                  valP
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'bg-rose-500 hover:bg-rose-600 text-white'
                }`}
                title="Click to toggle variable p"
              >
                {valP ? 'T' : 'F'}
              </button>
            </div>

            {/* Variable q */}
            {hasQ && (
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-mono font-bold text-slate-500">q</span>
                <button
                  onClick={() => setValQ(!valQ)}
                  className={`w-11 h-11 rounded-xl font-mono font-bold text-base transition-all active:scale-95 shadow-xs ${
                    valQ
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-rose-500 hover:bg-rose-600 text-white'
                  }`}
                  title="Click to toggle variable q"
                >
                  {valQ ? 'T' : 'F'}
                </button>
              </div>
            )}

            {/* Variable r */}
            {hasR && (
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-mono font-bold text-slate-500">r</span>
                <button
                  onClick={() => setValR(!valR)}
                  className={`w-11 h-11 rounded-xl font-mono font-bold text-base transition-all active:scale-95 shadow-xs ${
                    valR
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-rose-500 hover:bg-rose-600 text-white'
                  }`}
                  title="Click to toggle variable r"
                >
                  {valR ? 'T' : 'F'}
                </button>
              </div>
            )}
          </div>

          {/* LHS vs RHS Evaluator Result Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* LHS */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Left-Hand Side (LHS)
              </span>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 truncate font-semibold">
                {activeLaw.lhs}
              </div>
              <div
                className={`inline-block px-3 py-1 rounded-lg font-mono font-bold text-sm shadow-xs ${
                  lhsResult
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {lhsResult ? 'True (T)' : 'False (F)'}
              </div>
            </div>

            {/* Equivalence Status Indicator */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-center">
              <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                {activeLaw.category === 'Rules of Inference' ? '→' : '≡'}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {activeLaw.category === 'Rules of Inference'
                    ? isEquivalent
                      ? 'Valid Implication'
                      : 'Invalid'
                    : isEquivalent
                    ? 'Equivalent'
                    : 'Not Equivalent'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {activeLaw.category === 'Rules of Inference'
                  ? 'Always satisfies implication'
                  : 'LHS matches RHS'}
              </span>
            </div>

            {/* RHS */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Right-Hand Side (RHS)
              </span>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 truncate font-semibold">
                {activeLaw.rhs}
              </div>
              <div
                className={`inline-block px-3 py-1 rounded-lg font-mono font-bold text-sm shadow-xs ${
                  rhsResult
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {rhsResult ? 'True (T)' : 'False (F)'}
              </div>
            </div>
          </div>
        </div>

        {/* Verification in Truth Table Callout */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-950/40 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h5 className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
              Prove this law with a full truth table
            </h5>
            <p className="text-[11px] text-indigo-700/80 dark:text-indigo-300/80">
              Load this law into your workspace to prove that every row evaluates to True (Tautology).
            </p>
          </div>
          {onLoadLawIntoWorkspace && (
            <button
              onClick={() => onLoadLawIntoWorkspace(activeLaw.tautologyExpression)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 transition"
            >
              <span>Load Law</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
