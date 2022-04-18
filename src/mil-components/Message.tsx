import React from 'react';
import tw, { styled, css } from 'twin.macro';
import "./message.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../components/Button';
import { parseClassName } from 'react-toastify/dist/utils';

const Wrapper = styled.main`
  ${tw`flex flex-col`}
`;

const Message = params => {
  return (
    <Wrapper>
      <ToastContainer position='bottom-right' theme={'dark'} />
      <div>
          <h2 style={{color: 'black', fontWeight: '400', fontFamily: 'Helvetica', fontSize: '22px', textAlign: 'center', marginBottom: '2%'}}>What would you like your Milady to say?</h2>
            <div style={{width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center'}}>
                <textarea className="textArea" maxLength={280} placeholder="Message" onChange={(e) => {params.setTweet(e.target.value)}} required></textarea>
            </div>
      </div>
    </Wrapper>
  );
};

export default Message;