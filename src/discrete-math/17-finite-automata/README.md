# Finite Automata, Regular Languages & Pumping Lemma

## 1. Deterministic Finite Automata (DFA)
A DFA is a 5-tuple $M = (Q, \Sigma, \delta, q_0, F)$:
- $Q$: Finite set of states
- $\Sigma$: Finite alphabet
- $\delta: Q \times \Sigma \to Q$: Transition function
- $q_0 \in Q$: Initial start state
- $F \subseteq Q$: Set of accept (final) states

---

## 2. NFA to DFA Subset Construction (Powerset Construction)
Every NFA can be transformed into an equivalent DFA with up to $2^{|Q|}$ states where each DFA state corresponds to a subset of NFA states.

---

## 3. The Pumping Lemma for Regular Languages
If $L$ is regular, there exists pumping length $p$ such that any $s \in L$ with $|s| \ge p$ can be written $s = xyz$ satisfying:
1. $xy^i z \in L$ for all $i \ge 0$
2. $|y| > 0$
3. $|xy| \le p$
Used to prove non-regularity (e.g. $\{0^n 1^n \mid n \ge 0\}$ is not regular).
