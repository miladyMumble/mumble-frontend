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
    <Wrapper>
        <div className="nav-wrap">
            <h2 className="nav-title">MiladyMumble</h2>
              <WalletConnect />
        </div>
      <ToastContainer position='bottom-right' theme={'dark'} />
    </Wrapper>
  );
};

export default Navbar;
