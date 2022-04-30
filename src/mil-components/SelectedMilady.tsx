import React, { useContext, useState, useEffect } from 'react';
import tw, { styled, css } from 'twin.macro';
import axios from "axios";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../components/Button';
import { WalletContext } from '../context/wallet/wallet.context';
import Grid from "@mui/material/Grid";
import "./general.css";
import { parseTransaction } from 'ethers/lib/utils';
import { toast } from 'react-toastify';


const Wrapper = styled.main`
  ${tw`w-full flex flex-col place-content-evenly`}
`;

const SelectedMilady = (params, { miladyId, tweet }) => {

  const btnTxt = 'btnTxt'

  const { state } = useContext(WalletContext);

  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);


  const signMessage = async () => {
    const accounts = await state.web3.eth.getAccounts();
    const signature = await state.web3.eth.personal.sign(params.tweet, accounts[0])
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    axios.post('https://api.miladymumble.net/tweet', { message: params.tweet, signature, address: accounts[0], tokenId: params.miladyId }, {
      headers: headers
    })
      .then(res => {
        toast("Status: " + res.data.status)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Wrapper>
      <ToastContainer position='bottom-right' theme={'dark'} />
      <div>
        {state.connected && params.miladyId != null && (
          <div style={{ marginBottom: '3%' }}>
            <div style={{ marginLeft: '2%', marginRight: '2%', border: '1px solid black', padding: '0px' }}>
              <h2 style={{ fontSize: '18px', textAlign: 'left', paddingLeft: '2%', marginBottom: '1%' }}>Milady #{params.miladyId}</h2>

              {/* Milady image */}
              <div>
                <img className="hover" style={{ width: '300px', height: '375px', margin: '0 auto' }} src={`https://miladymaker.net/milady/${params.miladyId}.png`} alt="milady token representation" />
              </div>
            </div>
          </div>
        )}
      </div>
      {state.connected && params.miladyId && (
        <div>
          {/* Milady text box */}
          <div style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <textarea id="tweetBox" maxLength={280} placeholder="Post From @MiladyMumble" onChange={(e) => { params.setTweet(e.target.value) }} required></textarea>
          </div>
          {/* Milady tweet button */}
          <div id='tweetButton' style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2%' }}>
            <button id="tweet" onClick={signMessage} className="tweet-button" style={{ width: '150px', margin: '0 auto', marginBottom: '3%', marginTop: '2%' }}>{btnTxt}</button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default SelectedMilady;
