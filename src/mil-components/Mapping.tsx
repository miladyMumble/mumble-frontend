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


const Wrapper = styled.main`
  ${tw`w-full flex flex-col`}
`;

const Mapping = (params, { tweet, miladyId }) => {

  const { state } = useContext(WalletContext);

  const [selected, setSelected] = useState(null);

  const signMessage = async () => {
    const accounts = await state.web3.eth.getAccounts();
    const signature = await state.web3.eth.personal.sign(tweet, accounts[0])
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    axios.post('https://7e5c-69-114-195-148.ngrok.io/tweet', { message: tweet, signature, address: accounts[0], tokenId: miladyId }, {
      headers: headers
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    console.log(selected)
  }, [selected])

  return (
    <Wrapper>
      <ToastContainer position='bottom-right' theme={'dark'} />
      {state.connected && state.tokenIds && state.tokenIds.length == 0 && (
        <div>
          <h2 style={{ color: 'white', fontWeight: '400', fontSize: '22px', textAlign: 'center', marginBottom: '4%' }}>404: Milady not Found!</h2>
        </div>
      )}
      <Grid container spacing={4} className="milady-grid">
        {state.tokenIds.map((token) => (
          <Grid item key={token} style={{ marginLeft: '2%', marginRight: '2%' }} onClick={() => {
            params.setMiladyId(token)
            setSelected(token)
          }}>
            <div className="hover" style={{ border: '1px solid black', padding: '5px' }}>
              <div>
                <img style={{ width: '100px', height: '125px', margin: '0 auto' }} src={`https://miladymaker.net/milady/${token}.png`} alt="milady token representation" />
                <h2 style={{ color: 'white', fontWeight: '400', fontSize: '22px', textAlign: 'center' }}>Select Milady</h2>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Mapping;
