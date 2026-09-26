// Greedy Vertex Coloring Algorithm

export function greedyColoring(adj: Map<number, number[]>): Map<number, number> {
  const result: Map<number, number> = new Map();

  for (const u of adj.keys()) {
    // Find colors already used by neighbors
    const neighborColors = new Set<number>();
    for (const v of adj.get(u) || []) {
      if (result.has(v)) {
        neighborColors.add(result.get(v)!);
      }
    }

    // Assign lowest available color
    let color = 0;
    while (neighborColors.has(color)) {
      color++;
    }
    result.set(u, color);
  }

  return result;
}
