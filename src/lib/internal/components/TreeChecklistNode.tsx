/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { FC, useCallback } from 'react';
import type { DashTreeNode } from '../model';
import { classNames } from '../../utils';

export type TreeChecklistNodeProps = {
  node: DashTreeNode;
  selected: { has: (node: DashTreeNode) => boolean; toggle: (node: DashTreeNode) => void };
  expanded?: { has: (node: DashTreeNode) => boolean; toggle: (node: DashTreeNode) => void };
  className?: string;
  style?: React.CSSProperties;
};
/**
 * DashTreeChecklist shows an interactive parallel set / sankey diagram
 */
const TreeChecklistNode: FC<TreeChecklistNodeProps> = ({ node, selected, expanded, className, style }) => {
  const toggleS = selected.toggle;
  const toggleE = expanded?.toggle;
  const toggler = useCallback(() => {
    if (toggleE) {
      toggleE(node);
    }
  }, [toggleE, node]);
  const togglerSelected = useCallback(() => {
    toggleS(node);
  }, [toggleS, node]);
  const isExpanded = node.children && (!expanded || expanded.has(node));
  return (
    <div
      className={classNames(
        'dash-tree-checklist-node',
        className,
        node.children && 'dash-tree-checklist-node__inner',
        !node.children && 'dash-tree-checklist-node__leaf',
        selected && selected.has(node) && 'dash-tree-checklist-node__selected',
        isExpanded && 'dash-tree-checklist-node__expanded'
      )}
      data-id={node.id}
      style={style}
    >
      {node.children && expanded != null && (
        <button
          type="button"
          className="dash-tree-checklist-node-name"
          onClick={toggler}
          title="Toggle Node Expansion"
          disabled={!expanded || (node.disabled ?? false)}
        >
          {node.name}
        </button>
      )}
      {!node.children && (
        <label className="dash-tree-checklist-node-name">
          <input
            type="checkbox"
            disabled={node.disabled ?? false}
            checked={selected.has(node)}
            onChange={togglerSelected}
          />
          {node.name}
        </label>
      )}
      {node.children && !expanded && <div className="dash-tree-checklist-node-name">{node.name}</div>}

      {node.children && isExpanded && (
        <div className="dash-tree-checklist-node-children">
          {node.children.map((child) => (
            <TreeChecklistNode
              key={child.id}
              node={child}
              selected={selected}
              expanded={expanded}
              className={className}
              style={style}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeChecklistNode;
