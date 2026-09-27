// Executable Deterministic Finite Automaton (DFA) Engine

export class DFA {
  private states: Set<string>;
  private alphabet: Set<string>;
  private transition: Map<string, string>; // "state,char" -> nextState
  private startState: string;
  private acceptStates: Set<string>;

  constructor(
    states: string[],
    alphabet: string[],
    transitions: Array<{ from: string; symbol: string; to: string }>,
    startState: string,
    acceptStates: string[]
  ) {
    this.states = new Set(states);
    this.alphabet = new Set(alphabet);
    this.startState = startState;
    this.acceptStates = new Set(acceptStates);
    this.transition = new Map();

    for (const t of transitions) {
      this.transition.set(`${t.from},${t.symbol}`, t.to);
    }
  }

  public accepts(input: string): boolean {
    let currentState = this.startState;

    for (const char of input) {
      if (!this.alphabet.has(char)) return false;
      const key = `${currentState},${char}`;
      if (!this.transition.has(key)) return false;
      currentState = this.transition.get(key)!;
    }

    return this.acceptStates.has(currentState);
  }
}
