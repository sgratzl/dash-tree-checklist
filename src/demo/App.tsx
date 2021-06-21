/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { DashChangeAbleTreeChecklistProps, DashTreeChecklist } from '../lib';

const App: React.FC = () => {
  const [state, setState] = useState<DashChangeAbleTreeChecklistProps>({});

  return (
    <div>
      <DashTreeChecklist {...state} setProps={setState} />
    </div>
  );
};

export default App;
