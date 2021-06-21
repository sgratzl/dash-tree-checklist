export interface DashTreeNode {
  readonly id: string;
  readonly name: string;
  readonly disabled?: boolean | null;
  children?: readonly DashTreeNode[] | null;
}

export function alwaysFalse(): boolean {
  return false;
}

export function alwaysTrue(): boolean {
  return true;
}

export function asFilterFunction(ids?: string[]): (node: DashTreeNode) => boolean {
  if (!ids || ids.length === 0) {
    return alwaysFalse;
  }
  const r = new Set(ids);
  return (node) => r.has(node.id);
}

export function filterTree(tree: DashTreeNode[], filter: (node: DashTreeNode) => boolean): DashTreeNode[] {
  const visit = (node: DashTreeNode): DashTreeNode | null => {
    if (filter(node)) {
      // whole node
      return node;
    }
    if (!node.children) {
      // hide
      return null;
    }
    // maybe partial
    const filtered: DashTreeNode[] = [];
    node.children.forEach((n) => {
      const filteredNode = visit(n);
      if (filteredNode) {
        filtered.push(filteredNode);
      }
    });
    if (filtered.length === 0) {
      return null;
    }
    if (filtered.length === node.children.length) {
      return node;
    }
    return {
      ...node,
      children: filtered,
    };
  };

  const filtered: DashTreeNode[] = [];
  tree.forEach((n) => {
    const filteredNode = visit(n);
    if (filteredNode) {
      filtered.push(filteredNode);
    }
  });
  return filtered;
}
