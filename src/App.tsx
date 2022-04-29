import React, { useEffect, useContext, useState } from 'react';
import '../public/style.css';
import WalletConnect from './components/Button/WalletConnect';
import { WalletContext } from './context/wallet/wallet.context';
import Message from './mil-components/Message';
import Mapping from './mil-components/Mapping';
import SelectedMilady from './mil-components/SelectedMilady';


const App = () => {

    const { state } = useContext(WalletContext);
    const tweetTxt = 'Tweet <3';

    const [miladyId, setMiladyId] = useState(null);
    const [tweet, setTweet] = useState(null);

    useEffect(() => {
        // Append MiladyMumble Timeline Widget At Component Mount
        const script = document.createElement('script');
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])

    const handleTweet = (tweet) => {
        setTweet(tweet);
    }

    return (
        <>
            <div>
                {state.connected && (
                    <div>
                        <div style={{ paddingTop: '2%', paddingBottom: '1%' }}>
                            <SelectedMilady tweet={tweet} setTweet={setTweet} miladyId={miladyId} />
                        </div>
                    </div>
                )}
            </div>

            <div id="logo">
                <img src={require("../public/IMG_8184.png")} />
            </div>

            <div className='main'>
                <textarea id="tweetBox" placeholder="Post From @MiladyMumble" onChange={e => handleTweet(e.target.value)}></textarea>
            </div>

            <div className="headerBox">

                {/* Wallet Button */}
                <WalletConnect />

                <div id='tweetButton'>
                    <a id="tweet" href="#">{tweetTxt}</a>
                </div>

                <div id="pfp">
                    <img src={require("../public/988DE5A7-69F5-4B63-B297-1EBCE015C2F2-removebg-preview.png")} />
                </div>

            </div>

            <div id="lain">
                <img src={require("../public/lain.gif")} alt="loading" />
            </div>

            <div style={{ paddingTop: '1%', paddingBottom: '1%' }}>
                <Mapping setMiladyId={setMiladyId} miladyId={miladyId} />
            </div>

            <div id="feed">
                <a className="twitter-timeline" data-width="750" data-height="3000" data-theme="dark" href="https://twitter.com/MiladyMumble?ref_src=twsrc%5Etfw">
                    Tweets by MiladyMumble
                </a>
            </div>

            <div id="sea" >
                <a href="https://opensea.io/collection/milady"><img style={{ width: "7%" }} src={require("../public/OS.png")} /></a>
            </div>

        </>
    )
}

export default App;

function handleTweet(value: string): void {
    throw new Error('Function not implemented.');
}
