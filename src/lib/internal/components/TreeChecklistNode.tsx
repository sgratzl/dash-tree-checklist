/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { DashTreeNode, someChildrenMatch } from '../model';
import { classNames } from '../../utils';

export type TreeChecklistNodeProps = {
  node: DashTreeNode;
  selected: { has: (node: DashTreeNode) => boolean; toggle: (node: DashTreeNode) => void };
  expanded: { has: (node: DashTreeNode) => boolean; toggle: (node: DashTreeNode) => void };
  className?: string;
  style?: React.CSSProperties;
  toggleNodeExpansion: string;
};
/**
 * DashTreeChecklist shows an interactive parallel set / sankey diagram
 */
const TreeChecklistNode: FC<TreeChecklistNodeProps> = ({
  node,
  selected,
  expanded,
  className,
  style,
  toggleNodeExpansion,
}) => {
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
  const isExpanded = node.children && expanded.has(node);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.indeterminate = !selected.has(node) && someChildrenMatch(node, selected.has);
  }, [ref, selected, node]);

  return (
    <div
      className={classNames(
        'dash-tree-checklist-node',
        className,
        node.children && 'dash-tree-checklist-node__inner',
        !node.children && 'dash-tree-checklist-node__leaf',
        selected && selected.has(node) && 'dash-tree-checklist-node__selected',
        node.disabled && 'dash-tree-checklist-node__disabled',
        isExpanded && 'dash-tree-checklist-node__expanded'
      )}
      data-id={node.id}
      style={style}
    >
      {node.children != null && (
        <button
          type="button"
          className="dash-tree-checklist-node-expander"
          onClick={toggler}
          title={toggleNodeExpansion}
        >
          ›
        </button>
      )}
      {node.disabled ? (
        <div className="dash-tree-checklist-node-name">{node.name}</div>
      ) : (
        <label className="dash-tree-checklist-node-name">
          <input
            ref={ref}
            type="checkbox"
            disabled={node.disabled ?? false}
            checked={selected.has(node)}
            onChange={togglerSelected}
          />
          {node.name}
        </label>
      )}

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
              toggleNodeExpansion={toggleNodeExpansion}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeChecklistNode;
