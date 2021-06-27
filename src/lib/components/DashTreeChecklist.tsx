/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import PropTypes from 'prop-types';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { DashTreeNode, filterTree, asFilterFunction, expandToFirstMatch, someChildrenMatch } from '../internal/model';
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

export interface DashTreeChecklistLabels {
  selectedNodes: string;
  treeBrowser: string;
  searchPlaceholder: string;
  toggleNodeExpansion: string;
  emptySelections: string;
  noResults: string;
}

const DEFAULT_LABELS: DashTreeChecklistLabels = {
  selectedNodes: 'Selected Nodes',
  treeBrowser: 'Tree Browser',
  searchPlaceholder: 'Enter search term to filter nodes by',
  toggleNodeExpansion: 'Toggle Node Expansion',
  emptySelections: 'Select one more more nodes from below',
  noResults: 'No matching nodes found',
};

export interface DashReadOnlyTreeChecklistProps {
  tree: DashTreeNode[];
  className?: string;
  style?: React.CSSProperties;
  nodeClassName?: string;
  nodeStyle?: React.CSSProperties;

  labels?: Partial<DashTreeChecklistLabels>;
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
  const labels = {
    ...DEFAULT_LABELS,
    ...(props.labels || {}),
  };

  const selected = useNodeIDHandler(props.selection, 'selection', props.setProps);
  const selectionTree = useMemo(() => filterTree(tree, selected.has), [tree, selected.has]);
  const expanded = useNodeIDHandler(props.expanded, 'expanded', props.setProps);

  const [searchValue, setSearchValue] = useState('');
  const setSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => setSearchValue(evt.currentTarget.value),
    [setSearchValue]
  );
  const filteredTree = useMemo(
    () =>
      searchValue ? filterTree(tree, (node) => node.name.toLowerCase().includes(searchValue.toLowerCase())) : tree,
    [tree, searchValue]
  );
  const searchExpanded = useMemo(() => {
    const first = expandToFirstMatch(filteredTree, (node) =>
      node.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return {
      toggle: expanded.toggle,
      has: (v: DashTreeNode) => expanded.has(v) || first.has(v.id),
    };
  }, [expanded, filteredTree, searchValue]);

  const [currentSelectionExpanded, setCurrentSelectionExpanded] = useState(new Set<string>());

  const selectionExpanded = useMemo(() => {
    return {
      toggle: (v: DashTreeNode) =>
        setCurrentSelectionExpanded((current) => {
          const next = new Set(current);
          if (current.has(v.id)) {
            next.delete(v.id);
          } else {
            next.add(v.id);
          }
          return next;
        }),
      has: (v: DashTreeNode) => someChildrenMatch(v, selected.has) || currentSelectionExpanded.has(v.id),
    };
  }, [selected, currentSelectionExpanded, setCurrentSelectionExpanded]);

  return (
    <div id={id} className={classNames('dash-tree-checklist', className)} style={style}>
      <h5>{labels.selectedNodes}</h5>
      <div className="dash-tree-checklist-selection">
        {selectionTree.map((n) => (
          <TreeChecklistNode
            key={n.id}
            node={n}
            selected={selected}
            expanded={selectionExpanded}
            className={nodeClassName}
            style={nodeStyle}
            toggleNodeExpansion={labels.toggleNodeExpansion}
          />
        ))}
        {selectionTree.length === 0 && (
          <div className="dash-tree-checklist-selection__empty">{labels.emptySelections}</div>
        )}
      </div>
      <h5>{labels.treeBrowser}</h5>
      <input
        className="dash-tree-checklist-tree-search"
        type="search"
        placeholder={labels.searchPlaceholder}
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
              toggleNodeExpansion={labels.toggleNodeExpansion}
            />
          ))}
          {filteredTree.length === 0 && tree.length > 0 ? labels.noResults : null}
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
  labels: undefined,
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

  // eslint-disable-next-line react/forbid-prop-types
  labels: PropTypes.object,
};

export default DashTreeChecklist;
