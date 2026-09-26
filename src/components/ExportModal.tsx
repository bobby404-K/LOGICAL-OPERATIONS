import React, { useState } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';
import { StudentColumn, TruthAssignment, VariableName } from '../types';
import { formatTableToCSV, formatTableToMarkdown } from '../utils/formatters';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  variables: VariableName[];
  studentColumns: StudentColumn[];
  rows: TruthAssignment[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  variables,
  studentColumns,
  rows,
}) => {
  const [tab, setTab] = useState<'markdown' | 'csv'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const markdownContent = formatTableToMarkdown(variables, studentColumns, rows);
  const csvContent = formatTableToCSV(variables, studentColumns, rows);
  const activeContent = tab === 'markdown' ? markdownContent : csvContent;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const filename = tab === 'markdown' ? 'truth_table.md' : 'truth_table.csv';
    const mime = tab === 'markdown' ? 'text/markdown' : 'text/csv';
    const blob = new Blob([activeContent], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Export Truth Table
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Export table to Markdown or CSV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setTab('markdown')}
              className={`px-3 py-1 rounded-md transition ${
                tab === 'markdown'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Markdown Table
            </button>
            <button
              onClick={() => setTab('csv')}
              className={`px-3 py-1 rounded-md transition ${
                tab === 'csv'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              CSV Spreadsheet
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="flex-1 overflow-auto rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-slate-200 select-all">
          <pre className="whitespace-pre">{activeContent}</pre>
        </div>
      </div>
    </div>
  );
};
