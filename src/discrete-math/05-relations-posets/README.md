# Relations, Equivalence Relations & Partial Orders (Posets)

## 1. Properties of Binary Relations
A binary relation $R$ from $A$ to $B$ is a subset $R \subseteq A \times B$.
For a relation on a set $A$ ($R \subseteq A \times A$):
1. **Reflexive**: $\forall x \in A, \, (x, x) \in R$.
2. **Symmetric**: $\forall x, y \in A, \, (x, y) \in R \implies (y, x) \in R$.
3. **Antisymmetric**: $\forall x, y \in A, \, ((x, y) \in R \land (y, x) \in R) \implies x = y$.
4. **Transitive**: $\forall x, y, z \in A, \, ((x, y) \in R \land (y, z) \in R) \implies (x, z) \in R$.

---

## 2. Equivalence Relations & Partitions
A relation $R$ is an **Equivalence Relation** iff it is:
$$\text{Reflexive} \land \text{Symmetric} \land \text{Transitive}$$
- **Equivalence Class**: $[a] = \{ x \in A \mid (a, x) \in R \}$
- **Fundamental Theorem of Equivalence Relations**: The equivalence classes of $R$ partition the set $A$ into disjoint non-empty subsets whose union is $A$.

---

## 3. Partial Orderings (Posets) & Hasse Diagrams
A relation $R$ is a **Partial Order (Poset)** iff it is:
$$\text{Reflexive} \land \text{Antisymmetric} \land \text{Transitive}$$
Represented visually using **Hasse diagrams** (directed edges point upward and redundant reflexive/transitive edges are omitted).
