import { IWalletState } from '../../types/wallets';

export default function walletReducer(state: IWalletState, { type, payload }) {
  switch (type) {
    case 'RESET_APP':
      return { ...state, ...payload };
    case 'ADDRESS_CHANGE':
      return { ...state, ...payload };
    case 'CHAIN_CHANGE':
      return { ...state, ...payload };
    case 'CONNECT':
      console.log('...connecting');
      return { ...state, ...payload };
    default:
      break;
  }
  return state;
}
