# Discrete Probability, Expectation & Bayes' Theorem

## 1. Axioms of Probability & Conditional Probability
For sample space $\Omega$ and events $A, B$:
1. $0 \le P(A) \le 1$
2. $P(\Omega) = 1$
3. $P(A \cup B) = P(A) + P(B)$ if $A \cap B = \emptyset$

Conditional Probability:
$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$

### Bayes' Theorem
$$P(A \mid B) = \frac{P(B \mid A) P(A)}{P(B)} = \frac{P(B \mid A) P(A)}{P(B \mid A) P(A) + P(B \mid \neg A) P(\neg A)}$$

---

## 2. Random Variables & Expectation
- **Expectation**: $\mathbb{E}[X] = \sum_{x} x \cdot P(X = x)$
- **Linearity of Expectation**: $\mathbb{E}[aX + bY] = a\mathbb{E}[X] + b\mathbb{E}[Y]$ (always holds, even for dependent variables!)
- **Variance**: $\text{Var}(X) = \mathbb{E}[(X - \mathbb{E}[X])^2] = \mathbb{E}[X^2] - (\mathbb{E}[X])^2$
