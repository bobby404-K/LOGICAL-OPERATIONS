# Functions, Mappings & Infinite Cardinality

## 1. Classifications of Functions
Let $f: A \to B$:
- **Injective (One-to-One)**: $\forall x, y \in A, \, f(x) = f(y) \implies x = y$.
- **Surjective (Onto)**: $\forall b \in B, \, \exists a \in A \text{ such that } f(a) = b$.
- **Bijective (Invertible)**: Both injective and surjective. Guarantees the existence of an inverse $f^{-1}: B \to A$.

---

## 2. Cardinality of Infinite Sets
- Two sets $A$ and $B$ have the same cardinality ($|A| = |B|$) iff there exists a bijection $f: A \to B$.
- **Countably Infinite ($\aleph_0$)**: Sets with the same cardinality as $\mathbb{N}$ (e.g. $\mathbb{Z}, \mathbb{Q}$).
- **Uncountable ($\mathfrak{c} = 2^{\aleph_0}$)**: Sets strictly larger than $\mathbb{N}$ (e.g. $\mathbb{R}, (0, 1)$).

### Cantor's Diagonal Argument
Theorem: The set of real numbers in $(0, 1)$ is uncountable.
Proof by contradiction: Assume $(0,1)$ is countable and list them in decimal expansions. Construct $x = 0.d_1 d_2 d_3 \dots$ where $d_i \neq d_{i,i}$. Then $x$ differs from every number on the list at digit $i$, contradicting the list's completeness!
