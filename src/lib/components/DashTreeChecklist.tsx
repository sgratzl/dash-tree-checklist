/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import PropTypes from 'prop-types';
import React, { FC } from 'react';
import './DashTreeChecklist.css';

export interface DashChangeAbleTreeChecklistProps {
  // TODO
}

export interface DashReadOnlyLayoutTreeChecklistProps {}
export type DashTreeChecklistProps = DashReadOnlyLayoutTreeChecklistProps & {} & DashChangeAbleTreeChecklistProps & {
    id?: string;
    setProps?(props: DashChangeAbleTreeChecklistProps): void;
    children?: React.ReactNode;
  };

/**
 * DashTreeChecklist shows an interactive parallel set / sankey diagram
 */
const DashTreeChecklist: FC<DashTreeChecklistProps> = (props) => {
  const { id, children } = props;

  return <div id={id}>{children}</div>;
};

DashTreeChecklist.defaultProps = {
  id: undefined,
  setProps: undefined,
  children: [],
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
};

export default DashTreeChecklist;
