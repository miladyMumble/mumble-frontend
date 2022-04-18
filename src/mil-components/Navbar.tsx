import React from 'react';
import tw, { styled, css } from 'twin.macro';
import "./message.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WalletConnect from '../components/Button/WalletConnect';

const Wrapper = styled.main`
  ${tw`w-full py-5 flex flex-col`}
`;

const Navbar = () => {
  return (
  <>
    <Wrapper>
        <div className="nav-wrap">
            <h2 className="nav-title">MiladyMumble</h2>
            <audio className="player" src="https://miladymaker.net/mp3/ost.mp3" controls />
            <WalletConnect />
        </div>
      <ToastContainer position='bottom-right' theme={'dark'} />
    </Wrapper>
    <div className="m_box">
        <div className="m_box_bar">
          <h2 className='box_h2'>Welcome to MiladyMumble! — ミレディマンブルへようこそ!</h2>
        </div>
        <p>
          MiladyMumble is a community ran twitter account 
          that grants each Milady 1 tweet a day. To use MiladyMumble, simply
          connect your wallet, pick a Milady you would like to channel, and craft 
          your tweet. Before posting, you must sign a message containing the content
          of the tweet. After posting, the chosen Milady will cooldown for 24 hours
          before it can tweet again. 
        </p>
    </div>
  </>
  );
};

export default Navbar;
