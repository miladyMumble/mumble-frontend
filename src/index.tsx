import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { WalletProvider } from './context/wallet/wallet.context';

import App from './App';

render(
  <StrictMode>
    <WalletProvider>

      <App />
    </WalletProvider>
  </StrictMode>,
  document.getElementById('root')
);
