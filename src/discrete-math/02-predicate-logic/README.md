# First-Order Predicate Logic & Quantifiers

## 1. Mathematical Theory
Predicate logic extends propositional logic by introducing:
- **Predicates**: Assertions parameterized by objects, $P(x)$.
- **Domain of Discourse ($U$)**: The universe of objects over which variables range.
- **Universal Quantifier ($\forall$)**: "For all $x$ in $U$, $P(x)$ holds." $\forall x P(x) \equiv \bigwedge_{x \in U} P(x)$.
- **Existential Quantifier ($\exists$)**: "There exists at least one $x$ in $U$ such that $P(x)$ holds." $\exists x P(x) \equiv \bigvee_{x \in U} P(x)$.

### Quantifier Negation (Generalized De Morgan)
$$\neg (\forall x P(x)) \equiv \exists x \neg P(x)$$
$$\neg (\exists x P(x)) \equiv \forall x \neg P(x)$$

### Order of Nested Quantifiers
The order of mixed quantifiers is strictly non-commutative:
$$\exists y \forall x P(x, y) \implies \forall x \exists y P(x, y)$$
The converse is false! Example:
- $\forall x \exists y (x < y)$ over $\mathbb{Z}$: "Every integer has a strictly greater integer" (True).
- $\exists y \forall x (x < y)$ over $\mathbb{Z}$: "There exists an integer that is strictly greater than ALL integers" (False).

---

## 2. Prenex Normal Form & Skolemization
A first-order formula is in **Prenex Normal Form (PNF)** if all quantifiers appear at the very beginning:
$$Q_1 x_1 Q_2 x_2 \dots Q_k x_k \, M(x_1, \dots, x_k)$$
where $M$ is quantifier-free (the matrix).

**Skolemization** removes existential quantifiers by replacing them with Skolem functions of the preceding universal variables, preserving satisfiability.

---

## 3. Real-World Applications
1. **Relational Database Query Languages**: First-order predicate calculus directly forms the theoretical foundation of SQL (Relational Calculus).
2. **Program Verification**: Hoare triples $\{P\} C \{Q\}$ using predicate invariants for loop verification.
3. **Artificial Intelligence**: Knowledge bases, ontology languages (OWL), and Prolog logic programming.
