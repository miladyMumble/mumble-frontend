import React, { createContext, useReducer } from 'react';
import walletReducer from './wallet.reducer';
import { IWalletState } from '../../types/wallets';

export const INITIAL_STATE: IWalletState = {
  fetching: false,
  address: '',
  balance: 0,
  web3: null,
  provider: null,
  connected: false,
  chainId: 1,
  networkId: 1,
  assets: [],
  showModal: false,
  pendingRequest: false,
  result: null,
  tokenIds: []
};

export const WalletContext = createContext<{
  state: IWalletState;
  dispatch: React.Dispatch<any>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

export const WalletProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, INITIAL_STATE);

  return <WalletContext.Provider value={{ state, dispatch }}>{children}</WalletContext.Provider>;
};
