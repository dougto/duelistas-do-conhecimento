import React from 'react';

import { AuthProvider } from './auth';
import { DuelProvider } from './duel';

const AppProvider: React.FC = ({children}) => (
  <AuthProvider>
    <DuelProvider>
      {children}
    </DuelProvider>
  </AuthProvider>
);

export default AppProvider;
