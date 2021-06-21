/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import PropTypes from 'prop-types';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { DashTreeNode, filterTree, asFilterFunction, expandToFirstMatch } from '../internal/model';
import './DashTreeChecklist.css';
import TreeChecklistNode from '../internal/components/TreeChecklistNode';
import { classNames } from '../utils';
import { useLatest } from '../internal/hooks';

export type { DashTreeNode } from '../internal/model';

export interface DashChangeAbleTreeChecklistProps {
  /**
   * list of selected tree node ids
   */
  selection?: string[];

  /**
   * list of expanded tree nodes
   */
  expanded?: string[];
}

export interface DashReadOnlyTreeChecklistProps {
  tree: DashTreeNode[];
  className?: string;
  style?: React.CSSProperties;
  nodeClassName?: string;
  nodeStyle?: React.CSSProperties;
}
export type DashTreeChecklistProps = DashReadOnlyTreeChecklistProps &
  DashChangeAbleTreeChecklistProps & {
    id?: string;
    setProps?(props: DashChangeAbleTreeChecklistProps): void;
    children?: React.ReactNode;
  };

export function useNodeIDHandler(
  current: string[] | undefined,
  prop: keyof DashChangeAbleTreeChecklistProps,
  setProps: DashTreeChecklistProps['setProps']
): { has: (node: DashTreeNode) => boolean; toggle: (node: DashTreeNode) => void } {
  const has = useMemo(() => asFilterFunction(current), [current]);
  const currentLatest = useLatest(current);

  const toggle = useCallback(
    (node: DashTreeNode) => {
      if (!setProps) {
        return;
      }
      const c = currentLatest.current ?? [];
      const index = c.indexOf(node.id);
      if (index >= 0) {
        const next = c.slice();
        next.splice(index, 1);
        setProps({
          [prop]: next,
        });
      } else {
        setProps({
          [prop]: [...c, node.id],
        });
      }
    },
    [setProps, prop, currentLatest]
  );
  return useMemo(() => ({ has, toggle }), [has, toggle]);
}

/**
 * DashTreeChecklist shows an interactive parallel set / sankey diagram
 */
const DashTreeChecklist: FC<DashTreeChecklistProps> = (props) => {
  const { id, children, tree, className, style, nodeClassName, nodeStyle } = props;

  const selected = useNodeIDHandler(props.selection, 'selection', props.setProps);
  const selectionTree = useMemo(() => filterTree(tree, selected.has), [tree, selected.has]);
  const expanded = useNodeIDHandler(props.expanded, 'expanded', props.setProps);

  const [searchValue, setSearchValue] = useState('');
  const setSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => setSearchValue(evt.currentTarget.value),
    [setSearchValue]
  );
  const filteredTree = useMemo(
    () => (searchValue ? filterTree(tree, (node) => node.name.includes(searchValue)) : tree),
    [tree, searchValue]
  );
  const searchExpanded = useMemo(() => {
    const first = expandToFirstMatch(filteredTree, (node) => node.name.includes(searchValue));
    return {
      toggle: expanded.toggle,
      has: (v: DashTreeNode) => expanded.has(v) || first.has(v.id),
    };
  }, [expanded, filteredTree, searchValue]);

  return (
    <div id={id} className={classNames('dash-tree-checklist', className)} style={style}>
      <h5>Selected Nodes</h5>
      <div className="dash-tree-checklist-selection">
        {selectionTree.map((n) => (
          <TreeChecklistNode key={n.id} node={n} selected={selected} className={nodeClassName} style={nodeStyle} />
        ))}
      </div>
      <h5>Tree Browser</h5>
      <input
        className="dash-tree-checklist-tree-search"
        type="search"
        placeholder="Enter search term to filter nodes by"
        onChange={setSearch}
      />
      <div className="dash-tree-checklist-tree-wrapper">
        <div className={classNames(filteredTree.length === 0 && tree.length > 0 && 'dash-tree-checklist-no-results')}>
          {filteredTree.map((n) => (
            <TreeChecklistNode
              key={n.id}
              node={n}
              selected={selected}
              expanded={searchValue ? searchExpanded : expanded}
              className={nodeClassName}
              style={nodeStyle}
            />
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

DashTreeChecklist.defaultProps = {
  id: undefined,
  setProps: undefined,
  children: [],
  selection: [],
  expanded: [],
  className: undefined,
  nodeClassName: undefined,
  nodeStyle: undefined,
  style: undefined,
};

DashTreeChecklist.propTypes = {
  /**
   * The ID used to identify this component in Dash callbacks.
   */
  id: PropTypes.string,
  /**
   * set props helper for dash
   */
  setProps: PropTypes.func,
  /**
   * children helper for dash
   */
  children: PropTypes.node,

  /**
   * component CSS class
   */
  className: PropTypes.string,
  /**
   * component CSS style
   */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  /**
   * node CSS class
   */
  nodeClassName: PropTypes.string,
  /**
   * node CSS style
   */
  // eslint-disable-next-line react/forbid-prop-types
  nodeStyle: PropTypes.any,

  /**
   * tree to display
   */
  tree: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          disabled: PropTypes.bool,
          children: PropTypes.arrayOf(PropTypes.any.isRequired),
        }).isRequired
      ),
    }).isRequired
  ).isRequired,

  /**
   * list of selected tree node ids
   */
  selection: PropTypes.arrayOf(PropTypes.string.isRequired),
  /**
   * list of expanded tree nodes
   */
  expanded: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default DashTreeChecklist;
