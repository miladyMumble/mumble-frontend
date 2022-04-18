import { IChainData } from '../../types/wallets';
import supportedChains from './chains';

export function getChainData(chainId: number): IChainData {
  // valididate chain
  const chainData = supportedChains.filter((chain: any) => chain.chain_id === chainId)[0];

  if (!chainData) {
    console.error('ChainId missing or not supported');
    return supportedChains[0];
  }

  const API_KEY = process.env.REACT_APP_INFURA_ID;

  // validate api key
  if (chainData.rpc_url.includes('infura.io') && chainData.rpc_url.includes('%API_KEY%') && API_KEY) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}
