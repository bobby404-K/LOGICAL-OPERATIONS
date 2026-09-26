// Logic Circuit Simulator & Gate Netlist Engine

export type LogicSignal = 0 | 1;

export class LogicGate {
  public static AND(a: LogicSignal, b: LogicSignal): LogicSignal {
    return (a && b) as LogicSignal;
  }

  public static OR(a: LogicSignal, b: LogicSignal): LogicSignal {
    return (a || b) as LogicSignal;
  }

  public static NOT(a: LogicSignal): LogicSignal {
    return (a === 1 ? 0 : 1);
  }

  public static XOR(a: LogicSignal, b: LogicSignal): LogicSignal {
    return (a !== b ? 1 : 0);
  }

  // 1-Bit Full Adder
  public static fullAdder(a: LogicSignal, b: LogicSignal, cin: LogicSignal): { sum: LogicSignal; cout: LogicSignal } {
    const sum = this.XOR(this.XOR(a, b), cin);
    const cout = this.OR(this.AND(a, b), this.AND(this.XOR(a, b), cin));
    return { sum, cout };
  }
}
