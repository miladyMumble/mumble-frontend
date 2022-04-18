import { useContext, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnect from '@walletconnect/web3-provider';
import { WalletContext, INITIAL_STATE } from './wallet.context';
import { getChainData } from './helpers';
import { toast } from 'react-toastify';
import Milady from "../../abis/Milady.json";
import { ethers } from "ethers";
import { Contract, Provider } from 'ethers-multicall';
import axios from 'axios';

export default function useWeb3Modal() {
  const { state, dispatch } = useContext(WalletContext);
  const [modal, setModal] = useState<any>(null);

  // validate network -- called when modal is instantiated
  const getNetwork = () => getChainData(state.chainId).network;

  // set provider options for web3Modal -- called when modal is instanstiated
  const getProviderOptions = () => {
    const infuraId = process.env.REACT_APP_INFURA_ID;
    const providerOptions = {
      walletconnect: {
        package: WalletConnect,
        options: {
          infuraId,
        },
      },
    };
    return providerOptions;
  };

  const initModal = () => {
    const init = new Web3Modal({
      network: getNetwork(),
      cacheProvider: false,
      providerOptions: getProviderOptions(),
      theme: {
        background: '#111827',
        main: '#f3f4f6',
        secondary: '#cbd5e1',
        border: '#111827',
        hover: '#7e22ce',
      },
    });

    setModal(init);
    return init;
  };

  // get web3 provider -- called in onConnect()
  const initWeb3 = (provider: any) => {
    const web3: any = new Web3(provider);

    web3.eth.extend({
      methods: [
        {
          name: 'chainId',
          call: 'eth_chainId',
          outputFormatter: web3.utils.hexToNumber,
        },
      ],
    });

    return web3;
  };

  // clears user connection when closed -- called in subscribeProvider()
  const resetApp = async () => {
    const { web3 } = state;
    !modal && initModal();
    if (web3 && web3.currentProvider && web3.currentProvider.disconnect()) {
      await web3.currentProvider.disconnect();
    }
    modal && (await modal.clearCachedProvider());
    dispatch({ type: 'RESET_APP', payload: INITIAL_STATE });
  };

  // dispatches actions associated with provider -- called in onConnect()
  const subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }

    provider.on('disconnect', () => resetApp());
    provider.on('accountsChanged', async (accounts: string[]) => {
      await dispatch({ type: 'ADDRESS_CHANGE', payload: { address: accounts[0] } });
      toast('Changing accounts');
    });

    provider.on('chainChanged', async (chainId: number) => {
      console.log('hit');
      if (chainId != (1 || 4)) {
        await dispatch({ type: 'RESET_APP', payload: INITIAL_STATE });
        alert('unsupported chain id');
        return;
      } else {
        await dispatch({ type: 'CHAIN_CHANGE', payload: { chainId } });
      }
    });
  };

  const onConnect = async () => {
    const provider = modal ? await modal.connect() : await initModal().connect();

    if (provider.networkVersion != (1 || 4)) {
      console.log(provider);
      return alert('unsupported chain id');
    } else {
      await subscribeProvider(provider);

      await provider.enable();
      const web3: any = initWeb3(provider);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const balance = await web3.eth.getBalance(accounts[0], 'latest');
      const networkId = await web3.eth.net.getId();
      const chainId = await web3.eth.chainId();
      const ethersProvider = new ethers.providers.Web3Provider(web3.currentProvider);
      const miladyContract = new ethers.Contract("0x5Af0D9827E0c53E4799BB226655A1de152A425a5", Milady.abi, ethersProvider)
      const balanceOfMiladys = await miladyContract.balanceOf(accounts[0])
      const balanceNumber = parseInt(balanceOfMiladys.toString());
      const ethcallProvider = new Provider(ethersProvider);
      const calls: any[] = [];
      await ethcallProvider.init();
      const multiContract = new Contract("0x5Af0D9827E0c53E4799BB226655A1de152A425a5", Milady.abi);
      for(let i = 0; i < balanceNumber; i++) {
        calls.push(multiContract.tokenOfOwnerByIndex(accounts[0], i));
      }
      let tokenIds = await ethcallProvider.all(calls);
      tokenIds = tokenIds.map(x => x.toString())
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
      const tokens = await axios.post('https://api.miladymumble.net/canshespeak', { tokenIds }, {
        headers: headers
      })
      tokenIds = tokens.data.tokenIds;

      dispatch({
        type: 'CONNECT',
        payload: {
          address,
          balance: Number(web3.utils.fromWei(balance, 'ether')),
          web3,
          provider,
          connected: true,
          chainId,
          networkId,
          showModal: true,
          tokenIds
        },
      });
      toast('Connecting');
    }
  };

  const disconnectWallet = async () => {
    console.log(modal);
    await modal.resetState();
    dispatch({ type: 'RESET_APP', payload: INITIAL_STATE });
    toast('Disconnecting');
  };

  return { onConnect, disconnectWallet, state };
}
