import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { WalletProvider } from './context/wallet/wallet.context';
// import GlobalStyles from './styles';
import App from './App';

render(
  <StrictMode>
    <WalletProvider>
      {/* <GlobalStyles /> */}
      <App />
    </WalletProvider>
  </StrictMode>,
  document.getElementById('root')
);
