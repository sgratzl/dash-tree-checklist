/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo, useState } from 'react';
import { DashChangeAbleTreeChecklistProps, DashTreeChecklist, DashTreeNode } from '../lib';

const App: React.FC = () => {
  const [state, setState] = useState<DashChangeAbleTreeChecklistProps>({ selection: [], expanded: [] });

  const setProps = useCallback(
    (props: DashChangeAbleTreeChecklistProps) => setState((v) => ({ ...v, ...props })),
    [setState]
  );

  const tree: DashTreeNode[] = useMemo(
    () => [
      {
        id: 'a',
        name: 'A',
        children: [
          {
            id: 'a.a',
            name: 'A.A',
          },
          {
            id: 'a.b',
            name: 'A.B',
          },
          {
            id: 'a.c',
            name: 'A.C',
          },
          {
            id: 'a.d',
            name: 'A.D',
            children: [{ id: 'a.d.a', name: 'A.D.A' }],
          },
        ],
      },
      {
        id: 'b',
        name: 'B',
        children: [
          {
            id: 'b.a',
            name: 'B.A',
          },
          {
            id: 'b.b',
            name: 'B.B',
          },
          {
            id: 'b.c',
            name: 'B.C',
          },
          {
            id: 'b.d',
            name: 'B.D',
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <DashTreeChecklist
        tree={tree}
        {...state}
        setProps={setProps}
        style={{ height: '30em', border: '1px solid black' }}
      />
    </div>
  );
};

export default App;
