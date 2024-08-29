// src/components/WalletConnect.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ onWalletConnected }) => {
    const [account, setAccount] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            setAccount(accounts[0]);
            onWalletConnected(signer);
        } else {
            alert("Please install MetaMask!");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            {!account ? (
                <button
                    onClick={connectWallet}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Connect Wallet
                </button>
            ) : (
                <div>
                    <p className="text-lg">Connected Account: {account}</p>
                </div>
            )}
        </div>
    );
};

export default WalletConnect;
