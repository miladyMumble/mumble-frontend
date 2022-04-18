import React, { useEffect, useState, useContext } from 'react';
import tw, { styled, css } from 'twin.macro';
import { WalletContext } from './context/wallet/wallet.context';
import "./app.css";
import axios from "axios";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import { ToastContainer } from 'react-toastify';
import Navbar from "./mil-components/Navbar";
import Message from './mil-components/Message';
import Mapping from './mil-components/Mapping';
import SelectedMilady from './mil-components/SelectedMilady';
import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.main`
  ${tw`w-full min-h-screen px-20 flex flex-col justify-center items-center`}
`;

const App = () => {

  const { state } = useContext(WalletContext);

  const [miladyId, setMiladyId] = useState(null);
  const [tweet, setTweet] = useState(null);

  return (
    <Wrapper style={{background: 'linear-gradient(#d9f0d6, #f4ffee, #f4ffee, white, white)'}}>
      <ToastContainer position='bottom-right' theme={'dark'} />
      <Navbar />
      <audio src="https://miladymaker.net/mp3/ost.mp3" controls />
      <div style={{marginTop: '1.5%'}}>
      {state.connected && (
        <div>
          {/* <div style={{paddingTop: '2%', paddingBottom: '1%', border: '1px solid red'}}>
            <Message setTweet={setTweet} />
          </div> */}
          <div style={{paddingTop: '2%', paddingBottom: '1%'}}>
            <SelectedMilady tweet={tweet} setTweet={setTweet} miladyId={miladyId} />
          </div>
      </div>
      )}
  </div>
      <div style={{paddingTop: '1%', paddingBottom: '1%'}}>
        <Mapping setMiladyId={setMiladyId} miladyId={miladyId} />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="miladymumble"
        options={{height: 400, width: 600}}
      />
      <h3 style={{marginBottom: "3%"}} className="please-text">Want to say more? <span className="hover2" style={{textDecoration: 'underline'}} onClick={() => {window.open('https://miladymaker.net/')}}>Please be patient with me</span></h3>
      <h4 style={{marginBottom: "3%"}} className="please-text"><span className="hover2" style={{textDecoration: 'underline'}} onClick={() => {window.open('https://cheese.game/')}}>Made with ❤️ by 🧀</span></h4>
    </Wrapper>
  );
};

export default App;
