import React, { useEffect, useContext, useCallback } from 'react';
import useWeb3Modal from '../../context/wallet/wallet.actions';
import { SiEthereum } from 'react-icons/si';
import { WalletContext } from '../../context/wallet/wallet.context';
import { Button } from '.';

const formatAddress = address => `${address.slice(0, 4)}...${address.slice(-3)}`;

const WalletConnect = () => {
  const { state } = useContext(WalletContext);
  const { onConnect, disconnectWallet } = useWeb3Modal();

  const renderStats = useCallback(
    () => (
      <span tw='flex min-w-[10rem] justify-between'>
        <span>{formatAddress(state.address)}</span>
        {'|'}
        <span tw='flex'>
          {state.balance.toFixed(5)} <SiEthereum />
        </span>
      </span>
    ),
    [state.connected]
  );

  useEffect(() => console.log(state), [state]);

  return (
    <Button wallet onClick={!state.connected ? onConnect : disconnectWallet}>
      {!state.connected ? 'Connect Wallet' : renderStats()}
    </Button>
  );
};

export default WalletConnect;
