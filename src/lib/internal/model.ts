export interface DashTreeNode {
  readonly id: string;
  readonly name: string;
  /**
   * disable selection of this item
   */
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

export function filterTree(
  tree: DashTreeNode[],
  filter: (node: DashTreeNode) => boolean,
  includeAllChildrenOnMatch = true
): DashTreeNode[] {
  const visit = (node: DashTreeNode): DashTreeNode | null => {
    const matchSelf = filter(node);
    if (matchSelf && (includeAllChildrenOnMatch || !node.children)) {
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
      if (matchSelf) {
        return {
          ...node,
          children: undefined,
        };
      }
      return null;
    }
    if (filtered.length === node.children.length && includeAllChildrenOnMatch) {
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

export function expandToFirstMatch(tree: DashTreeNode[], filter: (node: DashTreeNode) => boolean): Set<string> {
  const mustHave = new Set<string>();
  if (tree.length === 0) {
    return mustHave;
  }
  const pathToMatch = (node: DashTreeNode) => {
    if (node.children) {
      // expand first hit
      mustHave.add(node.id);
    }
    if (filter(node)) {
      return;
    }
    if (node.children && node.children.length > 0) {
      pathToMatch(node.children[0]);
    }
  };
  pathToMatch(tree[0]);
  return mustHave;
}

export function someChildrenMatch(root: DashTreeNode, pred: (node: DashTreeNode) => boolean): boolean {
  const visit = (node: DashTreeNode): boolean => {
    if (pred(node)) {
      return true;
    }
    if (!node.children) {
      return false;
    }
    return node.children.some((d) => visit(d));
  };
  if (!root.children) {
    return false;
  }
  return root.children.some((d) => visit(d));
}
