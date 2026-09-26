import { StudentColumn, TruthAssignment, VariableName } from '../types';

export function formatTableToMarkdown(
  variables: VariableName[],
  studentColumns: StudentColumn[],
  rows: TruthAssignment[]
): string {
  const headers = [...variables, ...studentColumns.map((col) => col.header || 'Unnamed')];
  const headerLine = `| ${headers.join(' | ')} |`;
  const separatorLine = `| ${headers.map(() => '---').join(' | ')} |`;

  const dataLines = rows.map((row, rIdx) => {
    const varCells = variables.map((v) => (row[v] ? 'T' : 'F'));
    const studentCells = studentColumns.map((col) => {
      const val = col.cells[rIdx];
      if (val === true) return 'T';
      if (val === false) return 'F';
      return ' ';
    });
    return `| ${[...varCells, ...studentCells].join(' | ')} |`;
  });

  return [headerLine, separatorLine, ...dataLines].join('\n');
}

export function formatTableToCSV(
  variables: VariableName[],
  studentColumns: StudentColumn[],
  rows: TruthAssignment[]
): string {
  const headers = [...variables, ...studentColumns.map((col) => `"${col.header || 'Unnamed'}"`)];
  const headerLine = headers.join(',');

  const dataLines = rows.map((row, rIdx) => {
    const varCells = variables.map((v) => (row[v] ? 'T' : 'F'));
    const studentCells = studentColumns.map((col) => {
      const val = col.cells[rIdx];
      if (val === true) return 'T';
      if (val === false) return 'F';
      return '';
    });
    return [...varCells, ...studentCells].join(',');
  });

  return [headerLine, ...dataLines].join('\n');
}
