export type VariableName = 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y';

export const ALLOWED_VARIABLES: readonly VariableName[] = [
  'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y'
] as const;

export type OperatorType = 
  | 'NOT'
  | 'AND'
  | 'OR'
  | 'IMPLIES'
  | 'IFF'
  | 'XOR'
  | 'NAND'
  | 'NOR';

export type TokenType =
  | 'VARIABLE'
  | 'OPERATOR'
  | 'LPAREN'
  | 'RPAREN'
  | 'EOF';

export interface Token {
  type: TokenType;
  value: string;
  opType?: OperatorType;
  position: number;
}

export interface ASTNodeVariable {
  type: 'VARIABLE';
  name: VariableName;
}

export interface ASTNodeNot {
  type: 'NOT';
  operand: ASTNode;
}

export interface ASTNodeBinary {
  type: 'AND' | 'OR' | 'IMPLIES' | 'IFF' | 'XOR' | 'NAND' | 'NOR';
  left: ASTNode;
  right: ASTNode;
}

export type ASTNode = ASTNodeVariable | ASTNodeNot | ASTNodeBinary;

export type TruthAssignment = Record<string, boolean>;

export type CellValue = boolean | null;

export interface StudentColumn {
  id: string;
  header: string; // e.g. "¬q" or "p ∧ q"
  cells: Record<number, CellValue>; // row index -> value (null = unfilled)
  checkResult?: {
    checked: boolean;
    validSyntax: boolean;
    errorMessage?: string;
    isCorrect?: boolean;
    unfilledCount?: number;
    incorrectCount?: number;
    totalRows?: number;
    showSolution?: boolean;
  };
}

export interface PracticeProblem {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  expression: string;
  description: string;
  hints: string[];
  recommendedSteps: string[];
}
