import { ASTNode, VariableName, TruthAssignment } from '../../../types';
import { parseLogicalExpression } from '../../../parser/parser';
import { evaluateAST } from '../../../parser/evaluator';
import { generateTruthAssignments } from '../../../truth-table/generator';
import { calculateFormulaDepth, toFullyParenthesized } from '../001-propositional-syntax';

export interface SubformulaColumn {
  id: string;
  expression: string;
  ast: ASTNode;
  depth: number;
}

export interface TruthTableRow {
  rowIndex: number;
  assignment: TruthAssignment;
  columnValues: Record<string, boolean>;
  finalValue: boolean;
}

export interface CompleteTruthTable {
  variables: VariableName[];
  subformulas: SubformulaColumn[];
  mainFormula: string;
  rowCount: number;
  rows: TruthTableRow[];
}

/**
 * Extracts all non-atomic subformulas in topological order (innermost dependencies first).
 */
export function extractSubformulas(ast: ASTNode): SubformulaColumn[] {
  const map = new Map<string, { ast: ASTNode; depth: number }>();

  function collect(node: ASTNode) {
    if (node.type === 'VARIABLE') return;

    if (node.type === 'NOT') {
      collect(node.operand);
    } else {
      collect(node.left);
      collect(node.right);
    }

    const expr = toFullyParenthesized(node);
    if (!map.has(expr)) {
      map.set(expr, {
        ast: node,
        depth: calculateFormulaDepth(node)
      });
    }
  }

  collect(ast);

  // Sort ascending by syntactic depth
  const items = Array.from(map.entries()).map(([expr, meta], idx) => ({
    id: `step_${idx + 1}`,
    expression: expr,
    ast: meta.ast,
    depth: meta.depth
  }));

  items.sort((a, b) => a.depth - b.depth);
  return items;
}

/**
 * Builds the complete evaluated truth table for any propositional expression.
 */
export function constructTruthTable(expression: string): CompleteTruthTable {
  const { ast, variables } = parseLogicalExpression(expression);
  const assignments = generateTruthAssignments(variables);
  const subformulas = extractSubformulas(ast);
  const mainFormula = toFullyParenthesized(ast);

  const rows: TruthTableRow[] = assignments.map((assignment, rowIndex) => {
    const columnValues: Record<string, boolean> = {};

    // Variable values
    for (const v of variables) {
      columnValues[v] = assignment[v];
    }

    // Intermediate subformula values
    for (const sub of subformulas) {
      columnValues[sub.expression] = evaluateAST(sub.ast, assignment);
    }

    const finalValue = evaluateAST(ast, assignment);
    columnValues[mainFormula] = finalValue;

    return {
      rowIndex,
      assignment,
      columnValues,
      finalValue
    };
  });

  return {
    variables,
    subformulas,
    mainFormula,
    rowCount: rows.length,
    rows
  };
}

/**
 * Formats a truth table into standard Markdown ASCII format.
 */
export function formatTruthTableAscii(table: CompleteTruthTable): string {
  const headers = [
    ...table.variables,
    ...table.subformulas.map(s => s.expression)
  ];
  // Ensure main formula is at the end if not already
  if (!headers.includes(table.mainFormula)) {
    headers.push(table.mainFormula);
  }

  const headerRow = `| ${headers.join(' | ')} |`;
  const separator = `| ${headers.map(() => '---').join(' | ')} |`;

  const dataRows = table.rows.map(r => {
    const cells = headers.map(h => (r.columnValues[h] ? 'T' : 'F'));
    return `| ${cells.join(' | ')} |`;
  });

  return [headerRow, separator, ...dataRows].join('\n');
}

export { generateTruthAssignments };
