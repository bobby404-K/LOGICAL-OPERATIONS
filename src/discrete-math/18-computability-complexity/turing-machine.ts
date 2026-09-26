// Executable Deterministic Turing Machine Simulator

export type Direction = 'L' | 'R';

export interface TMTransition {
  currentState: string;
  readSymbol: string;
  nextState: string;
  writeSymbol: string;
  direction: Direction;
}

export class TuringMachine {
  private transitions: Map<string, TMTransition> = new Map();
  private startState: string;
  private acceptState: string;
  private rejectState: string;

  constructor(
    startState: string,
    acceptState: string,
    rejectState: string,
    transitions: TMTransition[]
  ) {
    this.startState = startState;
    this.acceptState = acceptState;
    this.rejectState = rejectState;

    for (const t of transitions) {
      this.transitions.set(`${t.currentState},${t.readSymbol}`, t);
    }
  }

  public run(initialTape: string, maxSteps = 10000): { accepted: boolean; steps: number; tape: string } {
    const tape: Record<number, string> = {};
    for (let i = 0; i < initialTape.length; i++) tape[i] = initialTape[i];

    let head = 0;
    let state = this.startState;
    let steps = 0;

    while (steps < maxSteps) {
      if (state === this.acceptState) {
        return { accepted: true, steps, tape: this.renderTape(tape) };
      }
      if (state === this.rejectState) {
        return { accepted: false, steps, tape: this.renderTape(tape) };
      }

      const currentSym = tape[head] || '_';
      const key = `${state},${currentSym}`;
      const trans = this.transitions.get(key);

      if (!trans) {
        return { accepted: false, steps, tape: this.renderTape(tape) };
      }

      tape[head] = trans.writeSymbol;
      head += trans.direction === 'R' ? 1 : -1;
      state = trans.nextState;
      steps++;
    }

    return { accepted: false, steps, tape: this.renderTape(tape) };
  }

  private renderTape(tape: Record<number, string>): string {
    const keys = Object.keys(tape).map(Number).sort((a, b) => a - b);
    if (keys.length === 0) return '';
    const min = Math.min(...keys);
    const max = Math.max(...keys);
    let s = '';
    for (let i = min; i <= max; i++) s += tape[i] || '_';
    return s;
  }
}
