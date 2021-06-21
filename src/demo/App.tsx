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
