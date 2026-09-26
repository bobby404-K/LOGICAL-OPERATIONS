import React from 'react';
import { Bookmark } from 'lucide-react';
import { LogicPreset } from '../utils/presets';

interface PresetsBarProps {
  presets: LogicPreset[];
  currentExpression: string;
  onSelectPreset: (preset: LogicPreset) => void;
}

export const PresetsBar: React.FC<PresetsBarProps> = ({
  presets,
  currentExpression,
  onSelectPreset,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs no-scrollbar">
      <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 font-medium">
        <Bookmark className="w-3.5 h-3.5 text-indigo-500" />
        <span>Theorems & Presets:</span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {presets.map((preset) => {
          const isSelected = currentExpression === preset.expression;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              title={`${preset.name}: ${preset.expression}\n${preset.description}`}
              className={`px-2.5 py-1 rounded-lg border font-mono text-xs transition-all active:scale-95 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300'
              }`}
            >
              {preset.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
